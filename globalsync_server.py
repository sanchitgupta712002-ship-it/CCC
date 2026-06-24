import json
import os
import re
import urllib.error
import urllib.parse
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


HOST = "127.0.0.1"
PORT = int(os.environ.get("PORT", "8765"))


def load_local_env():
    env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env")
    if not os.path.exists(env_path):
        return
    with open(env_path, "r", encoding="utf-8") as env_file:
        for line in env_file:
            stripped = line.strip()
            if not stripped or stripped.startswith("#") or "=" not in stripped:
                continue
            key, value = stripped.split("=", 1)
            key = key.strip()
            value = value.strip().strip('"').strip("'")
            os.environ.setdefault(key, value)


load_local_env()
MODEL = os.environ.get("AI_MODEL", "gpt-5.5")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY") or os.environ.get("API_KEY")
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")


def infer_provider():
    explicit = os.environ.get("AI_PROVIDER", "").strip().lower()
    if explicit in {"openai", "groq"}:
        return explicit
    if GROQ_API_KEY:
        return "groq"
    if OPENAI_API_KEY and OPENAI_API_KEY.startswith("gsk_"):
        return "groq"
    if MODEL.startswith("openai/gpt-oss"):
        return "groq"
    return "openai"


PROVIDER = infer_provider()
AI_API_KEY = GROQ_API_KEY if PROVIDER == "groq" and GROQ_API_KEY else OPENAI_API_KEY


class GlobalSyncHandler(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".js": "application/javascript",
        ".css": "text/css",
        ".png": "image/png",
    }

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_GET(self):
        if self.path.startswith("/api/ai-status"):
            self.send_json(
                200,
                {
                    "configured": bool(AI_API_KEY),
                    "model": MODEL if AI_API_KEY else None,
                    "provider": provider_label() if AI_API_KEY else "Local fallback",
                },
            )
            return
        super().do_GET()

    def do_POST(self):
        if self.path == "/api/sim/respond":
            self.handle_ai_response()
            return
        if self.path == "/api/sim/report":
            self.handle_ai_report()
            return
        self.send_json(404, {"error": "Unknown endpoint"})

    def read_json(self):
        length = int(self.headers.get("content-length", "0"))
        raw = self.rfile.read(length)
        if not raw:
            return {}
        return json.loads(raw.decode("utf-8"))

    def send_json(self, status, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def handle_ai_response(self):
        if not AI_API_KEY:
            self.send_json(503, {"error": "AI API key is not configured"})
            return

        try:
            payload = self.read_json()
            scenario = payload.get("scenario", {})
            messages = payload.get("messages", [])
            learner_text = payload.get("learnerText", "")
            dialogue_state = build_dialogue_state(scenario, messages, learner_text)
            prompt = build_persona_prompt(scenario, messages, learner_text, dialogue_state)
            raw_text = call_ai(prompt, max_output_tokens=560)
            persona_payload = parse_persona_payload(raw_text)
            dialogue_state = merge_planned_dialogue_state(dialogue_state, persona_payload)
            text = persona_payload.get("response", "")

            if is_repetitive_response(text, messages) or violates_established_constraints(text, messages, learner_text):
                repair_prompt = build_repair_prompt(scenario, messages, learner_text, dialogue_state, text)
                text = call_ai(repair_prompt, max_output_tokens=260)
            if is_repetitive_response(text, messages) or violates_established_constraints(text, messages, learner_text):
                text = build_constraint_safe_fallback(scenario, messages, learner_text)
            self.send_json(200, {"text": clean_model_text(text), "model": MODEL})
        except OpenAIError as error:
            self.send_json(502, {"error": str(error)})
        except Exception as error:
            self.send_json(500, {"error": f"AI response failed: {error}"})

    def handle_ai_report(self):
        if not AI_API_KEY:
            self.send_json(503, {"error": "AI API key is not configured"})
            return

        try:
            payload = self.read_json()
            scenario = payload.get("scenario", {})
            messages = payload.get("messages", [])
            markers = payload.get("markers", {})
            prompt = build_report_prompt(scenario, messages, markers)
            text = call_ai(prompt, max_output_tokens=900)
            report = parse_report_json(text)
            self.send_json(200, {"report": report, "model": MODEL})
        except OpenAIError as error:
            self.send_json(502, {"error": str(error)})
        except Exception as error:
            self.send_json(500, {"error": f"AI report failed: {error}"})


class OpenAIError(Exception):
    pass


def build_dialogue_state(scenario, messages, learner_text):
    return {
        "stateSource": "local_continuity_hints",
        "learnerPosition": learner_text,
        "establishedFacts": [],
        "constraints": [],
        "offersOrResources": [],
        "commercialTerms": [],
        "answeredQuestions": [],
        "doNotRepeat": recent_persona_questions(messages),
        "openDecisions": [],
        "recommendedNextMove": "Infer the current decision point from the transcript, then make one concrete persona move.",
        "toneGuidance": "Natural, specific, accountable, and relationship-aware.",
    }


def build_state_prompt(scenario, messages, learner_text):
    persona = scenario.get("persona", {})
    transcript = format_transcript(messages[-16:])
    scenario_json = json.dumps(
        {
            "title": scenario.get("title"),
            "objective": scenario.get("objective"),
            "learnerRole": scenario.get("learnerRole"),
            "brief": scenario.get("brief"),
            "persona": {
                "name": persona.get("name"),
                "role": persona.get("role"),
                "posture": persona.get("posture"),
                "hidden": persona.get("hidden"),
            },
            "successCriteria": scenario.get("successCriteria", []),
        },
        ensure_ascii=True,
        indent=2,
    )
    return f"""
You are the conversation-state manager for a cross-cultural leadership simulation.

Read the scenario, recent transcript, and latest learner message. Extract the state the AI persona must remember before replying. This must work for any business scenario; do not rely on preset phrases.

Return ONLY valid JSON with this exact shape:
{{
  "stateSource": "ai",
  "learnerPosition": "one sentence summary of what the learner is trying to do now",
  "establishedFacts": ["facts both sides now know"],
  "constraints": ["hard constraints, deadlines, authority limits, relationship constraints, or risks already established"],
  "offersOrResources": ["help, staffing, concessions, alternatives, or resources offered by the learner"],
  "commercialTerms": ["pricing, contract, scope, penalty, or approval terms currently in play"],
  "answeredQuestions": ["questions or information requests already answered well enough to move forward"],
  "doNotRepeat": ["questions, asks, or explanations the persona should not repeat"],
  "openDecisions": ["decisions that still need to be made"],
  "recommendedNextMove": "one concrete move the persona should make next",
  "toneGuidance": "how the persona should sound in the next reply"
}}

State rules:
- Be strict about continuity. If the learner has already answered imperfectly but clearly enough, mark it as answered.
- If the learner asks the persona to define details inside the persona's own domain, mark repeated broad requests for that detail as something to avoid.
- If the learner makes a proposal, identify the decision it creates: accept, refuse, counteroffer, escalate, assign owners, or document the agreement.
- Do not invent facts not supported by the scenario or transcript.

Scenario:
{scenario_json}

Recent transcript:
{transcript}

Latest learner message:
{learner_text}
""".strip()


def normalize_dialogue_state(state, fallback):
    normalized = {**fallback, **state, "stateSource": state.get("stateSource", "ai")}
    list_fields = [
        "establishedFacts",
        "constraints",
        "offersOrResources",
        "commercialTerms",
        "answeredQuestions",
        "doNotRepeat",
        "openDecisions",
    ]
    for field in list_fields:
        normalized[field] = normalize_string_list(normalized.get(field))
    for field in ["learnerPosition", "recommendedNextMove", "toneGuidance"]:
        normalized[field] = str(normalized.get(field, "") or "").strip()
    if not normalized["recommendedNextMove"]:
        normalized["recommendedNextMove"] = fallback["recommendedNextMove"]
    if not normalized["toneGuidance"]:
        normalized["toneGuidance"] = fallback["toneGuidance"]
    return normalized


def normalize_string_list(value):
    if isinstance(value, list):
        return [str(item).strip() for item in value if str(item).strip()]
    if isinstance(value, str) and value.strip():
        return [value.strip()]
    return []


def state_notes_as_list(notes):
    return [line.strip("- ").strip() for line in notes.splitlines() if line.strip()]


def format_dialogue_state(dialogue_state):
    return json.dumps(dialogue_state, ensure_ascii=True, indent=2)


def build_persona_prompt(scenario, messages, learner_text, dialogue_state):
    persona = scenario.get("persona", {})
    transcript = format_transcript(messages[-12:])
    previous_persona_moves = format_previous_persona_moves(messages)
    scenario_json = json.dumps(
        {
            "title": scenario.get("title"),
            "objective": scenario.get("objective"),
            "learnerRole": scenario.get("learnerRole"),
            "brief": scenario.get("brief"),
            "successCriteria": scenario.get("successCriteria", []),
            "persona": persona,
            "wildcard": scenario.get("wildcard", {}),
        },
        ensure_ascii=True,
        indent=2,
    )
    return f"""
You are the AI simulation engine for GlobalSync, a Thunderbird School of Global Management cross-cultural leadership practice platform.

Act ONLY as the AI persona in the scenario. Do not act as a coach, narrator, evaluator, or generic assistant. Do not mention prompts, rubrics, AI, or that you are a simulation.

Pedagogy and safety:
- This platform teaches cross-cultural leadership, not stereotypes. Treat cultural variables as scenario-specific communication tendencies, never as deterministic national truths.
- Stay psychologically realistic: preserve dignity, respond to trust/face threats, and reveal hidden constraints gradually when the learner earns trust.
- Move the business problem forward. If the learner proposes a solution, discuss authority, risk, constraints, tradeoffs, and next steps.
- Keep continuity with the transcript. Do not repeat the same answer. If the learner repeats a demand, escalate or clarify the decision point.
- Treat the dialogue state below as working memory. Do not ask for information already captured in answeredQuestions or doNotRepeat.
- If the learner gives a concrete proposal, do not reset to discovery. Accept, refuse, counteroffer, request authority, assign owners, or escalate.
- If missing information belongs to your persona's own organization or expertise, define a reasonable work package yourself instead of asking the learner to guess it.
- If the learner sets a hard constraint, negotiate scope, staffing, risk controls, approval, or commercial terms inside that constraint before asking to change it.
- Treat broad confirmations such as "we can do that", "we can do all that", "available tomorrow", or "you know your needs better" as enough to stop asking the same discovery question. Move to the next dependency: access, coordinator, approval, risk boundary, commercial decision, or documented agreement.
- Do not repeat a prior ask by changing the vocabulary. If a recent persona move asked for a list, names, owners, scope, timeline, availability, or technical details, do not ask for the same package as a checklist, mapping, start time, or confirmation. Define what you can define and ask only for a new dependency.
- Do not begin with your name, role, or a speaker label. The UI already shows that.
- Each reply must make exactly one new simulation move: accept, refuse, counteroffer, reveal a constraint, request authority, propose escalation, repair trust, or document an agreement.
- Ask at most one focused question. Prefer a concrete counterproposal over another broad question.
- The user should only see the response field. Keep it in first person as the persona, 45-110 words, natural conversational style.

Return ONLY valid JSON with this exact shape:
{{
  "memory": {{
    "learnerPosition": "what the learner is trying to do now",
    "establishedFacts": ["facts already established"],
    "constraints": ["hard constraints or authority limits"],
    "offersOrResources": ["resources or concessions the learner offered"],
    "commercialTerms": ["scope, price, penalty, or contract terms in play"],
    "answeredQuestions": ["things the persona should not ask for again"],
    "doNotRepeat": ["recent persona questions or moves to avoid"],
    "openDecisions": ["decisions still needed"]
  }},
  "plannedMove": "one concrete persona move for this turn",
  "selfCheck": {{
    "usesLatestLearnerMessage": true,
    "avoidsRepeatingRecentMove": true,
    "honorsEstablishedConstraints": true,
    "soundsLikePersona": true
  }},
  "response": "persona reply only, no speaker label"
}}

Before returning JSON, silently revise the response until every selfCheck value is true.

Scenario:
{scenario_json}

Recent transcript:
{transcript}

Continuity hints from the app:
{format_dialogue_state(dialogue_state)}

Recent persona moves to avoid repeating:
{previous_persona_moves}

Latest learner message:
{learner_text}

Return the JSON now.
""".strip()


def review_persona_response(scenario, messages, learner_text, dialogue_state, candidate_text):
    prompt = build_quality_review_prompt(scenario, messages, learner_text, dialogue_state, candidate_text)
    try:
        raw = call_ai(prompt, max_output_tokens=650, temperature=0.2)
        parsed = parse_json_object(raw)
        if isinstance(parsed, dict):
            parsed["pass"] = bool(parsed.get("pass", False))
            parsed["rewrite"] = str(parsed.get("rewrite", "") or "").strip()
            parsed["issues"] = normalize_string_list(parsed.get("issues"))
            return parsed
    except Exception:
        return None
    return None


def build_quality_review_prompt(scenario, messages, learner_text, dialogue_state, candidate_text):
    persona = scenario.get("persona", {})
    transcript = format_transcript(messages[-12:])
    return f"""
You are a quality reviewer for a role-play simulation. Review the candidate response before it is shown to the learner.

Return ONLY valid JSON with this exact shape:
{{
  "pass": true,
  "issues": [],
  "rewrite": ""
}}

Mark pass=false if the candidate:
- repeats a recent persona move or asks a question already answered in the dialogue state,
- ignores a new learner offer, boundary, proposal, emotion, or commercial term,
- contradicts an established fact or hard constraint,
- sounds generic, scripted, evasive, or unrealistic for the persona,
- asks the learner to define details that the persona should reasonably own,
- makes more than one major move or asks more than one question.

If pass=false, provide "rewrite" as the persona's improved next response. The rewrite must be 45-110 words, natural, specific, and make one concrete next move. No speaker label.

Persona: {persona.get("name", "AI persona")} / {persona.get("role", "")}
Scenario title: {scenario.get("title", "GlobalSync scenario")}

Recent transcript:
{transcript}

Dialogue state:
{format_dialogue_state(dialogue_state)}

Latest learner message:
{learner_text}

Candidate response:
{candidate_text}
""".strip()


def build_repair_prompt(scenario, messages, learner_text, dialogue_state, rejected_text):
    persona = scenario.get("persona", {})
    transcript = format_transcript(messages[-12:])
    previous_persona_moves = format_previous_persona_moves(messages)
    return f"""
You are revising an AI persona response for GlobalSync because the first draft was too repetitive.

Persona: {persona.get("name", "AI persona")} / {persona.get("role", "")}
Scenario: {scenario.get("title", "GlobalSync scenario")}

Recent transcript:
{transcript}

Dialogue state:
{format_dialogue_state(dialogue_state)}

Recent persona moves to avoid:
{previous_persona_moves}

Latest learner message:
{learner_text}

Rejected repetitive draft:
{rejected_text}

Write a different, realistic persona response. Requirements:
- Honor all established facts, constraints, answered questions, and do-not-repeat items in the dialogue state.
- If the learner made a concrete proposal, respond to that proposal directly.
- If the missing detail belongs to your persona's side, define it yourself and move to access, ownership, approval, or commercial terms.
- Treat broad confirmations as enough to advance. Do not repackage a recent request for lists, owners, availability, scope, or validation details as a checklist, mapping, start time, or confirmation.
- The rejected draft is too close to the prior ask. Do not request an artifact that lists, maps, assigns, confirms, or schedules the same topic. Make a new move: commit to a default work package, set a boundary, name an approval path, ask for access, or document the agreement.
- Do not reuse the same opening, same structure, or same ask as the rejected draft.
- Advance the negotiation with a concrete counterproposal, boundary, escalation path, or documented next step.
- Speak only as the persona. No speaker label. 45-100 words.
""".strip()


def build_report_prompt(scenario, messages, markers):
    transcript = format_transcript(messages)
    scenario_title = scenario.get("title", "GlobalSync scenario")
    rubric = scenario.get("rubric", [])
    return f"""
You are GlobalSync's debrief assistant for Thunderbird cross-cultural leadership practice.

Create a learner report grounded in the transcript. Be specific, evidence-based, formative, and culturally nuanced. Do not overclaim. Do not stereotype.

Return ONLY valid JSON with this exact shape:
{{
  "overall": 0,
  "narrative": "one concise paragraph",
  "scores": [
    {{"label": "Inquiry quality", "value": 0}},
    {{"label": "Feedback specificity", "value": 0}},
    {{"label": "Trust building", "value": 0}},
    {{"label": "Adaptability", "value": 0}},
    {{"label": "Action closure", "value": 0}}
  ],
  "strengths": ["two concrete strengths"],
  "misses": ["two concrete missed opportunities"],
  "evidence": {{
    "best": "short transcript excerpt or paraphrase",
    "closure": "short transcript excerpt or paraphrase",
    "risk": "short transcript excerpt or paraphrase"
  }},
  "prompts": ["four reflection questions"]
}}

Scenario: {scenario_title}
Rubric: {json.dumps(rubric, ensure_ascii=True)}
Local marker counts: {json.dumps(markers, ensure_ascii=True)}

Transcript:
{transcript}
""".strip()


def format_transcript(messages):
    lines = []
    for message in messages:
        sender = message.get("sender", "Unknown")
        role = message.get("role", "")
        text = message.get("text", "")
        lines.append(f"{sender} ({role}): {text}")
    return "\n".join(lines) if lines else "No previous transcript."


def summarize_dialogue_state(messages, learner_text):
    combined_learner = " ".join(
        [message.get("text", "") for message in messages if message.get("sender") == "You" or message.get("type") == "user"]
        + [learner_text]
    ).lower()

    notes = []
    if re.search(r"\b(january 1|jan(?:uary)? 1|first day of the new year|1st january|first january)\b", combined_learner):
        notes.append("- Learner has stated the launch date is January 1.")
    if re.search(r"\b(no flexibility|not much flexibility|do not want to delay|cannot wait|has to be|non[- ]?negotiable)\b", combined_learner):
        notes.append("- Learner has stated the launch date is not flexible. Do not ask again for launch-window flexibility or risk tolerance about moving the date.")
        notes.append("- Any acceptable plan must preserve January 1 as the launch/go-live date; later dates can only be internal follow-up checks, not handover or launch dates.")
    if re.search(r"\b(7 days|seven days|7-day|seven-day|january 8|jan(?:uary)? 8)\b", combined_learner):
        notes.append("- Learner mentioned up to seven days for cleanup/contingency, but still expects January 1 launch to happen.")
    if re.search(r"\b(ceo|final sign[- ]?off|signoff|sign off)\b", combined_learner):
        notes.append("- Learner has identified themselves or their side as final sign-off authority.")
    if re.search(r"\b(operation|operations manager|point of contact|contact)\b", combined_learner):
        notes.append("- Learner has named Operations Manager as the operational point of contact.")
    if re.search(r"\b(50%|20%|less|paying you less|cost|price|deal|original deal|charge)\b", combined_learner):
        notes.append("- Learner is proposing a price reduction or financial penalty due to the partner's delivery risk.")
    if re.search(r"\b(freelancer|outsource|extra analysts|it professionals|assist|delegate)\b", combined_learner):
        notes.append("- Learner offered support resources or outsourcing as a way to protect the deadline.")
    if re.search(r"\b(senior data analyst|senior analysts|data professionals|it professionals|available.*tomorrow|end of tomorrow|we can do all that|you know better|not going to specific|not going to specify)\b", combined_learner):
        notes.append("- Learner has offered senior analysts/data professionals and does not want to define the vendor's internal validation steps. The persona should now define the work package herself instead of asking again for exact validation steps or names.")
    if re.search(r"\b(unreliable|disappointing|painful|reputation|suffer|your company)\b", combined_learner):
        notes.append("- Learner has escalated reputational and relationship pressure; respond with accountability and boundaries.")

    if not notes:
        notes.append("- No firm learner constraints have been established yet. Use inquiry to surface them.")
    return "\n".join(notes)


def format_previous_persona_moves(messages):
    persona_messages = [
        clean_model_text(message.get("text", ""))
        for message in messages
        if message.get("type") == "agent" or (message.get("sender") and message.get("sender") != "You" and message.get("type") != "system")
    ]
    recent = persona_messages[-4:]
    if not recent:
        return "- None yet."
    return "\n".join(f"- {item[:220]}" for item in recent)


def recent_persona_questions(messages):
    questions = []
    persona_messages = [
        clean_model_text(message.get("text", ""))
        for message in messages
        if message.get("type") == "agent" or (message.get("sender") and message.get("sender") != "You" and message.get("type") != "system")
    ]
    for message in persona_messages[-5:]:
        for part in re.findall(r"[^?]+\?", message):
            question = re.sub(r"\s+", " ", part).strip()
            if question:
                questions.append(question[-220:])
    return questions[-5:]


def extract_persona_reply(raw_text):
    return parse_persona_payload(raw_text).get("response", "")


def parse_persona_payload(raw_text):
    try:
        parsed = parse_json_object(raw_text)
        if isinstance(parsed, dict):
            response = parsed.get("response", "")
            if isinstance(response, str) and response.strip():
                return {
                    "response": clean_model_text(response),
                    "memory": parsed.get("memory") if isinstance(parsed.get("memory"), dict) else {},
                    "plannedMove": str(parsed.get("plannedMove", "") or "").strip(),
                    "selfCheck": parsed.get("selfCheck") if isinstance(parsed.get("selfCheck"), dict) else {},
                }
    except Exception:
        pass
    return {"response": clean_model_text(raw_text), "memory": {}, "plannedMove": "", "selfCheck": {}}


def merge_planned_dialogue_state(base_state, persona_payload):
    memory = persona_payload.get("memory")
    if not isinstance(memory, dict):
        return base_state
    merged = normalize_dialogue_state(memory, base_state)
    planned_move = persona_payload.get("plannedMove", "")
    if planned_move:
        merged["recommendedNextMove"] = planned_move
    do_not_repeat = list(dict.fromkeys(base_state.get("doNotRepeat", []) + merged.get("doNotRepeat", [])))
    merged["doNotRepeat"] = do_not_repeat[-8:]
    return merged


def is_repetitive_response(candidate, messages):
    candidate_tokens = content_tokens(candidate)
    if len(candidate_tokens) < 8:
        return False

    recent_persona = [
        message.get("text", "")
        for message in messages
        if message.get("type") == "agent" or (message.get("sender") and message.get("sender") != "You" and message.get("type") != "system")
    ][-4:]

    for previous in recent_persona:
        previous_tokens = content_tokens(previous)
        if not previous_tokens:
            continue
        overlap = len(candidate_tokens & previous_tokens) / max(1, min(len(candidate_tokens), len(previous_tokens)))
        if overlap >= 0.62:
            return True
        if repeats_prior_request_shape(candidate, previous):
            return True

    lower_candidate = candidate.lower()
    repeated_asks = [
        "what level of risk",
        "risk you are comfortable",
        "how much flexibility",
        "soft launch",
        "final sign-off",
        "exact validation",
        "validation steps",
        "names and availability",
        "names with start times",
        "which validation",
    ]
    recent_text = " ".join(recent_persona).lower()
    for phrase in repeated_asks:
        if phrase in lower_candidate and phrase in recent_text:
            return True
    return False


def repeats_prior_request_shape(candidate, previous):
    lower_candidate = candidate.lower()
    lower_previous = previous.lower()
    request_markers = r"\b(please|could you|would you|can you|send|share|list|provide|confirm|outline|specify|identify|forward|map|assign)\b"
    previous_request_text = request_sentences(lower_previous, request_markers)
    candidate_request_text = request_sentences(lower_candidate, request_markers)
    if not previous_request_text or not candidate_request_text:
        return False

    candidate_topics = request_topic_tokens(candidate_request_text)
    previous_topics = request_topic_tokens(previous_request_text)
    shared_topics = candidate_topics & previous_topics
    return len(shared_topics) >= 3


def request_sentences(text, request_markers):
    sentences = re.findall(r"[^.!?]+[.!?]?", text)
    request_parts = [
        sentence.strip()
        for sentence in sentences
        if "?" in sentence or re.search(request_markers, sentence)
    ]
    return " ".join(request_parts)


def request_topic_tokens(text):
    words = content_tokens(text)
    topic_roots = set()
    for word in words:
        root = re.sub(r"(ing|tion|sion|ment|ity|ies|s)$", "", word)
        if len(root) >= 4:
            topic_roots.add(root)
    return topic_roots


def violates_established_constraints(candidate, messages, learner_text):
    combined_learner = " ".join(
        [message.get("text", "") for message in messages if message.get("sender") == "You" or message.get("type") == "user"]
        + [learner_text]
    ).lower()
    lower_candidate = candidate.lower()

    hard_jan1 = re.search(r"\b(january 1|jan(?:uary)? 1|first day of the new year|1st january|first january)\b", combined_learner)
    no_date_flex = re.search(r"\b(no flexibility|not much flexibility|do not want to delay|cannot wait|has to be|non[- ]?negotiable)\b", combined_learner)
    if hard_jan1 and no_date_flex:
        delayed_launch = re.search(
            r"\b(january 2|january 3|january 4|january 5|january 6|january 7|january 8|jan(?:uary)? [2-9]|two[- ]?week|14[- ]?day|handover on january|go[- ]?live .*january [2-9]|launch .*january [2-9])\b",
            lower_candidate,
        )
        if delayed_launch:
            return True
        repeated_flex_ask = re.search(r"\b(risk tolerance|comfortable accepting|how much flexibility|soft launch window)\b", lower_candidate)
        if repeated_flex_ask:
            return True
    if learner_has_answered_validation_support(combined_learner):
        repeated_scope_ask = re.search(
            r"\b(exact validation|validation steps|which validation|list .*activities|names and availability|names with start times|start times|which .*remain our responsibility|could you specify exactly)\b",
            lower_candidate,
        )
        if repeated_scope_ask:
            return True
        if re.search(r"\b(available.*tomorrow|end of tomorrow|we can do all that)\b", combined_learner):
            schedule_slip = re.search(r"\b(early next week|january 2|jan(?:uary)? 2|january 3|jan(?:uary)? 3|does that timeline work|would that timeline work)\b", lower_candidate)
            if schedule_slip:
                return True
    return False


def learner_has_answered_validation_support(combined_learner):
    offered_help = re.search(r"\b(senior data analyst|senior analysts|data professionals|it professionals|we can do all that|available.*tomorrow|end of tomorrow)\b", combined_learner)
    pushed_back_on_specificity = re.search(r"\b(you know better|not going to specific|not going to specify|where you need|what are your needs)\b", combined_learner)
    return bool(offered_help or pushed_back_on_specificity)


def build_constraint_safe_fallback(scenario, messages, learner_text):
    persona = scenario.get("persona", {})
    name = persona.get("name", "I")
    if name.lower().startswith("mei"):
        combined_learner = " ".join(
            [message.get("text", "") for message in messages if message.get("sender") == "You" or message.get("type") == "user"]
            + [learner_text]
        ).lower()
        if learner_has_answered_validation_support(combined_learner):
            return (
                "That is enough for me to act. I will define the support package from our side: data mapping review, migration integrity checks, "
                "and final load verification. Please have your senior analysts ready tomorrow for a 30-minute technical handoff with my local lead. "
                "On the 15% adjustment, I cannot approve it myself, but I will send a scope-and-fee amendment to the regional director today."
            )
        return (
            "I understand January 1 is fixed, so I will not ask to move that date again. "
            "The workable path is a January 1 launch with reduced launch-critical scope, daily updates through your Operations Manager, "
            "and my team retaining responsibility for local interpretation and quality control. On the commercial point, I cannot accept a 50% reduction alone, "
            "but I can escalate a revised scope-and-fee proposal today for approval."
        )
    return (
        "I understand the constraint is firm, so I will stop asking to move it. "
        "The practical next step is to preserve the stated deadline, narrow the scope to what can be delivered responsibly, assign owners on both sides, "
        "and escalate any commercial adjustment for approval today."
    )


def content_tokens(text):
    stopwords = {
        "the", "and", "that", "with", "you", "your", "for", "this", "are", "will", "can",
        "could", "would", "have", "has", "our", "from", "what", "when", "then", "than",
        "into", "about", "while", "still", "also", "tell", "know", "need", "want", "thank",
        "thanks", "goal", "side", "both", "once", "today", "please", "could", "would",
    }
    words = re.findall(r"[a-zA-Z][a-zA-Z'-]{2,}", text.lower())
    return {word for word in words if word not in stopwords}


def provider_label():
    return "Groq Chat Completions API" if PROVIDER == "groq" else "OpenAI Responses API"


def call_ai(prompt, max_output_tokens, temperature=0.7):
    if PROVIDER == "groq":
        return call_groq(prompt, max_output_tokens, temperature)
    return call_openai(prompt, max_output_tokens)


def call_openai(prompt, max_output_tokens):
    body = {
        "model": MODEL,
        "input": [
            {
                "role": "developer",
                "content": [
                    {
                        "type": "input_text",
                        "text": "Follow the user's requested simulation task exactly. Prioritize role fidelity, safety, and concise output.",
                    }
                ],
            },
            {
                "role": "user",
                "content": [{"type": "input_text", "text": prompt}],
            },
        ],
        "max_output_tokens": max_output_tokens,
    }

    request = urllib.request.Request(
        "https://api.openai.com/v1/responses",
        data=json.dumps(body).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {AI_API_KEY}",
            "Content-Type": "application/json",
            "User-Agent": "GlobalSyncDemo/1.0",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=45) as response:
            data = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as error:
        details = error.read().decode("utf-8", errors="replace")
        raise OpenAIError(f"OpenAI API returned {error.code}: {details[:400]}")
    except urllib.error.URLError as error:
        raise OpenAIError(f"Could not reach OpenAI API: {error.reason}")

    text = extract_response_text(data)
    if not text:
        raise OpenAIError("OpenAI response did not contain text output")
    return text


def call_groq(prompt, max_output_tokens, temperature):
    body = {
        "model": MODEL,
        "messages": [
            {
                "role": "system",
                "content": "Follow the GlobalSync simulation task exactly. Prioritize role fidelity, safety, cultural nuance, and concise output.",
            },
            {"role": "user", "content": prompt},
        ],
        "max_completion_tokens": max_output_tokens,
        "temperature": temperature,
    }

    if MODEL.startswith("openai/gpt-oss"):
        body["reasoning_effort"] = "low"

    request = urllib.request.Request(
        "https://api.groq.com/openai/v1/chat/completions",
        data=json.dumps(body).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {AI_API_KEY}",
            "Content-Type": "application/json",
            "User-Agent": "GlobalSyncDemo/1.0",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=45) as response:
            data = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as error:
        details = error.read().decode("utf-8", errors="replace")
        raise OpenAIError(f"Groq API returned {error.code}: {details[:400]}")
    except urllib.error.URLError as error:
        raise OpenAIError(f"Could not reach Groq API: {error.reason}")

    choices = data.get("choices") or []
    if choices:
        message = choices[0].get("message", {})
        text = message.get("content", "")
        if text:
            return text
    raise OpenAIError("Groq response did not contain text output")


def extract_response_text(data):
    if isinstance(data.get("output_text"), str):
        return data["output_text"]

    chunks = []
    for item in data.get("output", []):
        for content in item.get("content", []):
            if isinstance(content.get("text"), str):
                chunks.append(content["text"])
    return "\n".join(chunks).strip()


def clean_model_text(text):
    cleaned = re.sub(r"\s+", " ", text).strip().strip('"')
    cleaned = re.sub(r"^[A-Za-z .'-]{2,60}\s*\([^)]+\):\s*", "", cleaned)
    cleaned = re.sub(r"^[A-Za-z .'-]{2,60}:\s*", "", cleaned)
    replacements = {
        "\u2010": "-",
        "\u2011": "-",
        "\u2012": "-",
        "\u2013": "-",
        "\u2014": "-",
        "\u2018": "'",
        "\u2019": "'",
        "\u201c": '"',
        "\u201d": '"',
        "\u2026": "...",
        "\u00a0": " ",
    }
    for source, target in replacements.items():
        cleaned = cleaned.replace(source, target)
    return cleaned.strip()


def parse_report_json(text):
    stripped = text.strip()
    match = re.search(r"\{.*\}", stripped, re.DOTALL)
    if match:
        stripped = match.group(0)
    report = json.loads(stripped)
    report["overall"] = int(max(0, min(100, report.get("overall", 0))))
    return report


def parse_json_object(text):
    stripped = text.strip()
    match = re.search(r"\{.*\}", stripped, re.DOTALL)
    if match:
        stripped = match.group(0)
    return json.loads(stripped)


if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    status = "enabled" if AI_API_KEY else "not configured"
    print(f"GlobalSync server: http://{HOST}:{PORT}/index.html")
    print(f"AI status: {status}; provider: {provider_label() if AI_API_KEY else 'local fallback'}; model: {MODEL if AI_API_KEY else 'local fallback'}")
    ThreadingHTTPServer((HOST, PORT), GlobalSyncHandler).serve_forever()

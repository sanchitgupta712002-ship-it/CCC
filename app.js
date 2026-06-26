(function () {
  const scenarios = [
    {
      id: "indirect-signals",
      module: "Module 1",
      title: "Indirect Signals in a Distributed Project",
      status: "Ready",
      due: "Pilot week 1",
      duration: "12 min",
      audience: "Graduate students and executives",
      objective:
        "Recognize culturally plausible interpretation gaps, test assumptions, and adapt before judging intent.",
      learnerRole:
        "You are the project lead coordinating a regional launch with a colleague you do not know well.",
      brief:
        "A partner has answered your deadline questions with phrases like 'we will try' and 'it may be possible.' Your team needs a reliable commitment, but pushing too hard may damage trust.",
      successCriteria: [
        "Ask open questions before interpreting the indirect answer.",
        "Name your goal without cornering the colleague.",
        "Confirm next steps, owner, and timing."
      ],
      persona: {
        name: "Mei Tan",
        role: "Regional implementation partner",
        context: "High-context, harmony-preserving, relationship-aware",
        posture: "Careful, polite, and reluctant to give a blunt no",
        hidden:
          "Mei's local team lost a key analyst and has not told headquarters because they are trying to solve the problem internally.",
        opening:
          "Thank you for checking in. We are doing our best with the launch timeline. It may be possible if a few things align on our side."
      },
      wildcard: {
        title: "Stakeholder pressure",
        text:
          "The executive sponsor asks for a written deadline by the end of the day. Mei becomes more cautious about committing too quickly."
      },
      rubric: [
        "Self-awareness",
        "Inquiry quality",
        "Adaptive communication",
        "Trust building",
        "Action closure"
      ],
      debriefPrompts: [
        "Where did learners treat indirect language as avoidance instead of a signal to inquire?",
        "Which questions helped Mei reveal constraints without losing dignity?",
        "What would an operational follow-up sound like after trust was preserved?"
      ],
      replyBank: {
        guarded:
          "I understand the need for a clear answer. At this moment, I would prefer not to say something that later creates difficulty for both teams.",
        open:
          "That is helpful to ask. One concern is that our analyst coverage has changed this week, so I am not fully confident about the original date.",
        specific:
          "If we can confirm the data handoff by Thursday and reduce the report scope, I can commit to a checkpoint on Monday and a final date after that review.",
        neutral:
          "We are still reviewing the situation. I believe the team will make a strong effort, though some details are not settled yet."
      }
    },
    {
      id: "feedback-face",
      module: "Module 2",
      title: "Feedback Without Face Loss",
      status: "Ready",
      due: "Pilot week 2",
      duration: "15 min",
      audience: "Team leads and project managers",
      objective:
        "Give timely, respectful, specific feedback while inviting context and preserving the working relationship.",
      learnerRole:
        "You manage a global project team. One member has missed two interim deliverables and rarely speaks in group meetings.",
      brief:
        "You need to address the missed work before the final deadline. The teammate may be dealing with unclear expectations, hierarchy concerns, or workload pressure.",
      successCriteria: [
        "Describe behavior and impact with specific evidence.",
        "Invite the teammate's perspective before prescribing a fix.",
        "Agree on an accountable next step."
      ],
      persona: {
        name: "Aarav Patel",
        role: "Analytics team member",
        context: "Relationship-oriented, hierarchy-aware, cautious with disagreement",
        posture: "Respectful but worried about public embarrassment",
        hidden:
          "Aarav has been receiving conflicting requests from two senior stakeholders and assumed your deadline was flexible.",
        opening:
          "I know the deliverable is important. I apologize for the delay. I was trying to make sure the work would meet expectations."
      },
      wildcard: {
        title: "Public escalation",
        text:
          "A senior stakeholder asks in a group chat why the work is late. Aarav becomes more anxious and less forthcoming."
      },
      rubric: [
        "Feedback specificity",
        "Inquiry quality",
        "Relationship and trust",
        "Adaptive communication",
        "Action closure"
      ],
      debriefPrompts: [
        "Which feedback statements separated behavior from identity?",
        "Where did learners miss a chance to ask about constraints?",
        "How did privacy, hierarchy, and specificity affect the tone?"
      ],
      replyBank: {
        guarded:
          "I am sorry. I did not intend to create a problem. If you prefer, I can work late and try to correct it.",
        open:
          "Thank you for asking. I was not sure whether the request from the regional director took priority over the dashboard deadline.",
        specific:
          "Yes, I can send the first draft by 3 p.m. tomorrow and confirm priorities with you before accepting new requests.",
        neutral:
          "I understand. I will try to be more careful. The situation has been a little complicated."
      }
    },
    {
      id: "trust-repair",
      module: "Module 3",
      title: "Small-c Conflict and Trust Repair",
      status: "Ready",
      due: "Optional pilot",
      duration: "15 min",
      audience: "Global team leaders",
      objective:
        "Address a small but consequential conflict before it becomes a relationship rupture.",
      learnerRole:
        "You lead a virtual project team. A teammate's comment in chat was perceived as dismissive by another region.",
      brief:
        "The team has gone quiet since the comment. You need to surface impact, avoid over-escalation, and reset norms for future discussion.",
      successCriteria: [
        "Acknowledge impact without assuming intent.",
        "Invite perspective from the person involved.",
        "Set a practical team norm and next step."
      ],
      persona: {
        name: "Elena Fischer",
        role: "Product operations lead",
        context: "Direct, task-oriented, time-conscious",
        posture: "Surprised that the comment caused tension",
        hidden:
          "Elena meant to challenge an idea quickly, not disrespect the team. She is frustrated that silence is delaying the decision.",
        opening:
          "I saw the chat went quiet after my note. I was only trying to be efficient. I did not mean anything personal by it."
      },
      wildcard: {
        title: "Silent withdrawal",
        text:
          "A regional teammate cancels a working session and says they will 'send comments later.' The trust issue is now affecting coordination."
      },
      rubric: [
        "Conflict containment",
        "Inquiry quality",
        "Trust repair",
        "Adaptive communication",
        "Leadership action"
      ],
      debriefPrompts: [
        "Where did learners distinguish intent from impact?",
        "Which responses repaired trust while still moving the work forward?",
        "What team norm would reduce the same pattern next time?"
      ],
      replyBank: {
        guarded:
          "I feel like this is being made bigger than it was. We need to decide quickly, and I was naming the issue directly.",
        open:
          "I can see how my wording may have landed sharply. I did not consider that it might shut down the discussion.",
        specific:
          "I can restate the concern in the channel, acknowledge the impact, and propose that we critique the work without dismissing the person.",
        neutral:
          "I am willing to clarify what I meant. I still think we need a faster way to challenge ideas."
      }
    }
  ];

  const seedCohort = [
    { name: "A. Moreno", module: "Indirect Signals", status: "Complete", inquiry: 82, trust: 76, closure: 68 },
    { name: "J. Williams", module: "Indirect Signals", status: "Complete", inquiry: 54, trust: 61, closure: 42 },
    { name: "N. Shah", module: "Feedback", status: "In progress", inquiry: 65, trust: 72, closure: 38 },
    { name: "M. Chen", module: "Feedback", status: "Complete", inquiry: 88, trust: 84, closure: 79 },
    { name: "R. Novak", module: "Trust Repair", status: "Not started", inquiry: 0, trust: 0, closure: 0 }
  ];

  const storageKey = "globalsync-mvp-state-v1";
  const saved = readSavedState();
  const state = {
    view: saved.view || "learner",
    theme: saved.theme || "dark",
    scenarioId: saved.scenarioId || scenarios[0].id,
    phase: saved.phase || "brief",
    messages: saved.messages || [],
    markers: { ...emptyMarkers(), ...(saved.markers || {}) },
    report: saved.report || null,
    wildcardUsed: saved.wildcardUsed || false,
    prework: saved.prework || {
      communication: "Balanced",
      confidence: "Medium",
      goal: "Understand the other person's constraints"
    },
    reflections: saved.reflections || {},
    drafts: saved.drafts || [],
    speech: {
      listening: false,
      interim: "",
      status: speechIsSupported()
        ? "Tap Start dictation to speak your response, then review before sending."
        : "Speech input is not supported in this browser. Type your response instead."
    },
    ai: {
      checked: false,
      configured: false,
      verified: false,
      provider: "Checking AI...",
      model: null,
      busy: false,
      lastError: ""
    }
  };

  const app = document.getElementById("app");
  let recognition = null;

  function readSavedState() {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "{}");
    } catch (error) {
      return {};
    }
  }

  function persist() {
    const snapshot = {
      view: state.view,
      theme: state.theme,
      scenarioId: state.scenarioId,
      phase: state.phase,
      messages: state.messages,
      markers: state.markers,
      report: state.report,
      wildcardUsed: state.wildcardUsed,
      prework: state.prework,
      reflections: state.reflections,
      drafts: state.drafts
    };
    localStorage.setItem(storageKey, JSON.stringify(snapshot));
  }

  function allScenarios() {
    return scenarios.concat(state.drafts);
  }

  function currentScenario() {
    return allScenarios().find((scenario) => scenario.id === state.scenarioId) || scenarios[0];
  }

  function emptyMarkers() {
    return {
      openQuestions: 0,
      assumptions: 0,
      specificEvidence: 0,
      empathy: 0,
      nextSteps: 0,
      solutionProposals: 0,
      faceThreats: 0,
      sensitiveData: 0,
      turns: 0
    };
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function speechIsSupported() {
    return (
      typeof window !== "undefined" &&
      (window.SpeechRecognition || window.webkitSpeechRecognition)
    );
  }

  function getSpeechRecognition() {
    if (!speechIsSupported()) return null;
    if (recognition) return recognition;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      state.speech.listening = true;
      state.speech.status = "Listening. Speak naturally, then stop when ready.";
      syncSpeechUi();
    };

    recognition.onresult = (event) => {
      let interim = "";
      let final = "";
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const transcript = event.results[index][0].transcript;
        if (event.results[index].isFinal) {
          final += transcript;
        } else {
          interim += transcript;
        }
      }

      state.speech.interim = interim.trim();
      if (final.trim()) {
        appendSpeechText(final.trim());
      }
      syncSpeechUi();
    };

    recognition.onerror = (event) => {
      state.speech.listening = false;
      state.speech.interim = "";
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        state.speech.status = "Microphone access is blocked. Use the browser site controls to allow the microphone, then refresh and try again.";
      } else if (event.error === "no-speech") {
        state.speech.status = "No speech was detected. Try again when you are ready.";
      } else {
        state.speech.status = `Speech recognition stopped: ${event.error}.`;
      }
      syncSpeechUi();
    };

    recognition.onend = () => {
      state.speech.listening = false;
      state.speech.interim = "";
      if (state.speech.status === "Listening. Speak naturally, then stop when ready.") {
        state.speech.status = "Dictation stopped. Review the text, then send it when ready.";
      }
      syncSpeechUi();
    };

    return recognition;
  }

  function appendSpeechText(text) {
    const input = document.getElementById("learner-message");
    if (!input) return;

    const current = input.value.trimEnd();
    input.value = current ? `${current} ${text}` : text;
    state.speech.status = "Added speech to the message. Keep speaking or stop to review.";
    input.focus();
  }

  function syncSpeechUi() {
    const button = document.querySelector('[data-action="toggle-speech"]');
    const status = document.getElementById("speech-status");
    const interim = document.getElementById("speech-interim");

    if (button) {
      button.textContent = speechIsSupported()
        ? state.speech.listening
          ? "Stop dictation"
          : "Start dictation"
        : "Speech unavailable";
      button.classList.toggle("listening", state.speech.listening);
      button.setAttribute("aria-pressed", state.speech.listening ? "true" : "false");
    }

    if (status) {
      status.textContent = state.speech.status;
      status.classList.toggle("listening", state.speech.listening);
    }

    if (interim) {
      interim.textContent = state.speech.interim ? `Hearing: ${state.speech.interim}` : "";
    }
  }

  async function requestMicrophoneAccess() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return true;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      return true;
    } catch (error) {
      state.speech.listening = false;
      state.speech.interim = "";
      if (error && (error.name === "NotAllowedError" || error.name === "SecurityError")) {
        state.speech.status = "Microphone access is blocked. Click the browser's site controls near the address bar, allow microphone access, refresh, and try again.";
      } else if (error && error.name === "NotFoundError") {
        state.speech.status = "No microphone was found. Connect or enable a microphone, then try again.";
      } else {
        state.speech.status = "The browser could not open the microphone. Check browser permissions and try again.";
      }
      syncSpeechUi();
      return false;
    }
  }

  async function toggleSpeech() {
    if (!speechIsSupported()) {
      state.speech.status = "Speech input is not supported in this browser. Chrome or Edge usually support this feature.";
      syncSpeechUi();
      return;
    }

    const speech = getSpeechRecognition();
    if (!speech) return;

    if (state.speech.listening) {
      state.speech.status = "Stopping dictation...";
      syncSpeechUi();
      speech.stop();
      return;
    }

    state.speech.status = "Requesting microphone access...";
    state.speech.interim = "";
    syncSpeechUi();

    const hasAccess = await requestMicrophoneAccess();
    if (!hasAccess) return;

    try {
      speech.start();
    } catch (error) {
      state.speech.status = "Dictation is already starting. Wait a moment, then try again.";
      syncSpeechUi();
    }
  }

  function stopSpeechIfListening() {
    if (recognition && state.speech.listening) {
      try {
        recognition.stop();
      } catch (error) {
        state.speech.listening = false;
      }
      state.speech.interim = "";
      syncSpeechUi();
    }
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function scoreColor(value) {
    if (value >= 74) return "green";
    if (value >= 48) return "amber";
    return "red";
  }

  function scoreLabel(value) {
    if (value >= 74) return "Strong";
    if (value >= 48) return "Developing";
    return "Needs attention";
  }

  function reportScores(report) {
    return Array.isArray(report.scores)
      ? report.scores
        .filter((score) => score && score.label)
        .map((score) => ({
          label: score.label,
          value: clamp(Number(score.value) || 0, 0, 100)
        }))
      : [];
  }

  function getBehaviorVisualRows() {
    const markers = state.markers || emptyMarkers();
    const turns = Math.max(1, markers.turns || 0);
    return [
      {
        label: "Inquiry",
        count: markers.openQuestions || 0,
        value: Math.round(((markers.openQuestions || 0) / turns) * 100),
        kind: "green",
        note: "Questions that test meaning before judging intent"
      },
      {
        label: "Evidence",
        count: markers.specificEvidence || 0,
        value: Math.round(((markers.specificEvidence || 0) / turns) * 100),
        kind: "green",
        note: "Concrete dates, examples, impacts, or deliverables"
      },
      {
        label: "Trust",
        count: markers.empathy || 0,
        value: Math.round(((markers.empathy || 0) / turns) * 100),
        kind: "green",
        note: "Respect, support, appreciation, or concern"
      },
      {
        label: "Solutions",
        count: markers.solutionProposals || 0,
        value: Math.round(((markers.solutionProposals || 0) / turns) * 100),
        kind: "amber",
        note: "Proposed fixes that may help or may arrive too early"
      },
      {
        label: "Closure",
        count: markers.nextSteps || 0,
        value: Math.round(((markers.nextSteps || 0) / turns) * 100),
        kind: "amber",
        note: "Owner, action, timing, or checkpoint"
      },
      {
        label: "Risk",
        count: (markers.assumptions || 0) + (markers.faceThreats || 0) + (markers.sensitiveData || 0),
        value: Math.round((((markers.assumptions || 0) + (markers.faceThreats || 0) + (markers.sensitiveData || 0)) / turns) * 100),
        kind: "red",
        note: "Assumptions, face threats, or sensitive detail"
      }
    ].map((row) => ({ ...row, value: clamp(row.value, 0, 100) }));
  }

  function signalLabels(flags) {
    const labels = [];
    if (flags.openQuestion) labels.push("Open question");
    if (flags.specificEvidence) labels.push("Evidence");
    if (flags.empathy) labels.push("Trust signal");
    if (flags.nextSteps) labels.push("Next step");
    if (flags.solutionProposal) labels.push("Solution");
    if (flags.assumption) labels.push("Assumption risk");
    if (flags.faceThreat) labels.push("Face threat");
    if (flags.sensitiveData) labels.push("Sensitive data");
    return labels.length ? labels : ["Low signal"];
  }

  function turnTone(flags) {
    if (flags.sensitiveData || flags.faceThreat) return "risk";
    if (flags.assumption && !flags.openQuestion) return "risk";
    if (flags.solutionProposal && !flags.openQuestion && !flags.empathy) return "watch";
    if (flags.nextSteps) return "closure";
    if (flags.openQuestion || flags.empathy || flags.specificEvidence) return "helpful";
    return "neutral";
  }

  function turnToneLabel(tone) {
    if (tone === "risk") return "Risk";
    if (tone === "watch") return "Watch";
    if (tone === "closure") return "Closure";
    if (tone === "helpful") return "Helpful";
    return "Neutral";
  }

  function formatMessageTime(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function truncateText(text, maxLength = 150) {
    const clean = String(text || "").replace(/\s+/g, " ").trim();
    return clean.length > maxLength ? `${clean.slice(0, maxLength - 1).trim()}...` : clean;
  }

  function setView(view) {
    state.view = view;
    persist();
    render();
  }

  function selectScenario(id) {
    stopSpeechIfListening();
    state.scenarioId = id;
    state.phase = "brief";
    state.messages = [];
    state.markers = emptyMarkers();
    state.report = null;
    state.wildcardUsed = false;
    persist();
    render();
  }

  function startScenario() {
    const scenario = currentScenario();
    state.phase = "simulation";
    state.report = null;
    state.messages = [
      {
        sender: scenario.persona.name,
        role: scenario.persona.role,
        text: scenario.persona.opening,
        type: "agent",
        time: new Date().toISOString()
      }
    ];
    state.markers = emptyMarkers();
    state.wildcardUsed = false;
    persist();
    render();
    scrollTranscript();
  }

  function analyzeText(text) {
    const lower = text.toLowerCase();
    const openQuestion =
      text.includes("?") ||
      /\b(what|how|could|can you|would you|help me understand|walk me through|tell me more|what concerns)\b/.test(lower);
    const assumption = /\b(obviously|clearly|always|never|excuse|unprofessional|not committed|avoid|avoiding|you failed|your fault)\b/.test(lower);
    const specificEvidence =
      /\b(deadline|deliverable|draft|monday|tuesday|wednesday|thursday|friday|date|example|impact|because|specific)\b/.test(lower);
    const empathy = /\b(appreciate|understand|respect|concern|support|help|thanks|thank you|pressure|difficult)\b/.test(lower);
    const nextSteps = /\b(next step|by |owner|follow up|follow-up|plan|commit|checkpoint|tomorrow|today|this week|date)\b/.test(lower);
    const freelancer = /\b(freelancer|contractor|outside analyst|external analyst)\b/.test(lower);
    const outsourcing = /\b(outsource|outsourcing|vendor|third party|third-party)\b/.test(lower);
    const solutionProposal = freelancer || outsourcing || /\b(use another|hire|reassign|add someone|bring someone)\b/.test(lower);
    const directCommand = /\b(let's|we should|you should|should be used|just|can't you|can we use)\b/.test(lower);
    const repairAttempt = /\b(sorry|apologize|i may have|let me reframe|i did not mean|that came out)\b/.test(lower);
    const faceThreat = flagsFaceThreat(lower);
    const sensitiveData = /\b(confidential|client secret|social security|ssn|salary|medical|passport|private client)\b/.test(lower);

    return {
      openQuestion,
      assumption,
      specificEvidence,
      empathy,
      nextSteps,
      solutionProposal,
      freelancer,
      outsourcing,
      directCommand,
      repairAttempt,
      faceThreat,
      sensitiveData
    };
  }

  function flagsFaceThreat(lower) {
    return /\b(unprofessional|unavailable all of a sudden|your fault|you failed|not committed|excuse|incompetent|should have told)\b/.test(lower);
  }

  function updateMarkers(flags) {
    state.markers.turns += 1;
    if (flags.openQuestion) state.markers.openQuestions += 1;
    if (flags.assumption) state.markers.assumptions += 1;
    if (flags.specificEvidence) state.markers.specificEvidence += 1;
    if (flags.empathy) state.markers.empathy += 1;
    if (flags.nextSteps) state.markers.nextSteps += 1;
    if (flags.solutionProposal) state.markers.solutionProposals += 1;
    if (flags.faceThreat) state.markers.faceThreats += 1;
    if (flags.sensitiveData) state.markers.sensitiveData += 1;
  }

  async function sendMessage() {
    stopSpeechIfListening();
    const input = document.getElementById("learner-message");
    const text = input ? input.value.trim() : "";
    if (!text) return;

    const scenario = currentScenario();
    const flags = analyzeText(text);
    updateMarkers(flags);

    state.messages.push({
      sender: "You",
      role: "Learner",
      text,
      type: "user",
      time: new Date().toISOString()
    });

    if (flags.sensitiveData) {
      state.messages.push({
        sender: "System",
        role: "Safety notice",
        text:
          "Pause before sharing sensitive or confidential details. Keep the practice scenario fictional and remove private identifiers.",
        type: "system",
        time: new Date().toISOString()
      });
    }

    if (input) input.value = "";
    state.ai.busy = true;
    state.ai.lastError = "";
    persist();
    render();
    scrollTranscript();

    const aiText = await getAiPersonaReply(scenario, text);

    state.messages.push({
      sender: scenario.persona.name,
      role: scenario.persona.role,
      text: aiText || choosePersonaReply(scenario, flags, text),
      type: "agent",
      time: new Date().toISOString(),
      engine: aiText ? "ai" : "local"
    });

    state.ai.busy = false;
    persist();
    render();
    scrollTranscript();
  }

  async function checkAiStatus() {
    try {
      const response = await fetch("/api/ai-status", { cache: "no-store" });
      if (!response.ok) throw new Error(`Status ${response.status}`);
      const data = await response.json();
      state.ai.checked = true;
      state.ai.configured = Boolean(data.configured);
      state.ai.verified = false;
      state.ai.provider = data.configured ? data.provider || "AI key found" : "Set AI API key";
      state.ai.model = data.model || null;
      state.ai.lastError = data.configured ? "" : "Set OPENAI_API_KEY or GROQ_API_KEY to enable live AI.";
    } catch (error) {
      state.ai.checked = true;
      state.ai.configured = false;
      state.ai.verified = false;
      state.ai.provider = "Local fallback";
      state.ai.model = null;
      state.ai.lastError = "AI endpoint is not reachable. Check the local server or Vercel API routes.";
    }
    render();
  }

  async function getAiPersonaReply(scenario, learnerText) {
    try {
      const response = await fetch("/api/sim/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario,
          messages: state.messages,
          markers: state.markers,
          learnerText
        })
      });

      if (!response.ok) {
        const data = await safeJson(response);
        state.ai.verified = false;
        state.ai.configured = response.status !== 503 && state.ai.configured;
        state.ai.provider = state.ai.configured ? "AI unavailable" : "Local fallback";
        state.ai.lastError = data.error || `AI unavailable (${response.status}). Using local fallback.`;
        return null;
      }

      const data = await response.json();
      state.ai.checked = true;
      state.ai.configured = true;
      state.ai.verified = true;
      state.ai.provider = data.provider || "AI enabled";
      state.ai.model = data.model || state.ai.model;
      state.ai.lastError = "";
      return data.text;
    } catch (error) {
      state.ai.configured = false;
      state.ai.verified = false;
      state.ai.provider = "Local fallback";
      state.ai.model = null;
      state.ai.lastError = "AI service is not reachable. Using local fallback.";
      return null;
    }
  }

  async function safeJson(response) {
    try {
      return await response.json();
    } catch (error) {
      return {};
    }
  }

  function choosePersonaReply(scenario, flags, learnerText) {
    if (scenario.id === "indirect-signals") {
      return chooseMeiReply(flags, learnerText);
    }
    if (scenario.id === "feedback-face") {
      return chooseAaravReply(flags);
    }
    if (scenario.id === "trust-repair") {
      return chooseElenaReply(flags);
    }

    const markers = state.markers;
    if (flags.assumption && !flags.empathy) return scenario.replyBank.guarded;
    if (flags.specificEvidence && flags.nextSteps && (flags.openQuestion || flags.empathy)) {
      return scenario.replyBank.specific;
    }
    if (flags.openQuestion || flags.empathy) return scenario.replyBank.open;
    if (markers.turns >= 4 && markers.nextSteps === 0) {
      return "I think we understand each other better, but I am not sure what we are agreeing to do next.";
    }
    return scenario.replyBank.neutral;
  }

  function priorUserTexts() {
    return state.messages
      .filter((message) => message.type === "user")
      .map((message) => message.text.toLowerCase())
      .join(" ");
  }

  function chooseMeiReply(flags, learnerText) {
    const lower = learnerText.toLowerCase();
    const prior = priorUserTexts();
    const freelancerMentions = countMatches(prior, /\b(freelancer|contractor|outside analyst|external analyst)\b/g);
    const outsourceMentions = countMatches(prior, /\b(outsource|outsourcing|vendor|third party|third-party)\b/g);
    const repeatedFreelancer = flags.freelancer && freelancerMentions > 1;
    const repeatedOutsource = flags.outsourcing && outsourceMentions > 1;
    const askedConstraints = /\b(what kind|what constraints|what concerns|not aligning|anything about it|how can we help)\b/.test(lower);
    const enoughForAction = flags.nextSteps || /\b(thursday|monday|owner|scope|checkpoint|approve|budget|data access)\b/.test(lower);

    if (flags.faceThreat && (flags.freelancer || flags.outsourcing)) {
      return "I understand why the sudden change is frustrating. When it is framed as unprofessional, I become more cautious because my local team is already worried about losing face. A freelancer may help, but only if that person is approved for data access and the scope is narrow. Could we first agree on what work can safely be handled outside the core team?";
    }

    if (flags.faceThreat) {
      return "I hear the frustration. I also want to be careful: if my team feels blamed, they may stop raising problems early. The practical issue is analyst coverage, not commitment. I can explain the constraint if we can focus on options rather than fault.";
    }

    if ((flags.freelancer || flags.outsourcing) && enoughForAction) {
      return "That could be workable under two conditions: the support must be approved for data access, and we should reduce the first deliverable to the launch-critical analysis only. If you can confirm budget and approval today, I can check with my lead and propose a Monday checkpoint.";
    }

    if ((repeatedFreelancer || repeatedOutsource) && freelancerMentions + outsourceMentions >= 5 && /\b(let's|hire)\b/.test(lower)) {
      return "If the decision is to hire outside help, I need to be transparent about what I can and cannot commit to. I can support a vetted contractor for raw data cleanup, but I cannot hand over local interpretation or promise the original deadline until my lead approves the data-access risk. A respectful next step would be for us to document that option and confirm approval today.";
    }

    if ((repeatedFreelancer || repeatedOutsource) && freelancerMentions + outsourceMentions >= 5) {
      return "At this point, I think we are circling around the same solution. My concern is narrower than whether a freelancer exists: it is data access, onboarding time, and accountability if the work is wrong. I would recommend we decide between two options: reduce scope for Monday, or use outside support only for data preparation with internal review.";
    }

    if ((repeatedFreelancer || repeatedOutsource) && freelancerMentions + outsourceMentions >= 3) {
      if (flags.directCommand) {
        return "I cannot personally hire or outsource the work without approval. What I can do is propose a controlled option: your side confirms budget and data-access approval today, we limit the outside support to raw data cleanup, and my team keeps responsibility for local interpretation and quality. If that is acceptable, I can take it to my lead.";
      }
      return "I hear that outside support is your preferred option. My concern is that outsourcing the whole task could create more risk than delay. I would be comfortable with a narrower decision: external help for data preparation only, internal review by my team, and a Monday checkpoint before we promise the final date.";
    }

    if (repeatedFreelancer || repeatedOutsource) {
      return "I do not want to simply say yes to outsourcing and create a risk later. The obstacle is not only headcount; it is onboarding, data access, and quality control. A safer plan may be: your team helps with the raw data cleanup, my team handles the local interpretation, and we meet Monday to decide whether outside support is still needed.";
    }

    if (flags.freelancer || flags.outsourcing || /\b(use another analyst|another analyst|hire)\b/.test(lower)) {
      return "A temporary analyst is one possible option, but there are constraints. They would need approval for customer data, time to understand the local assumptions, and someone from my team to review the work. If we use that route, I would prefer a narrow scope rather than handing off the whole task.";
    }

    if (askedConstraints || (flags.openQuestion && flags.empathy)) {
      return "Thank you for asking it that way. The specific issue is analyst coverage: one analyst was pulled into an urgent regional request, and I was trying to solve it before escalating. If we can reduce the first report to the launch-critical items, I can be more confident about a checkpoint early next week.";
    }

    if (flags.openQuestion) {
      return "The main concern is capacity and timing. I can share more, but I would prefer not to make a public commitment until I confirm what support my team actually has.";
    }

    if (flags.directCommand && !flags.openQuestion) {
      return "I can consider that direction, but I would be more comfortable if we clarify the approval, data access, and exact scope first. Otherwise I may agree too quickly and create a bigger delivery problem.";
    }

    if (state.markers.turns >= 4 && state.markers.nextSteps === 0) {
      return "We have several possible options now, but I still need a concrete path: what is the narrowed deliverable, who will approve outside support if needed, and when should we review the updated timeline?";
    }

    return "I want to support the launch and preserve the relationship. The part I need help with is making the commitment realistic rather than optimistic.";
  }

  function countMatches(text, pattern) {
    return (text.match(pattern) || []).length;
  }

  function chooseAaravReply(flags) {
    if (flags.faceThreat) {
      return "I understand the concern. I am embarrassed by the delay, and direct criticism makes it harder for me to explain the competing requests I received. I can be more transparent if we focus on priorities and the next deliverable.";
    }
    if (flags.solutionProposal && flags.nextSteps) {
      return "That plan helps. If you confirm which stakeholder request takes priority, I can send a first draft by tomorrow afternoon and flag any conflict before accepting more work.";
    }
    if (flags.openQuestion || flags.empathy) {
      return "Thank you for asking. I was receiving requests from two senior people and did not want to challenge either one publicly. I should have clarified the priority with you earlier.";
    }
    return "I understand the missed deadline created pressure. I will try to correct it, but I need clarity on which work should come first.";
  }

  function chooseElenaReply(flags) {
    if (flags.faceThreat) {
      return "I am willing to discuss the impact, but I do not think labeling the comment as unprofessional will help us reset. I need to understand what landed badly and how direct challenge should happen in this team.";
    }
    if (flags.nextSteps && (flags.openQuestion || flags.empathy)) {
      return "That feels workable. I can acknowledge the impact in the channel, restate the concern in less dismissive language, and agree that we critique ideas without dismissing people.";
    }
    if (flags.openQuestion || flags.empathy) {
      return "I can see how my wording may have sounded dismissive. My intent was speed, but I understand that impact matters more than intent if the team goes quiet.";
    }
    return "I still think we need direct debate, but I agree the team needs a norm that keeps people participating.";
  }

  function injectWildcard() {
    if (state.wildcardUsed) return;
    const scenario = currentScenario();
    state.wildcardUsed = true;
    state.messages.push({
      sender: "Scenario event",
      role: scenario.wildcard.title,
      text: scenario.wildcard.text,
      type: "system",
      time: new Date().toISOString()
    });
    persist();
    render();
    scrollTranscript();
  }

  async function finishScenario() {
    stopSpeechIfListening();
    const aiReport = await getAiReport(currentScenario());
    state.report = aiReport || buildReport(currentScenario(), state.messages, state.markers);
    state.phase = "report";
    persist();
    render();
  }

  async function getAiReport(scenario) {
    try {
      const response = await fetch("/api/sim/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario,
          messages: state.messages,
          markers: state.markers
        })
      });
      if (!response.ok) return null;
      const data = await response.json();
      if (!data.report) return null;
      state.ai.configured = true;
      state.ai.verified = true;
      state.ai.provider = data.provider || "AI enabled";
      state.ai.model = data.model || state.ai.model;
      state.ai.lastError = "";
      return {
        ...data.report,
        generatedAt: new Date().toLocaleString(),
        scenarioTitle: scenario.title
      };
    } catch (error) {
      return null;
    }
  }

  function buildReport(scenario, messages, markers) {
    const turns = Math.max(1, markers.turns);
    const inquiry = clamp(Math.round((markers.openQuestions / turns) * 100 + 18), 18, 96);
    const specificity = clamp(Math.round((markers.specificEvidence / turns) * 100 + (markers.nextSteps ? 18 : 4)), 14, 96);
    const trust = clamp(Math.round(((markers.empathy + markers.openQuestions) / (turns * 2)) * 100 + 28 - markers.assumptions * 12 - markers.faceThreats * 10), 10, 96);
    const adaptation = clamp(Math.round((markers.openQuestions + markers.empathy + markers.specificEvidence) / (turns * 3) * 100 + 24), 16, 94);
    const closure = clamp(Math.round((markers.nextSteps / turns) * 100 + 20), 18, 96);
    const overall = Math.round((inquiry + specificity + trust + adaptation + closure) / 5);
    const userMessages = messages.filter((message) => message.type === "user");
    const bestEvidence = userMessages.find((message) => analyzeText(message.text).openQuestion || analyzeText(message.text).empathy);
    const closureEvidence = userMessages.find((message) => analyzeText(message.text).nextSteps);
    const assumptionEvidence = userMessages.find((message) => analyzeText(message.text).assumption);

    return {
      generatedAt: new Date().toLocaleString(),
      overall,
      scores: [
        { label: "Inquiry quality", value: inquiry },
        { label: "Feedback specificity", value: specificity },
        { label: "Trust building", value: trust },
        { label: "Adaptability", value: adaptation },
        { label: "Action closure", value: closure }
      ],
      narrative:
        overall >= 74
          ? "You created enough psychological safety to surface constraints and still moved toward action."
          : overall >= 50
            ? "You made progress, but the conversation needs more inquiry, clearer evidence, or a firmer next step."
            : "The exchange stayed too vague or too judgmental to reliably build trust and operational clarity.",
      strengths: [
        markers.openQuestions > 0
          ? "You used inquiry to test interpretation before deciding what the other person meant."
          : "You stayed engaged through the conversation and created material for reflection.",
        markers.empathy > 0
          ? "You signaled respect for the relationship, which made disclosure more likely."
          : "You kept the conversation task-focused."
      ],
      misses: [
        markers.nextSteps === 0
          ? "The conversation needs an owner, date, and follow-up action before it becomes useful at work."
          : "Your next step was helpful; make sure it includes both accountability and room for constraints.",
        markers.assumptions > 0
          ? "At least one phrase sounded like a conclusion about intent. Convert that into a testable question."
          : markers.solutionProposals > markers.openQuestions
            ? "You moved to solutions quickly. Slow down enough to confirm constraints, authority, and risks first."
            : "Keep watching for hidden assumptions even when the conversation feels smooth."
      ],
      evidence: {
        best: bestEvidence ? bestEvidence.text : "No strong inquiry moment was detected.",
        closure: closureEvidence ? closureEvidence.text : "No clear action-closing statement was detected.",
        risk: assumptionEvidence ? assumptionEvidence.text : "No high-risk assumption phrase was detected."
      },
      prompts: [
        "What did you assume before the other person had explained their constraints?",
        "Which phrase improved trust or reduced defensiveness?",
        "What would you say differently in the first two turns?",
        "What one behavior will you practice in a real conversation this week?"
      ],
      scenarioTitle: scenario.title
    };
  }

  function resetSession() {
    stopSpeechIfListening();
    state.phase = "brief";
    state.messages = [];
    state.markers = emptyMarkers();
    state.report = null;
    state.wildcardUsed = false;
    persist();
    render();
  }

  function scrollTranscript() {
    window.setTimeout(() => {
      const transcript = document.querySelector(".transcript");
      if (transcript) transcript.scrollTop = transcript.scrollHeight;
    }, 0);
  }

  function updatePrework(key, value) {
    state.prework[key] = value;
    persist();
    render();
  }

  function updateReflection(key, value) {
    state.reflections[key] = value;
    persist();
  }

  function exportReport() {
    const report = state.report;
    const scenario = currentScenario();
    if (!report) return;
    const behaviorRows = getBehaviorVisualRows();
    const lines = [
      "# GlobalSync Learner Report",
      "",
      `Scenario: ${scenario.title}`,
      `Generated: ${report.generatedAt}`,
      `Overall: ${report.overall}/100`,
      "",
      "## Scores",
      ...reportScores(report).map((score) => `- ${score.label}: ${score.value}/100`),
      "",
      "## Behavior Signals",
      ...behaviorRows.map((row) => `- ${row.label}: ${row.count} signal(s), ${row.value}% of learner turns`),
      "",
      "## Narrative",
      report.narrative,
      "",
      "## Strengths",
      ...report.strengths.map((item) => `- ${item}`),
      "",
      "## Missed Opportunities",
      ...report.misses.map((item) => `- ${item}`),
      "",
      "## Evidence",
      `- Strong moment: ${report.evidence.best}`,
      `- Closure: ${report.evidence.closure}`,
      `- Risk: ${report.evidence.risk}`,
      "",
      "## Reflection",
      ...report.prompts.map((prompt, index) => `- ${prompt} ${state.reflections[`prompt-${index}`] || ""}`)
    ];
    downloadText("globalsync-learner-report.md", lines.join("\n"));
  }

  function exportFacilitatorPacket() {
    const scenario = currentScenario();
    const themes = getThemeMetrics();
    const lines = [
      "# GlobalSync Facilitator Debrief Packet",
      "",
      `Scenario focus: ${scenario.title}`,
      "",
      "## Cohort Pain Points",
      ...themes.map((theme) => `- ${theme.label}: ${theme.value}%`),
      "",
      "## Suggested Debrief Questions",
      ...scenario.debriefPrompts.map((prompt) => `- ${prompt}`),
      "",
      "## Representative Evidence",
      state.report ? `- ${state.report.evidence.best}` : "- Run a learner session to capture live evidence."
    ];
    downloadText("globalsync-facilitator-packet.md", lines.join("\n"));
  }

  function downloadText(filename, text) {
    const blob = new Blob([text], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function saveDraftScenario(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const title = String(formData.get("title") || "Custom scenario").trim();
    const personaName = String(formData.get("personaName") || "AI partner").trim();
    const draft = {
      id: `draft-${Date.now()}`,
      module: "Draft",
      title,
      status: "Draft",
      due: "Unassigned",
      duration: String(formData.get("duration") || "12 min"),
      audience: String(formData.get("audience") || "Pilot learners"),
      objective: String(formData.get("objective") || ""),
      learnerRole: String(formData.get("learnerRole") || ""),
      brief: String(formData.get("brief") || ""),
      successCriteria: splitLines(String(formData.get("successCriteria") || "")),
      persona: {
        name: personaName,
        role: String(formData.get("personaRole") || "AI persona"),
        context: String(formData.get("culturalVariables") || ""),
        posture: String(formData.get("posture") || ""),
        hidden: String(formData.get("hidden") || ""),
        opening: String(formData.get("opening") || "Thank you for meeting with me. I am ready to discuss the situation.")
      },
      wildcard: {
        title: String(formData.get("wildcardTitle") || "New constraint"),
        text: String(formData.get("wildcardText") || "A new constraint changes the tone of the conversation.")
      },
      rubric: splitLines(String(formData.get("rubric") || "")),
      debriefPrompts: splitLines(String(formData.get("debriefPrompts") || "")),
      replyBank: {
        guarded: "I am not fully comfortable with that framing. There may be more context to consider.",
        open: "I appreciate the question. There is a constraint I should explain before we decide.",
        specific: "That next step is clear. I can work with that plan and confirm the timing.",
        neutral: "I understand. Let me think through what is realistic from my side."
      }
    };
    state.drafts.push(draft);
    state.scenarioId = draft.id;
    state.phase = "brief";
    persist();
    render();
  }

  function splitLines(value) {
    return value
      .split(/\n|;/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  function getThemeMetrics() {
    const report = state.report;
    if (!report) {
      return [
        { label: "Premature attribution", value: 46 },
        { label: "Under-specific feedback", value: 58 },
        { label: "Missing action closure", value: 62 },
        { label: "Strong inquiry moments", value: 54 }
      ];
    }
    return [
      { label: "Premature attribution", value: clamp(30 + state.markers.assumptions * 16, 8, 88) },
      { label: "Under-specific feedback", value: clamp(86 - report.scores[1].value, 6, 86) },
      { label: "Missing action closure", value: clamp(94 - report.scores[4].value, 4, 88) },
      { label: "Strong inquiry moments", value: report.scores[0].value }
    ];
  }

  function liveCoachHint() {
    const markers = state.markers;
    if (markers.turns === 0) return "Start by asking what constraints or concerns are shaping the other person's response.";
    if (markers.assumptions > 0 && markers.openQuestions <= markers.assumptions) {
      return "Convert your interpretation into a question before pressing for agreement.";
    }
    if (markers.specificEvidence === 0) return "Add a concrete observation, date, impact, or example.";
    if (markers.nextSteps === 0) return "Close with owner, action, and timing.";
    return "You have inquiry, evidence, and action. Now check shared understanding.";
  }

  function render() {
    document.documentElement.dataset.theme = state.theme;
    app.innerHTML = `
      <div class="app-shell">
        ${renderTopbar()}
        ${renderMain()}
      </div>
    `;
    bindEvents();
  }

  function renderTopbar() {
    const nav = [
      ["learner", "Learner"],
      ["facilitator", "Facilitator"],
      ["author", "Author"],
      ["governance", "Governance"]
    ];
    const aiLabel = !state.ai.checked
      ? "Checking AI"
      : state.ai.verified
        ? "Live AI"
        : state.ai.configured
          ? "AI configured"
          : "AI not configured";
    const aiDetail = !state.ai.checked
      ? "Checking server"
      : state.ai.verified
        ? state.ai.model || state.ai.provider
        : state.ai.configured
          ? state.ai.model || state.ai.provider
          : state.ai.provider;
    const aiClass = state.ai.verified ? "live" : "fallback";
    const themeLabel = state.theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
    return `
      <header class="topbar">
        <div class="brand">
          <img src="assets/thunderbird-logo.png?v=19" alt="Thunderbird Global Executive Education" />
          <div class="brand-text">
            <strong>GlobalSync</strong>
            <span>Cross-cultural practice and debrief</span>
          </div>
        </div>
        <nav class="nav-tabs" aria-label="Primary views">
          ${nav.map(([id, label]) => `<button data-view="${id}" class="${state.view === id ? "active" : ""}">${label}</button>`).join("")}
        </nav>
        <div class="top-actions">
          <button class="theme-toggle" data-action="toggle-theme" aria-label="${themeLabel}" title="${themeLabel}" aria-pressed="${state.theme === "dark" ? "true" : "false"}">
            <span class="theme-toggle-track" aria-hidden="true"><span class="theme-toggle-orb"></span></span>
            <span>${state.theme === "dark" ? "Dark" : "Light"}</span>
          </button>
          <div class="ai-badge ${aiClass}" title="${escapeHtml(state.ai.lastError || state.ai.provider)}">
            <strong>${aiLabel}</strong>
            <span>${escapeHtml(aiDetail)}</span>
          </div>
        </div>
      </header>
    `;
  }

  function renderMain() {
    if (state.view === "facilitator") return renderFacilitator();
    if (state.view === "author") return renderAuthor();
    if (state.view === "governance") return renderGovernance();
    return renderLearner();
  }

  function renderLearner() {
    return `
      <main class="workspace learner-grid">
        ${renderModuleRail()}
        <section class="practice-panel">
          ${state.phase === "simulation" ? renderSimulation() : state.phase === "report" ? renderReport() : renderBrief()}
        </section>
        ${renderCoachPanel()}
      </main>
    `;
  }

  function renderModuleRail() {
    return `
      <aside class="module-rail">
        <div class="eyebrow">Practice queue</div>
        <h2>Assigned modules</h2>
        <div class="module-list">
          ${allScenarios().map((scenario) => `
            <button class="module-card ${scenario.id === state.scenarioId ? "active" : ""}" data-scenario="${scenario.id}">
              <strong>${escapeHtml(scenario.title)}</strong>
              <span>${escapeHtml(scenario.module)} / ${escapeHtml(scenario.duration)} / ${escapeHtml(scenario.due)}</span>
            </button>
          `).join("")}
        </div>
      </aside>
    `;
  }

  function renderBrief() {
    const scenario = currentScenario();
    return `
      <div class="panel-section">
        <div class="section-title">
          <div>
            <div class="meta-row">
              <span class="pill">${escapeHtml(scenario.module)}</span>
              <span class="status-pill ready">${escapeHtml(scenario.status)}</span>
              <span class="pill">${escapeHtml(scenario.duration)}</span>
            </div>
            <h1>${escapeHtml(scenario.title)}</h1>
            <p>${escapeHtml(scenario.objective)}</p>
          </div>
          <button class="primary" data-action="start">Start practice</button>
        </div>
      </div>
      <div class="panel-section brief-grid">
        <div>
          <div class="eyebrow">Scenario brief</div>
          <h2>Your role</h2>
          <p>${escapeHtml(scenario.learnerRole)}</p>
          <h2>Situation</h2>
          <p>${escapeHtml(scenario.brief)}</p>
          <h2>Success criteria</h2>
          <ul class="info-list">
            ${scenario.successCriteria.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </div>
        <div class="prework-grid">
          <div class="notice">
            <strong>Data notice</strong>
            <p>Use fictional details. The report is formative practice evidence for learner reflection and facilitated debrief.</p>
          </div>
          <div>
            <label>Default communication style</label>
            <small>This calibrates your reflection, not the persona.</small>
            <div class="segmented" data-prework="communication">
              ${["Direct", "Balanced", "Indirect"].map((value) => `<button class="${state.prework.communication === value ? "active" : ""}" data-value="${value}">${value}</button>`).join("")}
            </div>
          </div>
          <div>
            <label>Confidence with this conversation</label>
            <div class="segmented" data-prework="confidence">
              ${["Low", "Medium", "High"].map((value) => `<button class="${state.prework.confidence === value ? "active" : ""}" data-value="${value}">${value}</button>`).join("")}
            </div>
          </div>
          <div>
            <label for="practice-goal">Personal goal</label>
            <input id="practice-goal" class="field-input" type="text" value="${escapeHtml(state.prework.goal)}" />
          </div>
        </div>
      </div>
      <div class="panel-section">
        <div class="two-column">
          <div class="info-box">
            <h2>AI persona</h2>
            <p><strong>${escapeHtml(scenario.persona.name)}</strong>, ${escapeHtml(scenario.persona.role)}</p>
            <p>${escapeHtml(scenario.persona.context)}</p>
          </div>
          <div class="info-box">
            <h2>Rubric focus</h2>
            <div class="tag-row">
              ${scenario.rubric.map((item) => `<span class="pill">${escapeHtml(item)}</span>`).join("")}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderSimulation() {
    const scenario = currentScenario();
    return `
      <div class="chat-layout">
        <div class="chat-main">
          <div class="chat-header">
            <div class="section-title">
              <div>
                <div class="eyebrow">Practice room</div>
                <h1>${escapeHtml(scenario.title)}</h1>
                <div class="meta-row">
                  <span class="pill">${escapeHtml(scenario.persona.name)}</span>
                  <span class="pill">${state.markers.turns} learner turns</span>
                  ${state.wildcardUsed ? `<span class="risk-pill">Wildcard active</span>` : ""}
                </div>
              </div>
              <div class="button-row">
                <button class="ghost" data-action="wildcard" ${state.wildcardUsed ? "disabled" : ""}>Trigger event</button>
                <button class="secondary" data-action="finish">Finish report</button>
              </div>
            </div>
          </div>
          <div class="transcript" aria-live="polite">
            ${state.messages.map(renderMessage).join("")}
            ${state.ai.busy ? `
              <article class="message system">
                <div class="sender"><span>GlobalSync AI / Thinking</span><span>now</span></div>
                <p>Reading the scenario, persona profile, and recent transcript...</p>
              </article>
            ` : ""}
          </div>
          <div class="composer">
            <div class="tag-row" aria-label="Suggested moves">
              <button class="chip" data-draft="What concerns or constraints should I understand before we lock the date?">Ask constraints</button>
              <button class="chip" data-draft="I want to separate the issue from the person. The impact I am seeing is...">Name impact</button>
              <button class="chip" data-draft="Can we agree on the next owner, date, and checkpoint?">Close action</button>
            </div>
            <label class="sr-only" for="learner-message">Message</label>
            <textarea id="learner-message" placeholder="Type your response to the persona"></textarea>
            <div class="speech-row">
              <button class="mic-button ${state.speech.listening ? "listening" : ""}" data-action="toggle-speech" aria-pressed="${state.speech.listening ? "true" : "false"}">
                ${speechIsSupported() ? state.speech.listening ? "Stop dictation" : "Start dictation" : "Speech unavailable"}
              </button>
              <div>
                <div id="speech-status" class="speech-status ${state.speech.listening ? "listening" : ""}">${escapeHtml(state.speech.status)}</div>
                <div id="speech-interim" class="speech-interim">${state.speech.interim ? `Hearing: ${escapeHtml(state.speech.interim)}` : ""}</div>
              </div>
            </div>
            <div class="button-row">
              <button class="primary" data-action="send">Send</button>
              <button class="ghost" data-action="finish">End and debrief</button>
            </div>
          </div>
        </div>
        <aside class="context-pane">
          <div class="eyebrow">Context</div>
          <h2>${escapeHtml(scenario.persona.name)}</h2>
          <p>${escapeHtml(scenario.persona.posture)}</p>
          <h3>Learning target</h3>
          <p>${escapeHtml(scenario.objective)}</p>
          <h3>Success criteria</h3>
          <ul class="info-list">
            ${scenario.successCriteria.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </aside>
      </div>
    `;
  }

  function renderMessage(message) {
    const css = message.type === "user" ? "user" : message.type === "system" ? "system" : "agent";
    return `
      <article class="message ${css}">
        <div class="sender">
          <span>${escapeHtml(message.sender)} / ${escapeHtml(message.role)}</span>
          <span>${new Date(message.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
        </div>
        <p>${escapeHtml(message.text)}</p>
      </article>
    `;
  }

  function renderCoachPanel() {
    const markers = state.markers;
    const turns = Math.max(1, markers.turns);
    const markerRows = [
      ["Open questions", markers.openQuestions, Math.round((markers.openQuestions / turns) * 100), "green"],
      ["Specific evidence", markers.specificEvidence, Math.round((markers.specificEvidence / turns) * 100), "green"],
      ["Trust signals", markers.empathy, Math.round((markers.empathy / turns) * 100), "green"],
      ["Action closure", markers.nextSteps, Math.round((markers.nextSteps / turns) * 100), "amber"],
      ["Assumption risk", markers.assumptions, Math.round((markers.assumptions / turns) * 100), "red"]
    ];
    return `
      <aside class="coach-panel">
        <div class="eyebrow">Live coach</div>
        <h2>Behavior markers</h2>
        <div class="marker-list">
          ${markerRows.map(([label, count, value, color]) => `
            <div class="marker">
              <span>${label}: ${count}</span>
              <div class="bar ${color}" style="--value:${clamp(value, 0, 100)}%"><i></i></div>
            </div>
          `).join("")}
        </div>
        <div class="notice" style="margin-top: 16px;">
          <strong>Next best move</strong>
          <p>${escapeHtml(liveCoachHint())}</p>
        </div>
      </aside>
    `;
  }

  function renderReportVisuals(report) {
    const scores = reportScores(report);
    const behaviorRows = getBehaviorVisualRows();
    const userTurns = state.messages.filter((message) => message.type === "user");
    const turnSummary = userTurns.reduce(
      (summary, message) => {
        const tone = turnTone(analyzeText(message.text));
        if (tone === "risk") summary.risk += 1;
        if (tone === "helpful" || tone === "closure") summary.helpful += 1;
        return summary;
      },
      { helpful: 0, risk: 0 }
    );
    const closurePresent = (state.markers.nextSteps || 0) > 0;

    return `
      <div class="panel-section report-visual-section">
        <div class="section-title compact-title">
          <div>
            <div class="eyebrow">Visual feedback</div>
            <h2>Conversation readout</h2>
          </div>
        </div>
        <div class="visual-insights-grid">
          <div class="visual-card snapshot-card">
            <h2>At a glance</h2>
            <div class="snapshot-grid">
              <div class="snapshot-stat">
                <strong>${report.overall}</strong>
                <span>Overall</span>
              </div>
              <div class="snapshot-stat">
                <strong>${turnSummary.helpful}/${Math.max(1, userTurns.length)}</strong>
                <span>Helpful turns</span>
              </div>
              <div class="snapshot-stat ${turnSummary.risk ? "attention" : ""}">
                <strong>${turnSummary.risk}</strong>
                <span>Risk turns</span>
              </div>
              <div class="snapshot-stat ${closurePresent ? "" : "attention"}">
                <strong>${closurePresent ? "Yes" : "No"}</strong>
                <span>Closure</span>
              </div>
            </div>
          </div>
          <div class="visual-card behavior-card">
            <h2>Behavior mix</h2>
            ${renderBehaviorMix(behaviorRows)}
          </div>
          <div class="visual-card skill-profile">
            <h2>Skill profile</h2>
            <div class="score-tile-grid">
              ${scores.map((score) => `
                <div class="score-tile">
                  <div class="score-ring ${scoreColor(score.value)}" style="--value:${clamp(score.value, 0, 100)}%">
                    <span>${score.value}</span>
                  </div>
                  <div>
                    <strong>${escapeHtml(score.label)}</strong>
                    <span>${scoreLabel(score.value)}</span>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
        ${renderConversationTimeline()}
      </div>
    `;
  }

  function renderBehaviorMix(rows) {
    const activeRows = rows.filter((row) => row.count > 0);
    return `
      <div class="mix-track ${activeRows.length ? "" : "empty"}">
        ${activeRows.length
          ? activeRows.map((row) => `<span class="${row.kind}" style="--amount:${row.count}" title="${escapeHtml(`${row.label}: ${row.count}`)}"></span>`).join("")
          : `<span></span>`}
      </div>
      <div class="behavior-rows">
        ${rows.map((row) => `
          <div class="behavior-row">
            <div>
              <strong>${escapeHtml(row.label)}</strong>
              <span>${escapeHtml(row.note)}</span>
            </div>
            <div class="behavior-meter">
              <span>${row.count}</span>
              <div class="bar ${row.kind}" style="--value:${row.value}%"><i></i></div>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  function renderConversationTimeline() {
    const userTurns = state.messages.filter((message) => message.type === "user");
    if (!userTurns.length) {
      return `
        <div class="visual-card timeline-card">
          <h2>Conversation timeline</h2>
          <p class="muted-note">No learner turns were captured yet.</p>
        </div>
      `;
    }

    return `
      <div class="visual-card timeline-card">
        <h2>Conversation timeline</h2>
        <div class="conversation-timeline">
          ${userTurns.map((message, index) => {
            const flags = analyzeText(message.text);
            const tone = turnTone(flags);
            const labels = signalLabels(flags);
            return `
              <article class="timeline-turn ${tone}">
                <div class="turn-marker"><span>${index + 1}</span></div>
                <div class="turn-body">
                  <div class="turn-meta">
                    <strong>${turnToneLabel(tone)}</strong>
                    <span>${formatMessageTime(message.time)}</span>
                  </div>
                  <p>${escapeHtml(truncateText(message.text))}</p>
                  <div class="signal-tags">
                    ${labels.map((label) => `<span>${escapeHtml(label)}</span>`).join("")}
                  </div>
                </div>
              </article>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }

  function renderReport() {
    const report = state.report || buildReport(currentScenario(), state.messages, state.markers);
    return `
      <div class="panel-section">
        <div class="section-title">
          <div>
            <div class="eyebrow">Learner report</div>
            <h1>${escapeHtml(report.scenarioTitle)}</h1>
            <p>${escapeHtml(report.narrative)}</p>
          </div>
          <div class="button-row">
            <button class="primary" data-action="export-report">Download report</button>
            <button class="ghost" data-action="retry">Retry</button>
          </div>
        </div>
      </div>
      ${renderReportVisuals(report)}
      <div class="panel-section report-grid">
        <div>
          <div class="score-stack">
            ${reportScores(report).map((score) => `
              <div class="score-line">
                <strong>${escapeHtml(score.label)}</strong>
                <div class="bar ${scoreColor(score.value)}" style="--value:${score.value}%"><i></i></div>
                <span>${score.value}</span>
              </div>
            `).join("")}
          </div>
          <div class="two-column" style="margin-top: 18px;">
            <div class="info-box">
              <h2>Strengths</h2>
              <ul class="info-list">${report.strengths.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            </div>
            <div class="info-box">
              <h2>Missed opportunities</h2>
              <ul class="info-list">${report.misses.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            </div>
          </div>
          <div class="info-box" style="margin-top: 14px;">
            <h2>Transcript evidence</h2>
            <p class="quote">${escapeHtml(report.evidence.best)}</p>
            <p class="quote">${escapeHtml(report.evidence.closure)}</p>
            <p class="quote">${escapeHtml(report.evidence.risk)}</p>
          </div>
        </div>
        <div>
          <div class="score-card">
            <strong>${report.overall}</strong>
            <span>Overall formative score</span>
          </div>
          <div class="info-box" style="margin-top: 14px;">
            <h2>Reflection</h2>
            <div class="reflection-grid">
              ${report.prompts.map((prompt, index) => `
                <label>
                  <span>${escapeHtml(prompt)}</span>
                  <textarea data-reflection="prompt-${index}">${escapeHtml(state.reflections[`prompt-${index}`] || "")}</textarea>
                </label>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderFacilitator() {
    const themes = getThemeMetrics();
    const completion = Math.round((seedCohort.filter((row) => row.status === "Complete").length / seedCohort.length) * 100);
    return `
      <main class="workspace">
        <section class="page-panel">
          <div class="panel-section">
            <div class="section-title">
              <div>
                <div class="eyebrow">Facilitator dashboard</div>
                <h1>Fall pilot debrief view</h1>
                <p>Evidence is grouped around the decisions a facilitator needs before class: completion, pain points, examples, and debrief prompts.</p>
              </div>
              <button class="primary" data-action="export-facilitator">Download packet</button>
            </div>
          </div>
          <div class="panel-section metric-grid">
            <div class="metric-card"><strong>${completion}%</strong><span>Seed cohort completion</span></div>
            <div class="metric-card"><strong>${state.report ? state.report.overall : "--"}</strong><span>Current learner score</span></div>
            <div class="metric-card"><strong>${state.markers.turns}</strong><span>Current learner turns</span></div>
            <div class="metric-card"><strong>${state.wildcardUsed ? "Yes" : "No"}</strong><span>Wildcard used</span></div>
          </div>
          <div class="panel-section facilitator-grid">
            <div>
              <h2>Cohort status</h2>
              <div class="cohort-list">
                ${seedCohort.map((row) => `
                  <div class="cohort-row">
                    <div><strong>${escapeHtml(row.name)}</strong><span>${escapeHtml(row.module)}</span></div>
                    <span class="status-pill ${row.status === "Complete" ? "complete" : "ready"}">${escapeHtml(row.status)}</span>
                    <span>Inquiry ${row.inquiry}</span>
                    <span>Closure ${row.closure}</span>
                  </div>
                `).join("")}
              </div>
            </div>
            <aside>
              <h2>Cohort pain points</h2>
              <div class="theme-list">
                ${themes.map((theme) => `
                  <div class="theme">
                    <div><strong>${escapeHtml(theme.label)}</strong><span>${theme.value}% signal</span></div>
                    <div class="bar ${scoreColor(100 - theme.value)}" style="--value:${theme.value}%"><i></i></div>
                  </div>
                `).join("")}
              </div>
            </aside>
          </div>
          <div class="panel-section facilitator-grid">
            <div>
              <h2>Debrief questions</h2>
              <div class="debrief-list">
                ${currentScenario().debriefPrompts.map((prompt) => `<div class="info-box">${escapeHtml(prompt)}</div>`).join("")}
              </div>
            </div>
            <aside>
              <h2>Representative excerpt</h2>
              <div class="notice">
                <p>${escapeHtml(state.report ? state.report.evidence.best : "Complete a learner run to populate transcript evidence from the current session.")}</p>
              </div>
            </aside>
          </div>
        </section>
      </main>
    `;
  }

  function renderAuthor() {
    const scenario = currentScenario();
    return `
      <main class="workspace">
        <section class="page-panel">
          <div class="panel-section">
            <div class="eyebrow">Authoring studio</div>
            <h1>Scenario template</h1>
            <p>Structured fields keep the content grounded in learning objectives, agent behavior, rubrics, source notes, and facilitator debrief.</p>
          </div>
          <div class="panel-section author-grid">
            <form id="author-form">
              ${field("title", "Scenario title", scenario.title)}
              ${field("duration", "Estimated duration", scenario.duration)}
              ${field("audience", "Audience", scenario.audience)}
              ${textareaField("objective", "Learning objective", scenario.objective)}
              ${textareaField("learnerRole", "Learner role", scenario.learnerRole)}
              ${textareaField("brief", "Business context", scenario.brief)}
              ${textareaField("successCriteria", "Success criteria", scenario.successCriteria.join("\n"))}
              <div class="two-column">
                ${field("personaName", "AI persona name", scenario.persona.name)}
                ${field("personaRole", "AI persona role", scenario.persona.role)}
              </div>
              ${textareaField("culturalVariables", "Cultural variables", scenario.persona.context)}
              ${textareaField("posture", "Persona posture", scenario.persona.posture)}
              ${textareaField("hidden", "Hidden constraints", scenario.persona.hidden)}
              ${textareaField("opening", "Opening message", scenario.persona.opening)}
              <div class="two-column">
                ${field("wildcardTitle", "Wildcard title", scenario.wildcard.title)}
                ${textareaField("wildcardText", "Wildcard event", scenario.wildcard.text)}
              </div>
              ${textareaField("rubric", "Rubric markers", scenario.rubric.join("\n"))}
              ${textareaField("debriefPrompts", "Debrief prompts", scenario.debriefPrompts.join("\n"))}
              <div class="button-row">
                <button class="primary" type="submit">Save draft</button>
                <button class="ghost" type="button" data-action="preview-current">Preview selected</button>
              </div>
            </form>
            <aside class="draft-preview">
              <div class="eyebrow">Review checklist</div>
              <h2>Before pilot use</h2>
              <div class="checklist">
                <label><input type="checkbox" checked /> Cultural behavior is framed as context-dependent.</label>
                <label><input type="checkbox" checked /> Feedback maps to observable transcript evidence.</label>
                <label><input type="checkbox" /> Faculty source notes and permissions are recorded.</label>
                <label><input type="checkbox" /> Bias and stereotype review is complete.</label>
              </div>
              <div class="notice" style="margin-top: 16px;">
                <strong>Current source basis</strong>
                <p>PRD, master handoff, Mike Grasso prototype, and Thunderbird cross-cultural leadership direction.</p>
              </div>
            </aside>
          </div>
        </section>
      </main>
    `;
  }

  function field(name, label, value) {
    return `
      <div class="field">
        <label for="${name}">${label}</label>
        <input id="${name}" name="${name}" value="${escapeHtml(value || "")}" />
      </div>
    `;
  }

  function textareaField(name, label, value) {
    return `
      <div class="field">
        <label for="${name}">${label}</label>
        <textarea id="${name}" name="${name}">${escapeHtml(value || "")}</textarea>
      </div>
    `;
  }

  function renderGovernance() {
    const items = [
      ["AI limitation notice", "Every scenario starts with formative-use language and avoids high-stakes grading claims."],
      ["Data minimization", "The simulation warns against entering confidential, regulated, or personally sensitive details."],
      ["Role separation", "Learner reports, facilitator aggregates, authoring templates, and governance controls are separated by view."],
      ["Prototype engine", "This local build uses deterministic scenario logic. A pilot-ready version should connect a reviewed AI model to Thunderbird-approved prompts, source notes, and rubrics."],
      ["Retention assumption", "This standalone build stores demo state only on this device. A pilot deployment should move records to approved platform storage."],
      ["Cultural safety", "Personas use communication tendencies and uncertainty language instead of deterministic national stereotypes."],
      ["Export controls", "Reports and facilitator packets export as markdown so reviewers can inspect content before sharing."]
    ];
    return `
      <main class="workspace">
        <section class="page-panel">
          <div class="panel-section">
            <div class="section-title">
              <div>
                <div class="eyebrow">Responsible AI and pilot controls</div>
                <h1>Governance checklist</h1>
                <p>These are the minimum controls the PRD requires before live student or executive-ed use.</p>
              </div>
              <button class="danger" data-action="clear-demo">Clear demo data</button>
            </div>
          </div>
          <div class="panel-section admin-grid">
            ${items.map(([title, text]) => `
              <div class="governance-item">
                <strong>${escapeHtml(title)}</strong>
                <span>${escapeHtml(text)}</span>
              </div>
            `).join("")}
          </div>
          <div class="panel-section">
            <h2>Safety review queue</h2>
            <div class="governance-list">
              <div class="governance-item"><strong>Open question</strong><span>Confirm ASU/Thunderbird retention rules before collecting real transcripts.</span></div>
              <div class="governance-item"><strong>Open question</strong><span>Identify faculty reviewers for cultural nuance and bias checks.</span></div>
              <div class="governance-item"><strong>Open question</strong><span>Decide whether pilot dashboards show names, pseudonyms, or anonymized IDs.</span></div>
            </div>
          </div>
        </section>
      </main>
    `;
  }

  function bindEvents() {
    document.querySelectorAll("[data-view]").forEach((button) => {
      button.addEventListener("click", () => setView(button.dataset.view));
    });
    document.querySelectorAll("[data-scenario]").forEach((button) => {
      button.addEventListener("click", () => selectScenario(button.dataset.scenario));
    });
    document.querySelectorAll("[data-prework]").forEach((group) => {
      group.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", () => updatePrework(group.dataset.prework, button.dataset.value));
      });
    });

    const goal = document.getElementById("practice-goal");
    if (goal) {
      goal.addEventListener("change", (event) => updatePrework("goal", event.target.value));
    }

    document.querySelectorAll("[data-action]").forEach((button) => {
      button.addEventListener("click", () => handleAction(button.dataset.action));
    });

    document.querySelectorAll("[data-draft]").forEach((button) => {
      button.addEventListener("click", () => {
        const input = document.getElementById("learner-message");
        if (input) {
          input.value = button.dataset.draft;
          input.focus();
        }
      });
    });

    const input = document.getElementById("learner-message");
    if (input) {
      input.addEventListener("keydown", (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key === "Enter") sendMessage();
      });
    }

    document.querySelectorAll("[data-reflection]").forEach((field) => {
      field.addEventListener("input", (event) => updateReflection(field.dataset.reflection, event.target.value));
    });

    const authorForm = document.getElementById("author-form");
    if (authorForm) {
      authorForm.addEventListener("submit", saveDraftScenario);
    }
  }

  function handleAction(action) {
    if (action === "start") startScenario();
    if (action === "send") sendMessage();
    if (action === "toggle-speech") toggleSpeech();
    if (action === "toggle-theme") toggleTheme();
    if (action === "finish") finishScenario();
    if (action === "wildcard") injectWildcard();
    if (action === "retry") resetSession();
    if (action === "export-report") exportReport();
    if (action === "export-facilitator") exportFacilitatorPacket();
    if (action === "preview-current") {
      state.view = "learner";
      state.phase = "brief";
      persist();
      render();
    }
    if (action === "clear-demo") {
      localStorage.removeItem(storageKey);
      window.location.reload();
    }
  }

  function toggleTheme() {
    state.theme = state.theme === "dark" ? "light" : "dark";
    persist();
    render();
  }

  render();
  checkAiStatus();
})();

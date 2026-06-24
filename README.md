# GlobalSync MVP

This workspace contains a lightweight, text-first GlobalSync product build based on the Thunderbird PRD, the master handoff, and the uploaded Mike Grasso prototype.

For the stakeholder demo, run the local AI server and open `http://127.0.0.1:8765/index.html`.

```powershell
$env:OPENAI_API_KEY="your_api_key_here"
$env:AI_MODEL="gpt-5.5"
python globalsync_server.py
```

You can also copy `.env.example` to `.env`, put the API key there, and run `python globalsync_server.py`.

The app includes:

- Learner module queue, scenario brief, chat practice, live coaching markers, report, reflection, and markdown export.
- Browser speech-to-text in the practice room for speaking, reviewing, and then sending learner responses.
- Facilitator dashboard with completion, cohort themes, debrief prompts, representative evidence, and packet export.
- Authoring template for structured scenarios, personas, rubrics, wildcard events, and debrief prompts.
- Governance checklist for responsible AI, data minimization, cultural safety, and pilot open questions.

This version uses browser-local demo state and a local Python backend. When an OpenAI key is configured, scenario replies and learner reports use the OpenAI Responses API. When a Groq key such as `gsk_...` is configured with a model like `openai/gpt-oss-120b`, the backend routes to Groq's OpenAI-compatible chat API. If the key is missing or the API is unreachable, the app shows `Local fallback` and uses deterministic scenario logic so the demo still runs.

A production pilot should move sessions, reports, users, and audit logs into approved server-side storage and connect the persona engine to Thunderbird-approved source notes, safety rules, and rubric-based transcript analysis.

Speech-to-text uses the browser Web Speech API when available. Chrome and Edge usually support it; unsupported browsers fall back to typed responses.
If microphone permission is blocked from the `file://` page, serve the folder locally and open `http://127.0.0.1:8765/index.html`.

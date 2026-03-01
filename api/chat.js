const SYSTEM_PROMPT = `You are VBM Interior's friendly design assistant. VBM Interior is a premium interior design company based in India offering end-to-end interior design services including full home interiors, modular kitchens, wardrobes, TV units, study areas, and bathroom renovations.

You help visitors with:
- Interior design questions (styles, materials, budgets, timelines)
- VBM's services and process (consultation → design → production → installation → handover)
- Understanding pricing ranges (but never quote exact prices — direct them to book a free consultation)
- Design inspiration and trends

Be warm, knowledgeable, and concise. Use the visitor's name if they share it.

IMPORTANT RULES:
1. Keep responses under 150 words.
2. Never fabricate specific pricing — say "pricing depends on scope, let me connect you with our team for a free consultation."
3. When the user expresses ANY of these intents:
   - Wants to book a consultation or meeting
   - Asks for a quote or cost estimate
   - Wants to visit the showroom
   - Wants to hire VBM or start a project
   - Shares their budget and asks to proceed
   - Says things like "I'm interested", "let's do it", "how do I get started"
   ...you MUST append this exact JSON on a new line at the very end of your response:
   {"cta_trigger": true}
4. Do NOT include the JSON for casual browsing questions.`;

export default async function handler(req, res) {
  // ── CORS headers ──────────────────────────────────────────────────────
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ── Preflight ─────────────────────────────────────────────────────────
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ── Only POST allowed ─────────────────────────────────────────────────
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // ── API key check ─────────────────────────────────────────────────────
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "OPENAI_API_KEY is not configured" });
  }

  // ── Validate request body ─────────────────────────────────────────────
  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Request body must include a non-empty messages array" });
  }

  // ── Call OpenAI API ───────────────────────────────────────────────────
  try {
    const trimmedMessages = messages.slice(-20);

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_tokens: 512,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...trimmedMessages,
        ],
      }),
    });

    if (!openaiRes.ok) {
      const errBody = await openaiRes.text();
      console.error("OpenAI API error:", openaiRes.status, errBody);
      return res.status(502).json({ error: "Upstream API error", status: openaiRes.status });
    }

    const data = await openaiRes.json();
    const rawText = data.choices?.[0]?.message?.content || "";

    // ── Parse CTA trigger ─────────────────────────────────────────────
    const ctaRegex = /\s*\{"cta_trigger"\s*:\s*true\}\s*$/;
    const ctaTriggered = ctaRegex.test(rawText);
    const cleanReply = rawText.replace(ctaRegex, "").trim();

    return res.status(200).json({
      reply: cleanReply,
      cta_trigger: ctaTriggered,
    });
  } catch (err) {
    console.error("Chat handler error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

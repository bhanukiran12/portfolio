/**
 * Vercel Edge Function — proxies the browser to OpenRouter (OpenAI-compatible).
 *
 * Only the API key is read from the environment — it must never ship in client code.
 * Set OPENROUTER_API_KEY in the Vercel project (Settings -> Environment Variables) and
 * in a local `.env` when running `vercel dev`.
 *
 * Request:  POST /api/chat   { "messages": [{ "role": "user" | "assistant", "content": "..." }] }
 * Response: text/event-stream — OpenAI-style `data: {...}` chunks, terminated by `data: [DONE]`.
 */

export const config = { runtime: 'edge' }

declare const process: { env: Record<string, string | undefined> }

const ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions'
const MODEL = 'qwen/qwen3.7-flash'
const SITE_URL = 'https://bhanukiran.vercel.app'
const SITE_NAME = 'Bhanu Kiran Vemula — Portfolio'
const MAX_TURNS = 12
const MAX_CHARS = 4000

const SYSTEM_PROMPT = `You are the AI assistant on the portfolio site of Bhanu Kiran Vemula.

About Bhanu: full-stack engineer and Team Lead at NxtWave (EdTech). He takes on freelance
projects in:
- RAG systems and document Q&A (grounded answers, citations, hallucination guardrails)
- Conversational AI and chatbots (WhatsApp, web, Slack; human-in-the-loop dashboards)
- Workflow automation (n8n, Zapier, APIs, custom integrations)
He also brings the full-stack engineering (React, Node.js, Python, TypeScript) to ship these
to production.

Availability: currently open to 1-2 new freelance projects. Replies within 24-48 hours.
Remote, IST-aligned. Next steps for a client: book a call via the Calendly link on the page,
or send the contact form.

Your job: help prospective clients understand what Bhanu can build, judge whether it is a
fit, and move toward booking a call or sending the form.

Rules:
- Be concise, warm, and concrete. 2-4 short sentences unless asked for more detail.
- You may discuss approach, tech choices, and rough process. Do NOT quote specific prices
  or commit to timelines — those are agreed with Bhanu directly on a call.
- If you do not know something about Bhanu, say so plainly and point to the contact form or a call.
- Never invent projects, clients, metrics, or credentials.`

type Role = 'user' | 'assistant'
type Message = { role: Role; content: string }

function jsonResponse(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed.' }, 405)
  }

  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    return jsonResponse({ error: 'The chat service is not configured yet.' }, 500)
  }

  let payload: { messages?: unknown }
  try {
    payload = (await req.json()) as { messages?: unknown }
  } catch {
    return jsonResponse({ error: 'Invalid request body.' }, 400)
  }

  const raw = Array.isArray(payload.messages) ? (payload.messages as Message[]) : []
  const messages = raw
    .filter(
      (m): m is Message =>
        !!m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim().length > 0
    )
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }))

  if (messages.length === 0) {
    return jsonResponse({ error: 'Send a message to start.' }, 400)
  }

  let upstream: Response
  try {
    upstream = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': SITE_URL,
        'X-Title': SITE_NAME,
      },
      body: JSON.stringify({
        model: MODEL,
        stream: true,
        temperature: 0.4,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      }),
    })
  } catch {
    return jsonResponse({ error: 'Could not reach the AI service. Try again in a moment.' }, 502)
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => '')
    return jsonResponse(
      { error: 'The AI service returned an error.', detail: detail.slice(0, 400) },
      502
    )
  }

  return new Response(upstream.body, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
    },
  })
}

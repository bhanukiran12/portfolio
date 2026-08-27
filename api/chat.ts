/**
 * Vercel Edge Function — proxies the browser to OpenRouter (OpenAI-compatible)
 * and logs each conversation (with the visitor's IP / coarse location).
 *
 * Environment (Vercel → Settings → Environment Variables, and a local `.env` for `vercel dev`):
 *   OPENROUTER_API_KEY   (required)  sk-or-v1-...  — never ships to the client
 *   CHAT_LOG_WEBHOOK     (optional)  overrides LOG_WEBHOOK_DEFAULT below — any URL that
 *                                    accepts a JSON POST (Apps Script / Zapier / Discord …)
 *
 * Every conversation is also written to the Vercel Runtime Logs via console.log.
 *
 * Request:  POST /api/chat   { "messages": [{ "role", "content" }], "conversationId": "..." }
 * Response: text/event-stream — OpenAI-style `data: {...}` chunks, terminated by `data: [DONE]`.
 *
 * The webhook receives one POST per turn with { at, id, ip, location, ua, messages, reply };
 * `id` is stable for the whole conversation so the sink can upsert a single row.
 */

export const config = { runtime: 'edge' }

declare const process: { env: Record<string, string | undefined> }

const ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions'
const MODEL = 'qwen/qwen3.7-flash'
const SITE_URL = 'https://bhanukiran.vercel.app'
const SITE_NAME = 'Bhanu Kiran Vemula — Portfolio'
const MAX_TURNS = 12
const MAX_CHARS = 4000

// Google Apps Script web app that appends each conversation to a Sheet.
// Override per-environment with CHAT_LOG_WEBHOOK if needed.
const LOG_WEBHOOK_DEFAULT =
  'https://script.google.com/macros/s/AKfycbydBcmFgCFf8p8Fe_sqYLwgtJPNAaDGN4e9H89wVB4j1UOSfkvtwA7CR3jgP5DVg60kTg/exec'

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

/** Visitor IP + coarse geo, from the headers Vercel injects at the edge. */
function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

function clientInfo(req: Request): { ip: string; location: string; ua: string } {
  const h = req.headers
  const forwarded = (h.get('x-forwarded-for') ?? '').split(',')[0].trim()
  const ip = forwarded || h.get('x-real-ip') || h.get('cf-connecting-ip') || 'unknown'
  const location =
    [h.get('x-vercel-ip-city'), h.get('x-vercel-ip-country-region'), h.get('x-vercel-ip-country')]
      .filter((s): s is string => !!s)
      .map(safeDecode)
      .join(', ') || 'unknown'
  return { ip, location, ua: h.get('user-agent') ?? 'unknown' }
}

async function logConversation(record: {
  id: string
  ip: string
  location: string
  ua: string
  messages: Message[]
  reply: string
}): Promise<void> {
  const entry = { at: new Date().toISOString(), ...record }

  // Always: Vercel Runtime Logs (Deployments → project → Logs).
  console.log('[chat]', JSON.stringify(entry))

  const webhook = process.env.CHAT_LOG_WEBHOOK ?? LOG_WEBHOOK_DEFAULT
  if (!webhook) return
  try {
    await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    })
  } catch {
    /* logging must never break the chat */
  }
}

/**
 * Passes the upstream SSE bytes straight to the client while accumulating the
 * assistant's text. When the stream ends, `flush` logs the full conversation —
 * and because the Response isn't "done" until flush resolves, the function
 * stays alive long enough to send the log.
 */
function loggingPassThrough(
  info: { ip: string; location: string; ua: string },
  messages: Message[],
  id: string
): TransformStream<Uint8Array, Uint8Array> {
  const decoder = new TextDecoder()
  let buffer = ''
  let reply = ''

  return new TransformStream({
    transform(chunk, controller) {
      controller.enqueue(chunk)
      buffer += decoder.decode(chunk, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''
      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed.startsWith('data:')) continue
        const data = trimmed.slice(5).trim()
        if (data === '[DONE]') continue
        try {
          const parsed = JSON.parse(data) as { choices?: { delta?: { content?: string } }[] }
          const delta = parsed.choices?.[0]?.delta?.content
          if (delta) reply += delta
        } catch {
          /* ignore keep-alives / partial frames */
        }
      }
    },
    async flush() {
      await logConversation({ id, ...info, messages, reply })
    },
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

  let payload: { messages?: unknown; conversationId?: unknown }
  try {
    payload = (await req.json()) as { messages?: unknown; conversationId?: unknown }
  } catch {
    return jsonResponse({ error: 'Invalid request body.' }, 400)
  }

  const conversationId =
    typeof payload.conversationId === 'string' ? payload.conversationId.slice(0, 64) : ''

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

  const stream = upstream.body.pipeThrough(
    loggingPassThrough(clientInfo(req), messages, conversationId)
  )

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
    },
  })
}

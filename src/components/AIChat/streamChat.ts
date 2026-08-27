export type ChatRole = 'user' | 'assistant'
export interface ChatMessage {
  role: ChatRole
  content: string
}

/**
 * POSTs the conversation to the /api/chat Edge proxy and streams the assistant
 * reply back token-by-token via `onDelta`. Parses OpenAI-style SSE chunks.
 */
export async function streamChat(
  messages: ChatMessage[],
  onDelta: (text: string) => void,
  signal: AbortSignal
): Promise<void> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
    signal,
  })

  if (!res.ok || !res.body) {
    let message = 'The assistant is unavailable right now.'
    try {
      const data = (await res.json()) as { error?: string }
      if (data.error) message = data.error
    } catch {
      /* keep default */
    }
    throw new Error(message)
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  for (;;) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() ?? ''

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed.startsWith('data:')) continue

      const data = trimmed.slice(5).trim()
      if (data === '[DONE]') return

      try {
        const parsed = JSON.parse(data) as {
          choices?: { delta?: { content?: string } }[]
        }
        const delta = parsed.choices?.[0]?.delta?.content
        if (delta) onDelta(delta)
      } catch {
        /* ignore keep-alives and partial frames */
      }
    }
  }
}

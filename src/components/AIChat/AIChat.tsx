import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { contactConfig } from '../../config/contact'
import { streamChat, type ChatMessage } from './streamChat'
import Mascot from './Mascot'
import './AIChat.css'

const STORAGE_KEY = 'ai-chat-thread'
const CONV_KEY = 'ai-chat-id'

function newId(): string {
  try {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  } catch {
    /* fall through */
  }
  return `c_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`
}

function loadConvId(): string {
  try {
    const existing = sessionStorage.getItem(CONV_KEY)
    if (existing) return existing
    const fresh = newId()
    sessionStorage.setItem(CONV_KEY, fresh)
    return fresh
  } catch {
    return newId()
  }
}

const SUGGESTIONS = [
  'What can you build for me?',
  'Can you do a RAG bot over our docs?',
  'Are you available right now?',
  'How does a project usually start?',
]

const GREETING =
  "Hi — I'm Bhanu's assistant. Ask me about RAG systems, chatbots, automation, or how a project would work. I can also point you to a call."

function loadThread(): ChatMessage[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as ChatMessage[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveThread(messages: ChatMessage[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
  } catch {
    /* storage unavailable — non-fatal */
  }
}

function AIChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(loadThread)
  const [draft, setDraft] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [convId, setConvId] = useState(loadConvId)

  const abortRef = useRef<AbortController | null>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    saveThread(messages)
  }, [messages])

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, streaming])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => () => abortRef.current?.abort(), [])

  const send = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || streaming) return

    setError(null)
    setDraft('')

    const next: ChatMessage[] = [...messages, { role: 'user', content: trimmed }]
    setMessages([...next, { role: 'assistant', content: '' }])
    setStreaming(true)

    const controller = new AbortController()
    abortRef.current = controller

    try {
      await streamChat(
        next,
        convId,
        (delta) => {
          setMessages((current) => {
            const copy = current.slice()
            const last = copy[copy.length - 1]
            if (last && last.role === 'assistant') {
              copy[copy.length - 1] = { role: 'assistant', content: last.content + delta }
            }
            return copy
          })
        },
        controller.signal
      )
    } catch (err) {
      if ((err as Error).name === 'AbortError') return
      setMessages((current) => current.filter((m, i) => !(i === current.length - 1 && m.role === 'assistant' && m.content === '')))
      setError((err as Error).message || 'Something went wrong.')
    } finally {
      setStreaming(false)
      abortRef.current = null
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    void send(draft)
  }

  const onInputKeyDown = (e: ReactKeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void send(draft)
    }
  }

  const resetThread = () => {
    abortRef.current?.abort()
    setMessages([])
    setError(null)
    setStreaming(false)
    const fresh = newId()
    try {
      sessionStorage.setItem(CONV_KEY, fresh)
    } catch {
      /* non-fatal */
    }
    setConvId(fresh)
  }

  return (
    <div className={`ai-chat ${open ? 'ai-chat--open' : ''}`}>
      {open && (
        <section className="ai-panel glass" role="dialog" aria-label="Chat with Bhanu's AI assistant">
          <header className="ai-panel-head">
            <div className="ai-panel-id">
              <span className="ai-panel-dot" aria-hidden="true" />
              <div>
                <p className="ai-panel-title">Bhanu&apos;s AI assistant</p>
                <p className="ai-panel-sub">Services · fit · next steps</p>
              </div>
            </div>
            <div className="ai-panel-actions">
              {messages.length > 0 && (
                <button type="button" className="ai-icon-btn" onClick={resetThread} aria-label="Clear conversation">
                  Clear
                </button>
              )}
              <button type="button" className="ai-icon-btn" onClick={() => setOpen(false)} aria-label="Close chat">
                ✕
              </button>
            </div>
          </header>

          <div className="ai-messages" ref={scrollRef}>
            {messages.length === 0 && (
              <div className="ai-msg ai-msg--assistant">
                <p>{GREETING}</p>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`ai-msg ${m.role === 'user' ? 'ai-msg--user' : 'ai-msg--assistant'}`}
              >
                {m.content ? (
                  <p>{m.content}</p>
                ) : (
                  <p className="ai-typing" aria-label="Assistant is typing">
                    <span />
                    <span />
                    <span />
                  </p>
                )}
              </div>
            ))}

            {error && (
              <div className="ai-msg ai-msg--error" role="alert">
                <p>{error}</p>
                <p className="ai-error-fallback">
                  You can also{' '}
                  <a href={contactConfig.calendlyUrl} target="_blank" rel="noopener noreferrer">
                    book a call
                  </a>{' '}
                  or{' '}
                  <a href={`mailto:${contactConfig.email}`}>email directly</a>.
                </p>
              </div>
            )}
          </div>

          {messages.length === 0 && (
            <div className="ai-suggestions">
              {SUGGESTIONS.map((s) => (
                <button key={s} type="button" className="ai-suggestion" onClick={() => void send(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          <form className="ai-input-row" onSubmit={onSubmit}>
            <textarea
              ref={inputRef}
              className="ai-input"
              placeholder="Ask about a project…"
              rows={1}
              value={draft}
              maxLength={2000}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onInputKeyDown}
            />
            <button
              type="submit"
              className="ai-send"
              disabled={streaming || draft.trim().length === 0}
              aria-label="Send message"
            >
              {streaming ? '…' : '↑'}
            </button>
          </form>

          <p className="ai-disclaimer">
            AI answers can be imperfect — anything binding is confirmed with Bhanu directly.
            Messages may be stored so Bhanu can follow up.
          </p>
        </section>
      )}

      <Mascot open={open} onClick={() => setOpen((v) => !v)} />
    </div>
  )
}

export default AIChat

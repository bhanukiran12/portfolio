import { useEffect, useRef, useState } from 'react'
import './Mascot.css'

type MascotProps = {
  open: boolean
  onClick: () => void
}

const BUBBLE_TEXT = 'Chat with me for queries'

/**
 * Friendly assistant mascot that opens the chat. It idles in the bottom gutter,
 * drifts slowly left/right along the bottom edge (facing its direction of travel),
 * and returns home whenever the pointer is near or the chat is open. Fully static
 * under prefers-reduced-motion.
 */
function Mascot({ open, onClick }: MascotProps) {
  const [x, setX] = useState(0)
  const [facing, setFacing] = useState<1 | -1>(1)
  const [bubble, setBubble] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [reduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  const xRef = useRef(0)
  useEffect(() => {
    xRef.current = x
  }, [x])

  const hold = open || hovered

  // Roaming
  useEffect(() => {
    if (reduced || hold) {
      setX(0)
      setFacing(1)
      return
    }

    let timer = window.setTimeout(function step() {
      const max = Math.min(window.innerWidth * 0.4, 460)
      const target = Math.round(Math.random() * max)
      setFacing(target > xRef.current ? -1 : 1)
      setX(target)
      timer = window.setTimeout(step, 4200 + Math.random() * 2600)
    }, 3200)

    return () => window.clearTimeout(timer)
  }, [reduced, hold])

  // Keep the mascot on screen if the viewport narrows
  useEffect(() => {
    const onResize = () => setX((v) => Math.min(v, Math.min(window.innerWidth * 0.4, 460)))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Speech bubble cadence
  useEffect(() => {
    if (open) {
      setBubble(false)
      return
    }
    setBubble(true)
    const first = window.setTimeout(() => setBubble(false), 6000)
    const loop = window.setInterval(() => {
      setBubble(true)
      window.setTimeout(() => setBubble(false), 4500)
    }, 24000)
    return () => {
      window.clearTimeout(first)
      window.clearInterval(loop)
    }
  }, [open])

  if (open) return null

  return (
    <button
      type="button"
      className="mascot"
      style={{ transform: `translateX(${-x}px)` }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      aria-label="Chat with Bhanu's AI assistant"
    >
      <span
        className={`mascot-bubble ${bubble || hovered ? 'mascot-bubble--show' : ''}`}
        aria-hidden="true"
      >
        {BUBBLE_TEXT}
      </span>
      <span className="mascot-body" style={{ transform: `scaleX(${facing})` }}>
        <span className="mascot-bob">
          <MascotFace />
        </span>
      </span>
    </button>
  )
}

function MascotFace() {
  return (
    <svg viewBox="0 0 64 64" className="mascot-svg" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="mascotGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--accent)' }} />
          <stop offset="1" style={{ stopColor: 'var(--accent-2)' }} />
        </linearGradient>
      </defs>
      <line
        x1="32"
        y1="5"
        x2="32"
        y2="14"
        stroke="url(#mascotGrad)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="32" cy="5" r="3.4" fill="url(#mascotGrad)" />
      <rect x="11" y="13" width="42" height="37" rx="13" fill="url(#mascotGrad)" />
      <rect x="17" y="21" width="30" height="21" rx="9" fill="#fff" />
      <circle className="mascot-eye" cx="27" cy="31.5" r="3.1" fill="#14140f" />
      <circle className="mascot-eye" cx="37" cy="31.5" r="3.1" fill="#14140f" />
      <rect x="20" y="49" width="9" height="6" rx="3" fill="url(#mascotGrad)" />
      <rect x="35" y="49" width="9" height="6" rx="3" fill="url(#mascotGrad)" />
    </svg>
  )
}

export default Mascot

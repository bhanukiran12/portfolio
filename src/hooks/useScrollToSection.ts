import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

type ScrollState = {
  scrollTo?: string
}

/** Scroll to #section after client-side route changes (RR does not scroll hashes reliably). */
export function useScrollToSection() {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname !== '/') return

    const stateTarget = (location.state as ScrollState | null)?.scrollTo
    const hashTarget = location.hash ? location.hash.slice(1) : ''
    const targetId = stateTarget || hashTarget

    if (!targetId) return

    const scrollToTarget = () => {
      const el = document.getElementById(targetId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        window.history.replaceState(location.state, '', `/#${targetId}`)
      }
    }

    const timeoutId = window.setTimeout(scrollToTarget, 80)
    return () => window.clearTimeout(timeoutId)
  }, [location.pathname, location.hash, location.state, location.key])
}

import { Outlet } from 'react-router-dom'
import type { ReactNode } from 'react'
import Header from '../Header/Header'
import AIChat from '../AIChat/AIChat'
import CookieConsent from '../CookieConsent/CookieConsent'

function Layout({ children }: { children?: ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      {children ?? <Outlet />}
      <AIChat />
      <CookieConsent />
    </>
  )
}

export default Layout

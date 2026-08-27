import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import AIChat from '../AIChat/AIChat'

function Layout() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <Outlet />
      <AIChat />
    </>
  )
}

export default Layout

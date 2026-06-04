import { Outlet } from 'react-router-dom'
import CosmicBackground from '../CosmicBackground/CosmicBackground'
import Header from '../Header/Header'

function Layout() {
  return (
    <>
      <CosmicBackground />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <Outlet />
    </>
  )
}

export default Layout

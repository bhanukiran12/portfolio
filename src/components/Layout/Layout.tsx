import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'

function Layout() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <Outlet />
    </>
  )
}

export default Layout

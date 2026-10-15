import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import WorkWithMePage from './components/WorkWithMe/WorkWithMePage'
import LegalPage from './components/Legal/LegalPage'
import NotFoundPage from './components/NotFound/NotFoundPage'
import ServicePage from './components/Services/ServicePage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/work-with-me" element={<WorkWithMePage />} />
        <Route path="/web-experiences" element={<ServicePage />} />
        <Route path="/custom-software" element={<ServicePage />} />
        <Route path="/ai-automation" element={<ServicePage />} />
        <Route path="/privacy" element={<LegalPage type="privacy" />} />
        <Route path="/terms" element={<LegalPage type="terms" />} />
      </Route>
      <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
    </Routes>
  )
}

export default App

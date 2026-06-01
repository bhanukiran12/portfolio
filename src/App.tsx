import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import WorkWithMePage from './components/WorkWithMe/WorkWithMePage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/work-with-me" element={<WorkWithMePage />} />
      </Route>
    </Routes>
  )
}

export default App

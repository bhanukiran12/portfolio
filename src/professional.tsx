import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ProfessionalPortfolio from './professional/ProfessionalPortfolio'
import './professional/ProfessionalPortfolio.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProfessionalPortfolio />
  </StrictMode>,
)

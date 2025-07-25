import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import RedactorAI from './RedactorAI'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RedactorAI />
  </StrictMode>,
)

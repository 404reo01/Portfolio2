import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Liens from './components/Liens.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Liens />
  </StrictMode>,
)

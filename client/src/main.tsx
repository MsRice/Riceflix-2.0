import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './assets/style/index.css'
import App from './App.tsx'
import LanguageProvider from './contexts/lang/LanguageProvider.tsx'
import MovieProvider from './contexts/movie/MovieProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <MovieProvider>
        <Router>
          <App />
        </Router>
      </MovieProvider>
    </LanguageProvider>
  </StrictMode>
)

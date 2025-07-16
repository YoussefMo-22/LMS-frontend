import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import App from './App.tsx'
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

function reportWebVitals(onPerfEntry?: (metric: any) => void) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry);
    onFCP(onPerfEntry);
    onINP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

reportWebVitals(console.log);

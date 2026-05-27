import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

console.log(
  "%c su6osec ", 
  "font-weight: bold; font-size: 50px;color: #6ee7ff; text-shadow: 3px 3px 0 rgb(124,58,237)"
);
console.log(
  "%c\nAh, inspecting the DOM are we? 🕵️‍♂️\nIf you're looking for vulnerabilities, you won't find them here.\nBut if you're looking for an Offensive Security Engineer, you're in the right place.\n\nDrop me a line: deepanshu.infosec@gmail.com\n", 
  "color: #b5b5b5; font-size: 14px; font-family: monospace;"
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

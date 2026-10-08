import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './styles/fonts.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/sections.css';

import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

/* Apply the stored theme before first paint to avoid a flash. */
(function preboot() {
  let stored = null;
  try {
    stored = localStorage.getItem('su6osec:theme');
  } catch {
    /* storage blocked */
  }
  const prefersLight =
    stored === 'light' ||
    (!stored && window.matchMedia('(prefers-color-scheme: light)').matches);
  document.documentElement.setAttribute('data-theme', prefersLight ? 'light' : 'dark');
})();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);

/* Developer-facing easter egg. */
console.log(
  '%c su6osec ',
  'font-weight:bold;font-size:44px;color:#4ff0b4;text-shadow:3px 3px 0 #8a7bff;padding:4px 8px;border:1px solid rgba(255,255,255,.2)'
);
console.log(
  '%c\nInspecting the DOM? Good instinct.\nLooking for vulnerabilities: there are none here — this is a static site with no user input.\nLooking for an Offensive Security Engineer: you are in the right place.\n\n→ deepanshu.infosec@gmail.com\n',
  'color:#9ba3af;font-size:13px;font-family:monospace;line-height:1.6'
);

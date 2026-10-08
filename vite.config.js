// Explicit: ESLint gives config files `globals.browser`, so bare `process`
// would trip `no-undef`. Importing it keeps the lint contract honest instead
// of widening the config's globals.
import process from 'node:process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Browser support contract. `baseline-widely-available` is the Browserslist
    // alias for "every browser that has been broadly available for ~30 months"
    // (Chrome/Edge 111+, Firefox 113+, Safari 16.4+). It is also Vite's default,
    // but stating it here keeps the support floor visible and pinned — if a Vite
    // major ever raises it, this line is what we'd notice in review.
    target: 'baseline-widely-available',
  },
  preview: {
    port: 4173,
    strictPort: true,
    // Vite refuses unknown Host headers by default (DNS-rebinding defence), so
    // a plain `npm run preview` serves localhost only. Opening the build from
    // another device — a phone on the LAN, or through a `localhost.run` tunnel
    // — sends a different Host, which returns 403. Pass extra names explicitly
    // rather than setting `allowedHosts: true`, which would drop the guard:
    //   VITE_PREVIEW_HOSTS=abc123.lhr.life npm run preview
    allowedHosts: ['localhost', ...(process.env.VITE_PREVIEW_HOSTS?.split(',') ?? [])],
  },
})

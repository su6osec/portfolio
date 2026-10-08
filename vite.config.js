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
    // Vite refuses unknown Host headers by default (DNS-rebinding defence).
    // Two cases it never blocks: `localhost`/`*.localhost`, and any raw IP
    // literal — so a phone reaching this box over the LAN by IP is never a
    // Host problem (a phone that can't connect at all is the macOS firewall).
    // What it *does* block is a hostname, which is what a `localhost.run`
    // tunnel presents. Allow those explicitly rather than setting
    // `allowedHosts: true`, which drops the guard entirely. A leading dot
    // matches every subdomain — useful because the tunnel mints a fresh random
    // hostname each time it reconnects, so allow the domain, not one host:
    //   VITE_PREVIEW_HOSTS=.lhr.life npm run preview
    allowedHosts: ['localhost', ...(process.env.VITE_PREVIEW_HOSTS?.split(',') ?? [])],
  },
})

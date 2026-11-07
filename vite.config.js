import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      // Multi-page : le portfolio (/), la page de liens du QR code (/liens/)
      // et la page 404 (servie par Netlify pour toute URL inconnue)
      input: {
        main:     fileURLToPath(new URL('./index.html', import.meta.url)),
        liens:    fileURLToPath(new URL('./liens/index.html', import.meta.url)),
        notFound: fileURLToPath(new URL('./404.html', import.meta.url)),
      },
    },
  },
})

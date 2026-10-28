import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        business: resolve(import.meta.dirname, 'index.html'),
        professional: resolve(import.meta.dirname, 'professional.html'),
      },
    },
  },
})

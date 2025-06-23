import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ['5be1-223-184-231-13.ngrok-free.app', 'all'], // Allow specific host or all
  },
  plugins: [react()],
})

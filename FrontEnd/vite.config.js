import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,         // Isse Vite network par expose ho jata hai (Docker ke liye lazmi hai)
    port: 5173,         // Wahi port jo humne Dockerfile mein di hai
    watch: {
      usePolling: true, // Windows/Docker compatibility ke liye zaruri hai taake code changes detect hon
    },
  },
})
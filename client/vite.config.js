import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";


export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: true,
proxy: {
      // 1. Proxy API requests
      '/user': {
        target: 'http://backend:8000',
        changeOrigin: true,
      },
      '/article': {
        target: 'http://backend:8000',
        changeOrigin: true,
      },
      '/like': { // Don't forget the 'like' router!
        target: 'http://backend:8000',
        changeOrigin: true,
      },
      
      // 2. 👇 PROXY THE IMAGES FOLDER 👇
      '/app/images': {
        target: 'http://backend:8000',
        changeOrigin: true,
      }
    }
  }
})
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
   test: {
    globals: true,         
    environment: "jsdom",   
    setupFiles: "./src/__tests__/setup.ts", 
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
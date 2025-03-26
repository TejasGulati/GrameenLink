import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/GrameenLink/",
  build: {
    // Ensure assets are correctly referenced
    assetsDir: './',
    rollupOptions: {
      output: {
        // Use assetFileNames to control asset naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          return `assets/[name]-[hash].${info[1]}`;
        }
      }
    }
  }
})
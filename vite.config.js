import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  
  // Explicitly set the base path
  base: process.env.VITE_BASE_TYPE || '/GrameenLink/',
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    
    rollupOptions: {
      output: {
        // Ensure consistent asset naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          return `assets/[name]-[hash].${info[1]}`;
        },
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
      }
    }
  }
})
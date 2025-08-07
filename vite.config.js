import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Para deploy na raiz do domínio
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
})
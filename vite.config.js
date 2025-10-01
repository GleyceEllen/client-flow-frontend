import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  test: {
    globals: true,          // para usar `describe`, `it`, `expect` sem importar
    environment: 'jsdom',   // simula browser
    setupFiles: [],          // se precisar de setup extra, adicionar arquivos aqui
    include: ['src/**/*.test.{js,jsx}'], 
  },
});

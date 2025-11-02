import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true, // permite acceso desde WSL o red local
    watch: {
      usePolling: true, // fuerza HMR en Windows/WSL
    },
  },
});

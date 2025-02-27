import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost', // Specify the correct WebSocket protocol and host
      port: 5173,
    },
  },
});

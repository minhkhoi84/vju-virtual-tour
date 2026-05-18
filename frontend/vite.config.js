import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [
    react(),
    basicSsl() 
  ],
  server: {
    host: true, // Mở cổng mạng LAN để điện thoại/kính VR kết nối vào được
    port: 3000, 
  },
  preview: {
    host: true,
    port: 3000,
  }
});
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5173,
    strictPort: true, // 포트 변경 없이 5173 고정
    host: true, // 교실 내 다른 기기(스마트폰/태블릿)에서도 접속 가능
  },
});

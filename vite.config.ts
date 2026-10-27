import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import {fileURLToPath, URL} from 'node:url';
import {defineConfig} from 'vite';

export default defineConfig({
  plugins: [
    laravel({input: ['src/main.tsx'], refresh: true}),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {'@': fileURLToPath(new URL('.', import.meta.url))},
  },
});

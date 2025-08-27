import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [sveltekit(), tailwindcss()],

  build: {
    target: 'esnext',
    outDir: 'build',
  },

  // Optimizations
  optimizeDeps: {
    include: ['firebase/app', 'firebase/auth', 'firebase/firestore', 'marked', 'dompurify'],
  },
});
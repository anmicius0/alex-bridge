import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';

  return {
    plugins: [sveltekit(), tailwindcss()],

    // Build optimization
    build: {
      target: 'esnext',
      outDir: 'build',
      assetsDir: 'assets',
      emptyOutDir: true,
      sourcemap: !isDevelopment,
      minify: !isDevelopment,
      cssMinify: !isDevelopment,
      rollupOptions: {},
    },

    // Optimizations
    optimizeDeps: {
      include: ['firebase/app', 'firebase/auth', 'firebase/firestore', 'marked', 'dompurify'],
      exclude: [],
    },
  };
});

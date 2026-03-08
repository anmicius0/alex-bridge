import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/static';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  output: 'static',
  adapter: vercel({}),
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@components': fileURLToPath(
          new URL('./src/components', import.meta.url)
        ),
        '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
        '@lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
        '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
        '@content': fileURLToPath(new URL('./src/content', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        '@types': fileURLToPath(new URL('./src/types', import.meta.url)),
        '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      },
    },
  },
});

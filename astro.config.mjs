import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/static';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  adapter: vercel({}),
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['9d82172505c7.ngrok-free.app'],
    },
  },
});

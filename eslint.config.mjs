import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // 1. Base configurations for JS, TS, and Astro
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs['flat/recommended'],

  // 2. Global settings for the entire project
  {
    languageOptions: {
      globals: {
        ...globals.browser, // for client-side scripts
        ...globals.node, // for server-side code (build, middleware)
      },
    },
  },

  // 3. Global ignores
  {
    ignores: [
      'dist/',
      '.astro/',
      'public/admin/', // Ignore the CMS config and related files
      'node_modules/',
    ],
  }
);

// eslint.config.js
import { FlatCompat } from '@eslint/eslintrc';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import ts from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  resolvePluginsRelativeTo: __dirname,
});

export default ts.config(
  // 1. Global ignores from .gitignore
  includeIgnoreFile(gitignorePath),

  // 2. Base configs - order matters
  js.configs.recommended,
  ...ts.configs.recommendedTypeChecked,
  ...svelte.configs['flat/recommended'],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...compat.extends('airbnb-base'),

  // 3. Global settings and rules
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        project: true, // Use 'project: true' instead of projectService
        tsconfigRootDir: __dirname,
        extraFileExtensions: ['.svelte'],
      },
    },
    settings: {
      'import/resolver': {
        typescript: {},
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.svelte'],
        },
      },
    },
    rules: {
      'no-undef': 'off', // Covered by TypeScript
      'no-unused-vars': 'off', // Covered by @typescript-eslint/no-unused-vars
      'import/extensions': [
        'error',
        'ignorePackages',
        { js: 'never', jsx: 'never', ts: 'never', tsx: 'never', svelte: 'never' },
      ],
      'svelte/no-at-html-tags': 'off',
    },
  },

  // 4. Svelte-specific overrides to specify the TS parser for Svelte files
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
      },
    },
  },

  // 5. Turn off type-aware rules for JS config files (IMPORTANT)
  {
    files: ['**/*.js', '**/*.cjs'],
    ...ts.configs.disableTypeChecked,
  },

  // 6. Ignore auto-generated files and build artifacts
  {
    ignores: ['.svelte-kit/', 'build/', 'package/', 'dist/'],
  },

  // 7. Prettier config must be last to override other formatting rules
  prettier,
);

// tailwind.config.js
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  // The `content` property is automatically configured by the @tailwindcss/vite plugin.
  plugins: [typography, forms],
  theme: {
    extend: {
      // Configure the typography plugin to use the theme's CSS variables.
      typography: () => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--color-surface-800)',
            '--tw-prose-headings': 'var(--color-surface-950)',
            '--tw-prose-lead': 'var(--color-surface-700)',
            '--tw-prose-links': 'var(--color-primary-600)',
            '--tw-prose-bold': 'var(--color-surface-950)',
            '--tw-prose-counters': 'var(--color-surface-600)',
            '--tw-prose-bullets': 'var(--color-primary-300)',
            '--tw-prose-hr': 'var(--color-surface-200)',
            '--tw-prose-quotes': 'var(--color-surface-700)',
            '--tw-prose-quote-borders': 'var(--color-primary-300)',
            '--tw-prose-captions': 'var(--color-surface-500)',
            '--tw-prose-code': 'var(--color-primary-700)',
            '--tw-prose-pre-code': 'var(--color-primary-100)',
            '--tw-prose-pre-bg': 'var(--color-surface-800)',
            '--tw-prose-th-borders': 'var(--color-surface-300)',
            '--tw-prose-td-borders': 'var(--color-surface-200)',
            'h1, h2, h3, h4': {
              fontFamily: 'var(--font-family-serif)',
            },
            a: {
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              textDecorationColor: 'var(--color-primary-300)',
              transition: 'all 0.2s',
              '&:hover': {
                color: 'var(--color-primary-700)',
                textDecorationColor: 'var(--color-primary-500)',
                textUnderlineOffset: '2px',
                textDecorationThickness: '2px',
              },
            },
          },
        },
      }),
    },
  },
};

export const NAVIGATION = {
  main: [
    { href: '/#why', label: 'Warum' },
    { href: '/#about', label: 'Über' },
    { href: '/#reisen', label: 'Reisen' },
    { href: '/#news', label: 'News' },
  ],
  features: [
    { href: '/calendar/online', label: 'Kalender' },
    { href: '/news', label: 'News' },
    { href: '/holiday', label: 'Reisen' },
    { href: '/file', label: 'Dateien' },
    { href: '/quiz', label: 'Quiz' },
  ],
} as const;

export const SOCIAL_LINKS = {
  email: 'mailto:example@example.com',
} as const;

export const SITE = {
  title: 'Bridge mit Alexander',
  description:
    'Bridge lernen und spielen mit Alexander - Mehrfacher Deutscher Meister',
} as const;

export const CACHE = {
  STATIC: 31536000, // 1 year
  ASSETS: 86400, // 1 day
  API: 0, // no cache
} as const;

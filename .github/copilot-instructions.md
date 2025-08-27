# Alex Bridge - SvelteKit + Firebase Application

This is a German bridge club management application built with SvelteKit 5, Firebase, and Tailwind CSS v4. The app handles holidays/travel packages, file management, calendar integration, and user authentication.

## Architecture Overview

**Frontend**: SvelteKit 5 (using new `$props()` and `$state()` runes) with TypeScript
**Backend**: Firebase (Firestore + Auth + Storage) with dual client/server integration
**Styling**: Tailwind CSS v4 with custom design system using CSS variables
**Deployment**: Vercel with Node.js 22.x runtime

### Key Firebase Integration Pattern

The app uses separate Firebase instances for client and server operations:
- **Client-side**: `src/lib/client/firebase.client.ts` exports `auth`, `db` for browser operations
- **Server-side**: `src/lib/server/firebase.server.ts` exports `adminDB`, `adminAuth` for server operations
- **Important**: Server-side uses Firebase Admin SDK with service account, client-side uses regular SDK

## Data Models & Collections

Core types in `src/lib/types.ts`:
- `FirebaseFile`: Generic file representation with downloadURL, metadata
- `Holiday`: Travel packages with images, files, pricing  
- `FileDocument`: Document containers with multiple downloadable files

Firestore collections:
- `holiday`: Travel packages data
- `files`: Downloadable document collections
- `userMeta`: Extended user profile data beyond Firebase Auth

## SvelteKit Patterns

### Route Structure
- `+page.server.ts`: Server-side data loading using Firebase Admin SDK
- `+page.svelte`: Client-side pages with reactive state
- `+layout.svelte`: Global layout with auth state management and loading spinner

### Server Load Functions
Always use `adminDB` from server module for data fetching:
```typescript
export const load: PageServerLoad = async () => {
  const querySnapshot = await adminDB.collection('collectionName').get();
  // Transform and return data
};
```

### Authentication Flow
- Global auth state managed in `src/lib/stores/user.ts`
- Combines Firebase Auth with Firestore user metadata
- Auth store includes `firebaseUser`, `user` (metadata), `loading`, `error` states
- Loading spinner shown in layout during auth state resolution

## Component Architecture

### UI Components (`src/lib/components/ui/`)
- **Design System**: Uses Tailwind CSS v4 with semantic color variables
- **Button.svelte**: Standardized button with variant support
- **Menubar.svelte**: Main navigation with dropdowns and mobile support
- **Typography**: Uses `@tailwindcss/typography` plugin for content

### Section Components (`src/lib/components/section/`)
- **Reusable page sections**: Hero, PageHeader, FeaturesGrid
- **Consistent layout patterns** across different pages

## Development Workflow

### Environment Setup
- Uses Bun as package manager (`bun.lock` present)
- Environment variables: Public Firebase config in `PUBLIC_*`, private service account in `FIREBASE_SERVICE_ACCOUNT`

### Build & Development
```bash
bun install          # Install dependencies
bun run dev         # Start development server  
bun run build       # Production build
bun run preview     # Preview production build
```

### Code Quality
- **ESLint**: Modern flat config with TypeScript, Svelte support
- **Prettier**: Configured for Svelte formatting
- **TypeScript**: Strict configuration with SvelteKit integration

## Special Integrations

### Calendar System
- `src/routes/calendar/online/+page.server.ts`: Fetches Google Calendar iCal feeds
- Uses `node-ical` for server-side parsing, `svelte-fullcalendar` for display
- Events transformed to FullCalendar format with `extendedProps`

### File Management
- Firebase Storage integration for file uploads/downloads
- `FirebaseFile` type includes ref, downloadURL, metadata
- Both images and documents supported in Holiday and FileDocument entities

## Styling Conventions

### Tailwind CSS v4 Patterns
- **Design System**: Custom CSS variables for colors (`--color-primary-*`, `--color-surface-*`)
- **Typography**: Extensive prose customization in `tailwind.config.js`
- **Responsive**: Mobile-first approach with hamburger menu patterns
- **Gradients**: Uses `from-surface-50 via-primary-50/30 to-surface-100` for backgrounds

### Component Styling
- Consistent spacing with `container mx-auto max-w-6xl px-4`
- Loading states with custom spinner animations
- German language content (error messages, navigation)

## Key Files to Reference

- `src/lib/types.ts`: Core type definitions
- `src/lib/stores/user.ts`: Authentication state management  
- `src/routes/+layout.svelte`: Global layout and auth flow
- `svelte.config.js`: Vercel deployment with Node.js 22.x
- `vite.config.ts`: Build optimization and Firebase pre-bundling

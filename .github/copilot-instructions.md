# Copilot instructions for alex-bridge

Goal: give an AI agent the minimum, concrete facts to be productive in this SvelteKit 5 + Firebase app.

Architecture and runtime
- SvelteKit 5 + TypeScript. Server logic in `+page.server.ts`; UI in `+page.svelte` using Svelte 5 runes (`$props`, `$derived`, `$inspect`).
- Firebase split by environment:
  - Client SDK: `src/lib/client/firebase.client.ts` exports `auth`, `db` (uses `PUBLIC_FIREBASE_*` envs).
  - Admin SDK (server only): `src/lib/server/firebase.server.ts` exports `adminDB`, `adminAuth` (requires `FIREBASE_SERVICE_ACCOUNT` JSON).
- Tailwind CSS v4 via `@tailwindcss/vite`; theme uses CSS variables (see `tailwind.config.js`).
- Deployed on Vercel with Node.js 22 (see `svelte.config.js` adapter `nodejs22.x`).

Core patterns with in-repo examples
- Server data loads: query Firestore via `adminDB` in `+page.server.ts` and serialize Firestore Timestamps to ISO strings.
  - Example list: `src/routes/holidays/+page.server.ts` maps `startDate.toDate().toISOString()`.
  - Example detail + actions: `src/routes/holidays/[id]/+page.server.ts` defines `load` and `actions` (`register`, `cancel`) with `adminAuth.verifyIdToken` and writes to collections.
- Client pages read `PageData` from server and render with components.
  - Example: `src/routes/files/+page.svelte` iterates `data.fileDocuments` and uses `DownloadLink`.
- Auth store merges Firebase Auth with Firestore user metadata: `src/lib/stores/user.ts` maintains `{ firebaseUser, user, loading, error }` from `COLLECTIONS.USER_META`.
- Shared types: `src/lib/types.ts` (`FirebaseFile`, `Holiday`, `FileDocument`). Use them in loads and components.
- Centralized collection names: `src/lib/constants.ts` (`COLLECTIONS.HOLIDAYS`, `FILES`, `USER_META`, `HOLIDAY_REGISTRATIONS`). Avoid magic strings.
- Calendar ingestion: server-only iCal fetch/parsing via `node-ical` in `src/routes/calendar/online/+page.server.ts`, then map to FullCalendar event shape.

Dev workflows (use your package manager; `bun.lock` is present)
- Install: `bun install` or `npm install`.
- Dev server: `bun run dev` or `npm run dev` (Vite).
- Build: `bun run build` or `npm run build` (outputs to `build/`).
- Preview: `bun run preview` or `npm run preview`.

Conventions and gotchas
- Use admin SDK only in server files (`+page.server.ts`, endpoints). Never import admin modules in browser code.
- Serialize Firestore `Timestamp` fields before returning from server loads to avoid non-serializable values.
- `FIREBASE_SERVICE_ACCOUNT` must be a JSON string (service account) available on the server; client uses `PUBLIC_FIREBASE_*` envs.
- Tailwind v4 content scanning is handled by the Vite plugin; keep styles in `src/app.css` and components.
- UI components live in `src/lib/components/ui/`; section/marketing pieces in `src/lib/components/section/`.

Handy file references
- Firebase: `src/lib/client/firebase.client.ts`, `src/lib/server/firebase.server.ts`
- Types/constants: `src/lib/types.ts`, `src/lib/constants.ts`
- Auth store: `src/lib/stores/user.ts`
- Routes: `src/routes/holidays/+page.server.ts`, `src/routes/holidays/[id]/+page.server.ts`, `src/routes/files/+page.server.ts`
- Calendar: `src/routes/calendar/online/+page.server.ts`

If anything here is unclear (e.g., env setup, where to place server code, data flow examples), tell me which area to expand and I’ll add concrete snippets and references.

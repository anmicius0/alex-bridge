# Developer and Design Guidelines

This document serves as a guide for AI agents and developers working on this codebase. It outlines the design constraints, technical stack, and development conventions to maintain consistency across the project.

---

## 1. Design & Visual Guidelines

### Color Palette (Strict Palette)

The color scheme is defined in the `@theme` block within `src/styles/global.css` and must be adhered to strictly:

- **Background (Primary):** `#fcfbfa` (neutral soft alabaster white)
- **Primary Accent (Secondary):** `#f38020` (warm signature orange)
- **Golden Accent (Accent):** `#faae40` (warm amber/apricot yellow)
- **Warm Clay Wash (Info):** `#fdf6ec` (very light amber wash for structural headers and highlight backgrounds)
- **Highlight Action (Highlight):** `#f38020` (primary active action color)
- **Surface (Surface):** `#ffffff` (pure white for elevated surfaces and card containers)
- **Typography Main (Text Main):** `#404041` (refined deep charcoal for softer, high-contrast, professional readability)

### UI Constraints

- **Light Mode Only:** The application does not support dark mode. Do not implement dark-mode variants or media queries that invert colors unless specified.
- **No Glassmorphism:** Avoid blurry, semi-transparent overlays. Use solid, clean background surfaces.
- **Shadows & Radii:** Use soft, warm, slate-tinted shadows instead of harsh borders. Rounded corners remain generous (e.g., `--radius-lg: 20px`, `--radius-xl: 28px`).

### Typography

- **Headings & Branding:** All headings (`h1` through `h6`) and the logo text must use the local serif font **FCaslonTwelveITC** (`FCaslon 12 ITC`).
- **Fließtext / Body:** Use the default system sans-serif font stack for body paragraphs, buttons, forms, and secondary UI text.

---

## 2. Technical Stack & Architecture

- **Framework:** Astro (v5) configured with static output (`output: 'static'`) for optimal performance and SEO.
- **Styling:** Tailwind CSS (v4) using the `@tailwindcss/vite` plugin. Custom utility layers are declared in `src/styles/global.css`.
- **Component Strategy:**
  - Static UI structures and layouts should be authored as native `.astro` components.
  - Simple client-side interactivity should leverage standard Vanilla JS or custom Web Components (e.g., `<image-carousel>`, `<quiz-question>`).
  - Complex UI modules (such as FullCalendar) are implemented in React.
- **Calendar Fetching:** Calendar events are parsed from an external ICS feed via `node-ical` using the `PUBLIC_CALENDAR_ICS_URL` environment variable.

---

## 3. Content Collections & Routing

The codebase manages structured content via Astro's Content Layer (configured in `src/types/content.ts` and `src/content.config.ts`):

- **`blog`**: Chronological posts requiring a date and support for image lists.
- **`holiday`**: Travel seminars categorized automatically into upcoming and past events using `startDate` and `endDate` relative to the current time.
- **`quiz`**: Interactive questions containing multiple choices (`choices`) and an analysis text (`explanation`).
- **`file`**: Downloadable course materials and reference sheets linked with a list of file paths (`attachments`).

Individual detail pages are handled dynamically through `src/pages/[collection]/[slug].astro`.

---

## 4. Coding Conventions & Best Practices

### Error Handling

Avoid raw or unhandled try/catch blocks for data fetching and collection handling. Use the centralized `ErrorHandler` located in `src/lib/error-handler.ts`:

- Wrap critical collection loaders and network operations in `ErrorHandler.safeExecute` to avoid build failures.
- Log exceptions using `ErrorHandler.logError(error, context)` to maintain consistent telemetry.

### Client-side Scripts & Astro Lifecycle

Because the project uses Astro's Client Router (`<ClientRouter />`), standard page-load scripts must account for client-side navigation transitions:

- Ensure event listeners and DOM initializations are registered to lifecycle events such as `astro:page-load` (refer to the implementation pattern in `src/hooks/use-mobile-menu.ts`).

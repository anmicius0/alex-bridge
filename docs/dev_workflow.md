# Development and Workflow Guide

_This guide provides the technical steps for setting up, running, and maintaining the project._

The project stack includes **Astro**, **React** (for the Calendar component), **SASS**, and **Bun** as the package manager, with deployment managed by **Vercel**.

---

## 1. ⚙️ Local Setup

### Prerequisites

Ensure you have [Bun](https://bun.sh/) installed on your system.

### Installation

Clone the repository and install dependencies:

```bash
bun install
```

### Running the Project

The development environment requires two concurrent processes: the SASS watcher and the Astro dev server. The `dev` script handles this automatically.

```bash
bun run dev
```

> **Note:** The local server will be available at `http://localhost:4321`.

This command concurrently runs:

- `sass --watch src/styles:src/styles` — Compiles `.scss` files to `.css` on change.
- `astro dev` — Starts the Astro development server.

---

## 2. 📜 Available Scripts

All scripts are run from the project root using `bun run <script_name>`.

| Script     | Command                             | Purpose                                                         |
| :--------- | :---------------------------------- | :-------------------------------------------------------------- |
| `dev`      | `concurrently "..."`                | Starts the local development environment with SASS compilation. |
| `build`    | `bun run sass:build && astro build` | Compiles SASS, then creates a production build in `dist/`.      |
| `preview`  | `astro preview`                     | Serves the production build locally for testing.                |
| `format`   | `prettier --write .`                | Formats all code according to `.prettierrc`.                    |
| `lint`     | `eslint .`                          | Runs ESLint checks for code quality.                            |
| `lint:fix` | `eslint --fix .`                    | Runs ESLint and attempts to automatically fix issues.           |

---

## 3. 🎨 Styling Workflow (SASS & Tailwind)

This project uses a hybrid styling approach for maximum flexibility and maintainability.

1.  **SASS (Global System)**
    - Used for defining the core brutalist style system, theme variables, and complex component styles.
    - Key Files:
      - `src/styles/_variables.scss`: Central definition for all colors, shadows, and spacing.
      - `src/styles/global.scss`: Imports variables and defines global styles and CSS custom properties.

2.  **Tailwind CSS (Utility-First)**
    - Used directly within `.astro` components for layout, spacing, and responsive design.

> ⚠️ **Important:** When you make changes to `.scss` files, the `sass:watch` process (part of `bun run dev`) must be running to compile them into CSS that the browser can use. If your style changes don't appear, check that this process is running without errors.

---

## 4. 📝 Content Management (Decap CMS)

The site uses Decap CMS for content editing, configured via a single file.

- **Configuration File:** `public/admin/config.yml`
- **Local Access:** `http://localhost:4321/admin.html`
- **Media Handling:** Media uploads are managed through **Cloudinary**. The configuration in `config.yml` points to the specific Cloudinary cloud name and API key.

---

## 5. 🚀 Deployment & Environment

### Vercel Adapter

The project is configured to deploy to Vercel using `@astrojs/vercel`. The configuration is located in `astro.config.mjs`.

### Build Command

Vercel uses the `build` script from `package.json` for deployments:

```bash
bun run sass:build && astro build
```

### Environment Variables

The project requires minimal environment variables, which should be set in your Vercel project settings.

| Variable            | Scope  | Usage                                                     |
| :------------------ | :----- | :-------------------------------------------------------- |
| `PUBLIC_APP_ORIGIN` | Public | Used by `src/lib/api/cors.ts` to control allowed origins. |

### Security & Caching Headers

The `vercel.json` file configures crucial production headers:

- **Security:** Implements `X-Frame-Options`, HSTS (`Strict-Transport-Security`), and other security best practices.
- **Caching:** Sets aggressive cache policies for static assets (`_astro/` files are immutable) to ensure fast load times.

> ⚠️ **Caution:** If you migrate away from Vercel, these security and caching rules defined in `vercel.json` must be manually replicated on the new platform.

---

## 6. ⚡ Frontend Interactivity

### Calendar Component

- **Data Source:** The event schedule is fetched from a public Google Calendar ICS feed at build time on the `src/pages/calendar/online.astro` page.
- **Performance:** The page response is cached on Vercel's Edge Network for 10 minutes (`s-maxage=600`) to reduce external API calls and improve speed.
- **Implementation:** The calendar is a React component (`src/components/Calendar.tsx`) loaded with `client:load`.

### Custom Page Transitions

- **Implementation:** The site uses a custom, JavaScript-driven "sweep" transition for a unique brutalist feel, managed by an inline script in `src/layouts/Layout.astro`.
- **Interaction with Scrolling:** The transition script integrates with `src/lib/ui/smooth-scroll.ts` to ensure anchor links work correctly across page loads.

> ⚠️ **Avoid:** Do not enable Astro's native View Transitions (`<ViewTransitions />`) as it will conflict with the custom implementation.

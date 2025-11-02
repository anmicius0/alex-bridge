# Component and Page Architecture Guide

This guide defines the structure and responsibility of files within the `src/` directory to ensure maintainability, scalability, and adherence to the principle of Separation of Concerns (SoC).

## 1. Core Architectural Layers

The codebase is organized into three main layers based on responsibility:

| Layer                 | Directory                    | Primary Role                                                                                                 | Key Principles                                                                       |
| :-------------------- | :--------------------------- | :----------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| **Presentation**      | `src/components/`            | Responsible for all visual output and basic interactivity. Should be reusable and context-agnostic.          | **Pure Functions of Props.** Do not fetch data or contain complex business logic.    |
| **Orchestration**     | `src/pages/`, `src/layouts/` | Responsible for routing, data fetching (local & external), content assembly, and applying structural layout. | **High-Level Control.** Connects data from services/APIs to presentation components. |
| **Logic & Utilities** | `src/services/`, `src/lib/`  | Contains reusable business rules, complex calculations, and low-level platform/API helpers.                  | **No DOM Access.** Should be pure TypeScript/JavaScript code.                        |

---

## 2. Component Structure (`src/components/`)

Components are organized by scope and purpose:

### `src/components/ui/` (Atomic Presentation)

These components are purely presentational, reusable primitives (buttons, inputs, icons).

- **Rule:** Must not contain any data fetching logic (no `getCollection`, no external API calls).
- **Example:** `Button.astro`, `DateDisplay.astro`, `Input.astro`, `IconBox.astro`.

### `src/components/layout/` (Structural)

Components defining the overall page structure (header, footer, navigation).

- **Rule:** May contain logic necessary for navigation/state (e.g., checking if a path is active), but generally avoids complex data fetching.
- **Example:** `Header.astro`, `Footer.astro`.

### `src/components/content/` (Content Adapters)

Components designed specifically to consume data shapes from Astro Content Collections (`news`, `holiday`, `file`).

- **Rule:** These components accept data objects (like a `CollectionEntry` or derived object) via props and format them visually.
- **Example:** `Card.astro`, `ContentList.astro` (which orchestrates multiple cards).

### `src/components/home/` (Page-Specific Features)

Components used primarily on the homepage or dedicated feature sections.

- **Rule:** Similar to Content Adapters but often designed around a specific section's layout (e.g., a feature grid).
- **Example:** `Hero.astro`, `FeaturesGrid.astro`.

### `src/components/quiz/` (Feature-Specific Interactivity)

Components that combine presentation with isolated client-side interactivity (often using `is:inline` scripts).

- **Rule:** Logic must be self-contained and scope-isolated to that component instance (e.g., handling quiz answers).
- **Example:** `QuizQuestion.astro`.

---

## 3. Orchestration & Routing

### `src/pages/` (Routes)

Pages are the highest level of orchestration. Their primary responsibilities are:

1.  **Routing:** Defining the URL structure (e.g., `[slug].astro`).
2.  **Data Acquisition:** Fetching content (using `getCollection`) or external data (e.g., ICS file in `calendar/online.astro`).
3.  **Assembly:** Passing processed data to the correct Layout and Component hierarchy.

- **Rule:** Pages should minimize inline markup and delegate presentation complexity to Layouts and Components.

### `src/layouts/` (Structural Wrappers)

Layouts wrap page content and provide consistent structural elements (HTML shell, Header, Footer).

- **Rule:** They act as structural blueprints and use slots (`<slot />`) to inject dynamic page content.

---

## 4. Logic and Utilities

### `src/services/` (Business Logic)

Services handle domain-specific logic.

- **Rule:** Should be pure TypeScript functions. Never import from `src/components/` or access the DOM.
- **Example:** `content-slug.ts` (Handles content identifier manipulation).

### `src/lib/` (Low-Level Utilities)

Libraries contain reusable, low-level helpers not specific to Bridge content.

- **`lib/api/`:** Server-side utilities (CORS, error handling).
- **`lib/ui/`:** Client-side DOM manipulation or interactivity primitives (smooth scrolling, mobile menu control).

---

## Codebase Compliance Review

The codebase largely follows the established principles of separation of concerns.

| File Path                                  | Responsibility Check                 | Status         | Notes                                                                                                                                                                                                                                            |
| :----------------------------------------- | :----------------------------------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/components/content/ContentList.astro` | Content Adapter / Orchestrator       | **Acceptable** | While it is an Adapter, it requires a `slugMap` (data from `src/services/`) to generate links. This is a pragmatic, high-level component orchestration pattern and does not violate SoC as it receives the necessary data via props (`slugMap`). |
| `src/components/Calendar.tsx`              | Feature Component / Presentation     | **Acceptable** | Correctly uses the `client:load` directive and only consumes the `events` array provided by the page.                                                                                                                                            |
| `src/pages/calendar/online.astro`          | Orchestration / Data Fetching        | **Compliant**  | Correctly fetches external ICS data using `node-ical` and handles errors via `src/lib/api/error-handler.ts`, demonstrating clean orchestration logic at the page level.                                                                          |
| `src/layouts/Layout.astro`                 | Structural Wrapper / Lib Consumption | **Compliant**  | Contains necessary scripts (`mobile-menu.ts`, `smooth-scroll.ts`) imported from `src/lib/ui/`, validating the purpose of the `lib` directory.                                                                                                    |
| `src/lib/api/error-handler.ts`             | Low-Level Utility                    | **Compliant**  | Pure TypeScript utility for logging and response formatting.                                                                                                                                                                                     |

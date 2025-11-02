# Bridge mit Alexander: Visual Style Guide

This document codifies the design principles and visual rules for the "Bridge mit Alexander" website. The aesthetic is based on **Brutalism**, characterized by high contrast, thick outlines, bold colors, and functional interfaces.

All values below refer to variables defined in `src/styles/_variables.scss` and `src/styles/global.scss`.

## 1. Core Design Philosophy

The design aims for high visual impact and clarity, simulating a printed, tactile quality through the use of solid borders and simulated depth.

### Principles:

1. **High Contrast:** Black text on white or light-colored backgrounds is mandatory.
2. **Structural Integrity:** Every major element (card, button, image) must be framed by a thick border.
3. **Simulated Depth (Lift):** Interactive elements use offset box shadows to create a 3D, sticker-like appearance that "lifts" upon hover.
4. **Minimalism with Punch:** Use the four core brutalist accent colors sparingly to draw attention.

## 2. Color Palette

The color system relies on primary black/white and four vibrant accent colors (`$brutal-*`).

| Role                                  | SCSS Variable    | CSS Variable | Hex Value | Usage                                                        |
| :------------------------------------ | :--------------- | :----------- | :-------- | :----------------------------------------------------------- |
| **Border & Text**                     | `$color-black`   | `--border`   | `#000000` | Primary outline and text color.                              |
| **Background**                        | `$color-white`   |              | `#ffffff` | Primary page and card background.                            |
| **Accent 1 (Success/Primary Button)** | `$brutal-green`  | `--green`    | `#adf296` | Primary action button color.                                 |
| **Accent 2 (Highlight/Warning)**      | `$brutal-yellow` | `--yellow`   | `#f2cf96` | Active navigation state, table headers, key highlights.      |
| **Accent 3 (Info/Secondary Button)**  | `$brutal-blue`   | `--blue`     | `#96c7f2` | Secondary actions, informational badges (e.g., 'New' badge). |
| **Accent 4 (Contrast/Hover)**         | `$brutal-pink`   | `--pink`     | `#f396e5` | Strong visual emphasis, secondary highlight.                 |
| **Error/Danger**                      | `$color-red`     | `--red`      | `#f29696` | Error states, warning components.                            |

## 3. Typography

The site uses a single, consistent typeface to maintain brand identity.

| Property            | Value                           | Notes                                                                |
| :------------------ | :------------------------------ | :------------------------------------------------------------------- |
| **Font Family**     | `Space Grotesk`                 | Used globally for all text.                                          |
| **Heading Weight**  | `700` (Bold)                    | For `h1`, `h2`, `h3`.                                                |
| **Body Weight**     | `400` or `500`                  | Regular body and link text.                                          |
| **H1 Styling**      | `clamp(2rem, 3vw + 1rem, 3rem)` | Tight line height (`1.1`), bold, with light negative letter spacing. |
| **Text Muted**      | `$color-gray-700` (`#555555`)   | Used for secondary/contextual text (`.text-muted`).                  |
| **Text Muted Weak** | `$color-gray-600` (`#6b6b6b`)   | Used for dates, hints, and copyright (`.text-muted-weak`).           |

## 4. Depth and Borders

The core brutalist look is defined by border width, radius, and the characteristic offset shadow.

### A. Borders (`.border-3`)

All major structural components must use a **3px solid black border**.

- **CSS:** `border: 3px solid var(--border);`
- **Application:** `.card`, `.input`, `.btn` (via `border-3` utility), media frames, header/footer dividers.

### B. Corner Radius

Corners should be slightly rounded, but not aggressively soft.

- **Cards/Media Frames (`.card`, `.media-frame`):** `$border-radius-lg` (18px) or `$border-radius-xl` (14px).
- **Buttons/Inputs:** `$border-radius-md` (10px).

### C. Box Shadows (The "Lift")

Shadows are black, hard offsets, consistently applied.

| Class / State       | SCSS Variable    | CSS Value          | Effect                                                                |
| :------------------ | :--------------- | :----------------- | :-------------------------------------------------------------------- |
| **Standard / Rest** | `$shadow-sm`     | `4px 4px 0 #000`   | Default depth for cards, buttons, etc.                                |
| **Hover / Focus**   | `$shadow-lg`     | `10px 10px 0 #000` | Used on hover, paired with `translate(-1px, -1px)` for dramatic lift. |
| **Small / Subtle**  | `$shadow-sm-2px` | `2px 2px 0 #000`   | Used for badges (e.g., the corner logo).                              |

## 5. Components Style Rules

### Cards (`.card`)

The card is the primary content container.

- **Structure:** 3px border, white background, `var(--radius-lg)` radius.
- **Interaction:** Must apply the `brutalist-hover` effect (transitioning from `$shadow-sm` to `$shadow-lg`).
- **Internal Padding:** Generally `p-6` or `p-8` (24px to 32px).

### Buttons (`.btn` / `Button.astro`)

Buttons use the `border-3` class and the full hover effect.

- **Primary (CTA):** Uses the green accent color (`--green`).
- **Standard/Neutral:** Uses white background or no specific accent color.
- **States:** Must include the full hover interaction: `shadow-[10px_10px_0_#000]` and `hover:-translate-x-[1px] hover:-translate-y-[1px]`.

### Navigation Links (Desktop)

Desktop links are styled to resemble small brutalist buttons (`.nav-link-base`).

- **Default:** White background, 3px border, `$shadow-sm` effect.
- **Active Page (`.nav-link-active`):** Uses the yellow accent color (`--yellow`) background, retaining the 3px border and bold font weight (`700`).

### Forms (`.input`)

Inputs are simple, high-contrast boxes.

- **Default:** 2px border (slightly thinner than cards), white background.
- **Focus State:** Border color changes to yellow (`$brutal-yellow`) and border width increases to 3px to indicate activation. Must use accessible `:focus-visible` styling.

### Media Frames (`.media-frame`)

Any imported image or video container (e.g., `ImageCarousel.astro`) must be enclosed in the standard framing.

- **Structure:** 3px border, 18px radius, `$shadow-sm`.
- **Images:** All images processed by Astro should automatically inherit these styles if placed directly within components using the utility classes.

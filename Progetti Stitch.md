# Design System Specification: The Digital Curator

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Curator."** 

We are moving away from the "utility software" aesthetic and toward a "high-end editorial" experience. This design system treats digital book management with the same reverence as a physical archive or a premium literary journal. To break the "template" look, we prioritize **intentional asymmetry** (e.g., offset hero text), **overlapping elements** (e.g., book covers bleeding over container edges), and **high-contrast typography scales**. We do not fill space; we curate it. Generous white space is not "empty"—it is a functional luxury that allows the content to breathe.

---

## 2. Colors: Tonal Depth & The "No-Line" Rule
The palette is built on a sophisticated monochromatic foundation, punctuated by a library-inspired sage green (`primary: #446464`).

### The "No-Line" Rule
**Explicit Instruction:** 1px solid borders for sectioning are strictly prohibited. Structural boundaries must be defined solely through background color shifts or tonal transitions. Use `surface_container_low` (`#f2f4f4`) to define a sidebar against a `surface` (`#f9f9f9`) main content area. Lines create visual noise; color shifts create "zones."

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine archival paper.
*   **Base:** `surface` (#f9f9f9)
*   **Layer 1 (Nesting):** Use `surface_container_low` for large background regions.
*   **Layer 2 (Floating):** Use `surface_container_lowest` (#ffffff) for primary interactive cards to create a subtle "lift."
*   **High Importance:** Use `surface_container_highest` (#dde4e5) for temporary states like drawer menus.

### The "Glass & Gradient" Rule
To elevate the system beyond flat design:
*   **Glassmorphism:** Navigation bars and floating action menus should use semi-transparent `surface` colors with a `backdrop-blur` of 12px–20px. 
*   **Signature Textures:** For primary CTAs and hero sections, use a subtle linear gradient from `primary` (#446464) to `primary_dim` (#385858). This adds "soul" and professional polish that a flat hex code cannot achieve.

---

## 3. Typography: Editorial Authority
We utilize two typefaces to balance character with precision.

*   **Display & Headlines:** **Manrope.** Its geometric yet organic curves provide a "modern classic" feel. Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) for an authoritative editorial look.
*   **Body & Labels:** **Inter.** Used for its unparalleled legibility. 
*   **Hierarchy Strategy:** Brand identity is conveyed through scale contrast. A `headline-lg` title should often be paired with a significantly smaller `label-md` uppercase sub-header to create a "Big/Small" dynamic typical of premium print magazines.

---

## 4. Elevation & Depth: Tonal Layering
Hierarchy is achieved through **Tonal Layering** rather than traditional structural shadows.

*   **The Layering Principle:** Place a `surface_container_lowest` card on a `surface_container_low` section. The change in brightness creates a soft, natural lift.
*   **Ambient Shadows:** For floating elements (like a "Currently Reading" pop-over), shadows must be extra-diffused. 
    *   *Spec:* `0px 10px 30px rgba(45, 52, 53, 0.06)`. 
    *   The shadow is tinted with the `on_surface` color (#2d3435) to mimic natural light.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline_variant` token at **15% opacity**. Never use 100% opaque borders.
*   **Glassmorphism:** Use semi-transparent surface colors for modal overlays to allow the underlying book textures to bleed through, maintaining the user's context.

---

## 5. Components

### Cards
*   **Style:** No borders. `surface_container_lowest` background. 
*   **Layout:** Focus on "The Book Cover as Hero." Forbid divider lines within cards; use 1.5rem (xl) vertical spacing between the title and the metadata.
*   **Corners:** Use `md` (0.75rem) for book cards to maintain a friendly yet architectural feel.

### Buttons
*   **Primary:** `primary` (#446464) with `on_primary` text. Use `full` (9999px) roundedness for high-action buttons to make them feel tactile.
*   **Secondary:** `surface_container_high` background. No border.
*   **Tertiary:** No background. Bold `primary` text.

### Data Tables (The "Clean Grid")
*   **Forbid:** Vertical and horizontal grid lines.
*   **The Solution:** Use alternating row colors (zebra striping) using `surface` and `surface_container_low`. Use `title-sm` (Inter) for headers in all-caps with 0.05em tracking.

### Inputs & Search
*   **Style:** `surface_container_low` backgrounds. 
*   **Focus State:** Shift background to `surface_container_lowest` and add a 2px `primary` "Ghost Border" (20% opacity).

### Specialized Components
*   **Reading Progress Bar:** A thin (4px) bar using `primary` for the fill and `primary_container` for the track.
*   **Status Chips:** Use `secondary_container` for "Reading," `tertiary_container` for "Completed," and `error_container` for "Abandoned." Keep text in their respective "on-container" colors.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical margins (e.g., a wider left margin for titles) to mimic high-end book layouts.
*   **Do** prioritize the Book Cover art—use it to drive the "vibe" of the page by extracting blurred background colors where appropriate.
*   **Do** ensure `on_surface` (#2d3435) is used for all long-form reading text to ensure maximum contrast and reduced eye strain.

### Don't:
*   **Don't** use 1px dividers to separate list items. Use 24px of whitespace instead.
*   **Don't** use pure black (#000000). It is too harsh for this minimalist system; always use `on_surface` or `on_background`.
*   **Don't** crowd the interface. If a screen feels full, increase the page height and add more whitespace between sections.
*   **Don't** use standard "drop shadows." If an element needs to feel elevated, use tonal shifts first, then ambient diffused shadows.
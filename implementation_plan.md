# Redesign based on Physical Menu Style

The goal is to transform the current dark-themed, gold-accented "Glassmorphism" design into a fresh, light-themed, and "eco-friendly" aesthetic that matches the physical menu of **Ristobar Martin Pescatore**.

## User Review Required

> [!IMPORTANT]
> - **Product Images:** Following your request, I will **remove all product images** from the menu view. The layout will shift to a clean, list-based design similar to the physical menu.
> - **Logo:** I will recreate the "Martin Pescatore" speech-bubble logo using CSS and SVG to match the one in your images.
> - **Theme:** Moving to a **Light Mode** ("Fresh & Natural") with the green accent from the logo.

## Proposed Changes

### [Design System & Global Styles]

#### [MODIFY] [index.css](file:///c:/Users/Nicol%C3%B2/.gemini/antigravity/scratch/menu-manager/src/index.css)
- Update CSS variables for the color palette: Background (#FFFFFF), Text (#333333), Accent (#A4C639).
- Import 'Amatic SC' and 'Montserrat' from Google Fonts.
- Update global base styles to be light-themed.

### [Components & Pages]

#### [MODIFY] [App.css](file:///c:/Users/Nicol%C3%B2/.gemini/antigravity/scratch/menu-manager/src/App.css)
- **Product List:** Redesign `.product-card` into a minimal list item without images.
- **Header:** Style the logo area as a speech bubble with the custom font.
- **Typography:** Apply 'Amatic SC' to headers and '.category-tab'.

#### [MODIFY] [MenuPage.jsx](file:///c:/Users/Nicol%C3%B2/.gemini/antigravity/scratch/menu-manager/src/pages/MenuPage.jsx)
- Remove `<img>` tags for products.
- Update the Hero section to render the speech bubble logo.

## Open Questions

- Should the price be aligned to the right (like in the physical menu) or stay centered with the item?
- Should I keep the "Glassmorphism" (blur) effects for the sticky menu, or would you prefer a more "flat and clean" look?

## Verification Plan

### Automated Tests
- I will use the browser subagent to verify the new design looks correct and is legible in light mode.

### Manual Verification
- The user can review the screenshots/recordings I will provide after implementation.

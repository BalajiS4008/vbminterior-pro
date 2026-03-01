# Services Page Premium Revamp Design

## Scope
Full revamp of the Services page (Hero, Services Grid, Our Process, CTA).

## Style Direction
Premium/luxury: larger typography, more whitespace, subtle parallax, richer visual hierarchy.

## Sections

### 1. Hero
- 65vh height, Ken Burns zoom on bg image
- Larger heading with letter-spacing, gold underline accent

### 2. Services Grid → Alternating Editorial Layout
- Full-width alternating rows (image left/text right, then swap)
- 50/50 split, larger images (400px), spacious text
- Scroll-reveal from image side
- Mobile: stacks vertically

### 3. Our Process — Scroll-Driven Progress Timeline
- Center-aligned zigzag timeline on desktop
- Progress line fills gold on scroll (gray → gold)
- Step circles fill gold when progress reaches them
- Content cards fade + slide from alternating sides
- Mobile: left-aligned single-column
- Icons per step: handshake, palette, clipboard, hammer, gift

### 4. CTA
- Radial gradient mesh background

### 5. Responsive
- Desktop (>1024px): alternating rows, center zigzag
- Tablet (768-1024px): narrower alternating, left-aligned timeline
- Mobile (<768px): stacked, left-aligned timeline

### 6. Animations
- prefers-reduced-motion respected
- requestAnimationFrame for scroll progress
- IntersectionObserver for reveals (threshold: 0.2)

# VBM Interior Pro — Landing Page Enhancement Design

**Date:** 2026-02-28
**Goal:** Comprehensive landing page overhaul for lead generation, brand showcase, and SEO/traffic
**Approach:** Three-wave methodology (Bug Fixes → Content & SEO → Theme Evolution)

---

## Wave 1: Bug Fixes (8 items)

### 1.1 Duplicate ContactModal Instances
- **Problem:** Services.jsx and Portfolio.jsx maintain local `showModal` state and render their own `ContactModal`
- **Fix:** Remove local modal state from both pages. Pass `onOpenModal` from App.jsx through routes. Single modal instance at App level.

### 1.2 Navbar "Career" Mislabel
- **Problem:** Nav link says "Career" but routes to `/portfolio`
- **Fix:** Rename label to "Portfolio"

### 1.3 Sitemap Slug Mismatch
- **Problem:** sitemap.xml references `/blog/wallpaper-design-ideas/` but blogData.js uses `multiple-wallpaper-design-ideas`
- **Fix:** Update sitemap.xml URLs to match actual blogData.js slugs

### 1.4 Unused ImageAccordion Import
- **Problem:** ImageAccordion is imported in Home.jsx but never rendered
- **Fix:** Remove the import statement

### 1.5 Hidden Dream Home Labels
- **Problem:** `.dream-home-label` has `display:none` — step names invisible
- **Fix:** Remove `display:none`, style labels to show step numbers and titles

### 1.6 Contact Page Duplicate FAQ
- **Problem:** Contact.jsx reimplements accordion logic inline instead of using FAQAccordion component
- **Fix:** Replace inline implementation with `<FAQAccordion items={contactFaqs} />`

### 1.7 Missing PWA Icons
- **Problem:** site.webmanifest references `/icons/icon-*.png` files that don't exist
- **Fix:** Remove manifest icon references (or add actual icons if PWA is desired)

### 1.8 theme-color Mismatch
- **Problem:** `theme-color` is `#046bd2` (blue) but brand is gold/navy
- **Fix:** Change to `#0a1628` (navy) in both index.html and site.webmanifest

---

## Wave 2: Content & SEO Overhaul

### 2.1 Image Strategy

| Section | Current | New |
|---|---|---|
| Luxury Gallery (6 images) | Unsplash stock | Local `/Rooms/` images: Hall.png, Home.png, Dinner.png, studyarea.png, Hall1.png, Dinning.png |
| Affordable Luxury (4 cards) | Unsplash stock | Local `/Rooms/` images for Living Room, Bedroom, Kitchen, Dining |
| Design Tabs (16 images) | Unsplash | Keep Unsplash but add geo-targeted alt text |
| All images | Generic alt text | Keyword-rich with Chennai locality rotation |

### 2.2 Geo-Targeted Areas (40+ locations)

**South Chennai:** Adyar, Besant Nagar, Thiruvanmiyur, Velachery, Mylapore, R.A. Puram, Alwarpet, Guindy
**West Chennai:** Anna Nagar, Mogappair, Ambattur, Porur, Valasaravakkam, Virugambakkam, Koyambedu, Vadapalani
**Central Chennai:** T. Nagar, Nungambakkam, Kilpauk, Egmore, Chetpet, Teynampet, Kodambakkam
**IT Corridor:** OMR, ECR, Sholinganallur, Perungudi, Siruseri, Navalur, Kelambakkam, Medavakkam
**Suburban/Districts:** Tambaram, Chromepet, Pallavaram, Kancheepuram, Chengalpattu, Mahabalipuram, Tiruvallur South

### 2.3 Geo-Content Placement

- **New "Areas We Serve" section** on homepage (after FAQ, before Final CTA)
  - Area tags/cards grouped by zone
  - Each area name is a keyword-rich anchor
- **Structured Data:** Expand `areaServed` in JSON-LD to all 40+ areas
- **Image alt text:** Rotate area names naturally (e.g., "Modern kitchen interior design in Anna Nagar, Chennai")
- **Meta tags:** Top 10 areas in description and keywords

### 2.4 SEO Technical Fixes

- Fix sitemap URLs to match blog slugs
- Add `SearchAction` schema to index.html (exists in reference file, missing from live)
- Expand `BreadcrumbList` schema for all pages
- Add `ItemList` schema for portfolio projects
- Add Tamil hreflang tag for regional targeting

### 2.5 Content Freshness

- Update blog post dates to 2025-2026
- Add 2-3 new blog entries in blogData.js targeting trending keywords
- Update FAQ with geo-specific questions (e.g., "How much does interior design cost in Anna Nagar?")
- Surface pricing info on-page (currently only in llms.txt)

---

## Wave 3: Theme Evolution

### 3.1 Micro-Animations

- **Scroll-reveal:** IntersectionObserver-based fade-in + slide-up on section entry
- **Staggered entries:** Grid cards animate in with 50ms sequential delay
- **Parallax:** Hero video and CTA banners at 0.5x scroll speed
- **Counter animation:** Portfolio stats count up when visible
- **Hover refinements:** Smoother zoom, directional shadow on card lift

### 3.2 Spacing & Layout

- Section padding: increase to 80-120px vertical rhythm
- Consistent containers: 1200px content, 1400px wide sections
- Larger H2 titles with more whitespace
- Mobile: less cramped spacing

### 3.3 Premium Elements

- **Review cards:** Frosted glass (`backdrop-filter: blur`) on light backgrounds
- **CTA banners:** Subtle gradient overlays with depth
- **Navbar:** `backdrop-filter: blur(10px)` semi-transparent on scroll
- **Section dividers:** Gold accent lines for visual rhythm

### 3.4 Mobile UX

- Min 44px touch targets
- Smooth mobile nav overlay
- Swiper touch hints and snap
- Image lazy loading with blur-up placeholders
- Reduced hero height, CTA prioritized

### 3.5 Performance

- Lazy load all below-fold images
- Video: poster image + `preload="metadata"` only
- `prefers-reduced-motion` support
- Reduce animation complexity on mobile

---

## Files Affected

### Wave 1 (Bug Fixes)
- `src/App.jsx` — route props for Services/Portfolio
- `src/pages/Services.jsx` — remove local modal state
- `src/pages/Portfolio.jsx` — remove local modal state
- `src/components/Navbar.jsx` — fix "Career" label
- `public/sitemap.xml` — fix blog URLs
- `src/pages/Home.jsx` — remove unused ImageAccordion import
- `src/pages/Home.css` — show dream-home-label
- `src/pages/Contact.jsx` — use FAQAccordion component
- `public/site.webmanifest` — fix icons / theme-color
- `index.html` — fix theme-color

### Wave 2 (Content & SEO)
- `src/pages/Home.jsx` — new Areas section, update image imports, alt text
- `src/pages/Home.css` — Areas section styles
- `src/data/blogData.js` — new posts, date updates
- `index.html` — expanded structured data, meta tags, hreflang
- `public/sitemap.xml` — expanded URLs
- All page components — geo-targeted alt text updates

### Wave 3 (Theme Evolution)
- `src/index.css` — spacing tokens, animation utilities, glassmorphism
- `src/pages/Home.jsx` — IntersectionObserver scroll-reveal logic
- `src/pages/Home.css` — all animation and spacing enhancements
- `src/components/Navbar.css` — blur transition
- `src/components/GoogleReviews.css` — frosted glass cards
- All page CSS files — spacing and mobile UX improvements

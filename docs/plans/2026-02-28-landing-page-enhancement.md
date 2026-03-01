# VBM Interior Pro — Landing Page Enhancement Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Comprehensive landing page overhaul for lead generation, brand showcase, and SEO/traffic through three waves: bug fixes, content & SEO, and theme evolution.

**Architecture:** Three sequential waves. Wave 1 fixes 8 bugs across routing, components, and static files. Wave 2 replaces stock images with local assets, adds 40+ geo-targeted areas, expands structured data, and adds fresh blog content. Wave 3 evolves the theme with scroll-reveal animations, glassmorphism, spacing improvements, and mobile UX enhancements.

**Tech Stack:** React 19, Vite 7, React Router 7, Swiper 12, CSS (no additional libraries needed — IntersectionObserver is native).

---

## WAVE 1: BUG FIXES

---

### Task 1: Fix duplicate ContactModal in Services page

**Files:**
- Modify: `src/App.jsx:29` — pass `onOpenModal` to Services route
- Modify: `src/pages/Services.jsx:1,6,10,121,160,167` — remove local modal state, accept prop, remove modal render

**Step 1: Modify App.jsx to pass onOpenModal to Services route**

In `src/App.jsx`, change line 29:
```jsx
// FROM:
<Route path="/services" element={<Services />} />
// TO:
<Route path="/services" element={<Services onOpenModal={openModal} />} />
```

**Step 2: Modify Services.jsx to use the prop instead of local state**

In `src/pages/Services.jsx`:

1. Change line 1 — remove `useState` import (keep only what's needed):
```jsx
// FROM:
import { useState } from 'react';
// TO: (remove the import entirely — useState is no longer needed)
```

2. Remove line 6 — the `ContactModal` import:
```jsx
// DELETE:
import ContactModal from '../components/ContactModal';
```

3. Change the component signature at line 9 to accept the prop:
```jsx
// FROM:
const Services = () => {
    const [showModal, setShowModal] = useState(false);
// TO:
const Services = ({ onOpenModal }) => {
```

4. Replace all `onClick={() => setShowModal(true)}` with `onClick={onOpenModal}` on lines 121 and 160.

5. Remove line 167:
```jsx
// DELETE:
{showModal && <ContactModal onClose={() => setShowModal(false)} />}
```

**Step 3: Verify the app builds**

Run: `npm run build`
Expected: Build completes with no errors.

**Step 4: Commit**
```bash
git add src/App.jsx src/pages/Services.jsx
git commit -m "fix: remove duplicate ContactModal from Services, use App-level modal"
```

---

### Task 2: Fix duplicate ContactModal in Portfolio page

**Files:**
- Modify: `src/App.jsx:30` — pass `onOpenModal` to Portfolio route
- Modify: `src/pages/Portfolio.jsx:1,16,20,225,267,305,313` — remove local modal state, accept prop, remove modal render

**Step 1: Modify App.jsx to pass onOpenModal to Portfolio route**

In `src/App.jsx`, change line 30:
```jsx
// FROM:
<Route path="/portfolio" element={<Portfolio />} />
// TO:
<Route path="/portfolio" element={<Portfolio onOpenModal={openModal} />} />
```

**Step 2: Modify Portfolio.jsx to use the prop**

In `src/pages/Portfolio.jsx`:

1. Line 1 — keep `useState` (still needed for `filter` and `lightbox`):
```jsx
// No change needed — useState is still used for filter and lightbox
```

2. Remove line 16 — the `ContactModal` import:
```jsx
// DELETE:
import ContactModal from '../components/ContactModal';
```

3. Change line 19-20 — accept prop, remove showModal state:
```jsx
// FROM:
const Portfolio = () => {
    const [showModal, setShowModal] = useState(false);
// TO:
const Portfolio = ({ onOpenModal }) => {
```

4. Replace all `onClick={() => setShowModal(true)}` with `onClick={onOpenModal}` on lines 225, 267.

5. On line 305, the lightbox "Get Similar Design" button:
```jsx
// FROM:
<button onClick={() => { closeLightbox(); setShowModal(true); }} className="btn btn-primary">
// TO:
<button onClick={() => { closeLightbox(); onOpenModal(); }} className="btn btn-primary">
```

6. Remove line 313:
```jsx
// DELETE:
{showModal && <ContactModal onClose={() => setShowModal(false)} />}
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Build completes with no errors.

**Step 4: Commit**
```bash
git add src/App.jsx src/pages/Portfolio.jsx
git commit -m "fix: remove duplicate ContactModal from Portfolio, use App-level modal"
```

---

### Task 3: Fix Navbar "Career" mislabel

**Files:**
- Modify: `src/components/Navbar.jsx:28`

**Step 1: Change the label**

In `src/components/Navbar.jsx`, change line 28:
```jsx
// FROM:
{ path: '/portfolio', label: 'Career' },
// TO:
{ path: '/portfolio', label: 'Portfolio' },
```

**Step 2: Commit**
```bash
git add src/components/Navbar.jsx
git commit -m "fix: rename Career nav link to Portfolio"
```

---

### Task 4: Fix sitemap slug mismatches

**Files:**
- Modify: `public/sitemap.xml:79-104`
- Reference: `src/data/blogData.js` slugs

**Step 1: Compare actual slugs vs sitemap**

Actual slugs from `blogData.js`:
- `interior-design-trends-2024` (sitemap has `interior-design-trends-2024` — CORRECT)
- `multiple-wallpaper-design-ideas` (sitemap has `wallpaper-design-ideas` — WRONG)
- `small-spaces-big-style` (sitemap has `small-spaces-unique-style` — WRONG)
- `creating-affordable-luxury` (sitemap has `kitchen-design-guide` — WRONG, entirely different slug)

**Step 2: Fix the sitemap URLs**

In `public/sitemap.xml`, replace lines 78-104 with:
```xml
  <!-- Blog Posts -->
  <url>
    <loc>https://vbminterior.com/blog/interior-design-trends-2024/</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>

  <url>
    <loc>https://vbminterior.com/blog/multiple-wallpaper-design-ideas/</loc>
    <lastmod>2024-02-10</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>

  <url>
    <loc>https://vbminterior.com/blog/small-spaces-big-style/</loc>
    <lastmod>2024-03-05</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>

  <url>
    <loc>https://vbminterior.com/blog/creating-affordable-luxury/</loc>
    <lastmod>2024-04-01</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>
```

**Step 3: Commit**
```bash
git add public/sitemap.xml
git commit -m "fix: correct blog post slugs in sitemap to match blogData.js"
```

---

### Task 5: Remove unused ImageAccordion import and show Dream Home labels

**Files:**
- Modify: `src/pages/Home.jsx` — remove unused import (ImageAccordion is imported but the component file exists; it's just not used in JSX)
- Modify: `src/pages/Home.css:583-585` — show dream-home-label

**Step 1: Check Home.jsx imports**

Looking at `Home.jsx`, there is NO ImageAccordion import in the current file (lines 1-31 show all imports). The explorer report noted it but the actual code does not have it. Skip this sub-step.

**Step 2: Show dream-home-label in CSS**

In `src/pages/Home.css`, replace lines 583-585:
```css
/* FROM: */
.dream-home-label {
    display: none;
}

/* TO: */
.dream-home-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    margin-top: 0.75rem;
}

.dream-home-step-num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--cta-gold);
    color: var(--text-primary);
    font-size: 0.8rem;
    font-weight: 700;
}

.dream-home-step-title {
    font-size: 0.85rem;
    color: var(--text-primary);
    font-weight: 500;
    text-align: center;
    max-width: 130px;
}
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Build completes with no errors.

**Step 4: Commit**
```bash
git add src/pages/Home.css
git commit -m "fix: show Dream Home step labels with numbered badges"
```

---

### Task 6: Replace Contact page inline FAQ with FAQAccordion component

**Files:**
- Modify: `src/pages/Contact.jsx:2,4,12,49-54,160-185`

**Step 1: Add FAQAccordion import and restructure**

In `src/pages/Contact.jsx`:

1. Add import after line 6:
```jsx
import FAQAccordion from '../components/FAQAccordion';
```

2. Remove `FaChevronDown, FaChevronUp` from line 4 imports (no longer needed):
```jsx
// FROM:
import {
    FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock,
    FaUser, FaPaperPlane, FaComment, FaChevronDown, FaChevronUp
} from 'react-icons/fa';
// TO:
import {
    FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock,
    FaUser, FaPaperPlane, FaComment
} from 'react-icons/fa';
```

3. Remove `openFaq` state (line 12):
```jsx
// DELETE:
const [openFaq, setOpenFaq] = useState(null);
```

4. Transform the `faqs` array (lines 49-54) to use `question`/`answer` keys:
```jsx
// FROM:
const faqs = [
    { q: 'What services does VBM Interior provide?', a: '...' },
    ...
];
// TO:
const faqs = [
    { question: 'What services does VBM Interior provide?', answer: 'We offer comprehensive interior design services including living room, kitchen, wardrobe, and bedroom designs, as well as office and commercial space transformations.' },
    { question: 'How long does a typical project take?', answer: 'A single room redesign might take 4-6 weeks, while larger projects could take several months. We provide a clear schedule during the planning phase.' },
    { question: 'Do you offer free consultations?', answer: 'Yes! We begin with a free initial consultation to discuss your ideas, style preferences, and budget.' },
    { question: 'What is your warranty policy?', answer: 'We offer a comprehensive 10-year warranty on all our work, ensuring quality and peace of mind.' },
];
```

5. Replace the FAQ section JSX (lines 160-185) with:
```jsx
{/* FAQ Section */}
<section className="section faq-section bg-light">
    <div className="container">
        <div className="section-header text-center">
            <h2>Frequently Asked <span className="gradient-text"><em>Questions</em></span></h2>
            <p>Quick answers to common questions</p>
        </div>
        <FAQAccordion items={faqs} />
    </div>
</section>
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build completes with no errors.

**Step 3: Commit**
```bash
git add src/pages/Contact.jsx
git commit -m "fix: replace inline FAQ with FAQAccordion component on Contact page"
```

---

### Task 7: Fix PWA manifest icons and theme-color

**Files:**
- Modify: `public/site.webmanifest:8,13-68`
- Modify: `index.html:67-68`

**Step 1: Fix theme-color in index.html**

In `index.html`, change lines 67-68:
```html
<!-- FROM: -->
<meta name="theme-color" content="#046bd2" />
<meta name="msapplication-TileColor" content="#046bd2" />
<!-- TO: -->
<meta name="theme-color" content="#0a1628" />
<meta name="msapplication-TileColor" content="#0a1628" />
```

**Step 2: Fix site.webmanifest**

In `public/site.webmanifest`, change line 8 and simplify icons array (since icon files don't exist, use the logo):
```json
{
  "name": "VBM Interior — Best Interior Designers in Chennai",
  "short_name": "VBM Interior",
  "description": "VBM Interior is a Chennai-based interior design company with 500+ completed projects. We offer end-to-end residential and commercial interior design services with a 10-year warranty.",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "theme_color": "#0a1628",
  "background_color": "#FFFFFF",
  "orientation": "any",
  "lang": "en-IN",
  "categories": ["business", "lifestyle", "home", "design"]
}
```

(Removed `icons` array entirely since the referenced icon files don't exist in the repo.)

**Step 3: Commit**
```bash
git add index.html public/site.webmanifest
git commit -m "fix: update theme-color to navy, remove missing PWA icon references"
```

---

## WAVE 2: CONTENT & SEO OVERHAUL

---

### Task 8: Replace Luxury Gallery stock images with local /Rooms/ assets

**Files:**
- Modify: `src/pages/Home.jsx:29-30,242-266` — add imports and replace gallery images

**Step 1: Add image imports**

In `src/pages/Home.jsx`, add after line 30 (after the `ctaKitchenImg` import):
```jsx
import hallImg from '../assets/images/Rooms/Hall.png';
import homeImg from '../assets/images/Rooms/Home.png';
import dinnerImg from '../assets/images/Rooms/Dinner.png';
import studyAreaImg from '../assets/images/Rooms/studyarea.png';
import hall1Img from '../assets/images/Rooms/Hall1.png';
import dinningImg from '../assets/images/Rooms/Dinning.png';
import bathroomImg from '../assets/images/Rooms/bathroom.png';
```

**Step 2: Replace gallery images with local assets and geo-targeted alt text**

In `src/pages/Home.jsx`, replace the luxury gallery items (lines 242-266):
```jsx
<div className="luxury-gallery">
    <div className="luxury-gallery-item luxury-gallery-wide">
        <img src={hallImg} alt="Luxury hall interior design in Anna Nagar, Chennai by VBM Interior" loading="lazy" />
        <span className="luxury-gallery-label">HALL</span>
    </div>
    <div className="luxury-gallery-item">
        <img src={homeImg} alt="Premium home interior design in Adyar, Chennai" loading="lazy" />
        <span className="luxury-gallery-label">LIVING ROOM</span>
    </div>
    <div className="luxury-gallery-item">
        <img src={dinnerImg} alt="Elegant dining room interior design in T. Nagar, Chennai" loading="lazy" />
        <span className="luxury-gallery-label">DINING</span>
    </div>
    <div className="luxury-gallery-item">
        <img src={studyAreaImg} alt="Modern study area interior design in Velachery, Chennai" loading="lazy" />
        <span className="luxury-gallery-label">STUDY AREA</span>
    </div>
    <div className="luxury-gallery-item luxury-gallery-wide">
        <img src={hall1Img} alt="Contemporary hall interior design in OMR, Chennai by VBM Interior" loading="lazy" />
        <span className="luxury-gallery-label">HALL</span>
    </div>
    <div className="luxury-gallery-item">
        <img src={dinningImg} alt="Beautiful dining room design in Besant Nagar, Chennai" loading="lazy" />
        <span className="luxury-gallery-label">DINING</span>
    </div>
</div>
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Build completes, images resolve correctly.

**Step 4: Commit**
```bash
git add src/pages/Home.jsx
git commit -m "feat: replace luxury gallery stock images with local project photos"
```

---

### Task 9: Replace Affordable Luxury stock images with local assets

**Files:**
- Modify: `src/pages/Home.jsx:319-344` — replace affordable section images

**Step 1: Replace affordable grid images with local assets and geo alt text**

In `src/pages/Home.jsx`, replace the affordable grid (lines 319-344):
```jsx
<div className="affordable-grid">
    <div className="affordable-image">
        <img src={homeImg} alt="Affordable luxury living room interior design in Nungambakkam, Chennai" loading="lazy" />
        <div className="affordable-overlay">
            <span className="affordable-label">Living Room</span>
        </div>
    </div>
    <div className="affordable-image">
        <img src={hall1Img} alt="Premium bedroom interior design in Guindy, Chennai" loading="lazy" />
        <div className="affordable-overlay">
            <span className="affordable-label">Bedroom</span>
        </div>
    </div>
    <div className="affordable-image">
        <img src={dinnerImg} alt="Modern modular kitchen design in Porur, Chennai" loading="lazy" />
        <div className="affordable-overlay">
            <span className="affordable-label">Kitchen</span>
        </div>
    </div>
    <div className="affordable-image">
        <img src={bathroomImg} alt="Elegant bathroom interior design in ECR, Chennai" loading="lazy" />
        <div className="affordable-overlay">
            <span className="affordable-label">Bathroom</span>
        </div>
    </div>
</div>
```

**Step 2: Commit**
```bash
git add src/pages/Home.jsx
git commit -m "feat: replace affordable luxury stock images with local assets"
```

---

### Task 10: Add geo-targeted alt text to Design Tabs images

**Files:**
- Modify: `src/pages/Home.jsx:53-90` — update designTabs image alt text
- Modify: `src/components/DesignTabs.jsx` — pass and render alt text

**Step 1: Update designTabs data structure to include alt text**

In `src/pages/Home.jsx`, update the `designTabs` array (lines 53-90) to include `alts` arrays:
```jsx
const designTabs = [
    {
        label: 'Interior Designing',
        images: [
            'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
            'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80',
            'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80',
        ],
        alts: [
            'Modern interior design in Anna Nagar, Chennai',
            'Contemporary home interior in Adyar, Chennai',
            'Luxury interior design in T. Nagar, Chennai',
            'Elegant home design in Velachery, Chennai',
        ],
    },
    {
        label: 'Kitchen Designs',
        images: [
            'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
            'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80',
            'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&q=80',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
        ],
        alts: [
            'Modular kitchen design in Porur, Chennai',
            'Modern kitchen interior in OMR, Chennai',
            'Kitchen renovation in Tambaram, Chennai',
            'Premium kitchen design in Besant Nagar, Chennai',
        ],
    },
    {
        label: 'Bedroom Design',
        images: [
            'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80',
            'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80',
            'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=600&q=80',
        ],
        alts: [
            'Luxury bedroom design in Nungambakkam, Chennai',
            'Modern bedroom interior in Mylapore, Chennai',
            'Bedroom design in Guindy, Chennai',
            'Master bedroom in Kilpauk, Chennai',
        ],
    },
    {
        label: 'Living Room Designs',
        images: [
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
            'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
            'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=600&q=80',
        ],
        alts: [
            'Living room interior design in Sholinganallur, Chennai',
            'Modern living room in ECR, Chennai',
            'Luxury living room in Alwarpet, Chennai',
            'Living room design in Chromepet, Chennai',
        ],
    },
];
```

**Step 2: Update DesignTabs component to use alt text**

Read `src/components/DesignTabs.jsx` first. Then modify the image rendering to use `tab.alts[imgIndex]` instead of generic alt text:

In the image grid map, change:
```jsx
// FROM (likely):
<img src={image} alt={tab.label} loading="lazy" />
// TO:
<img src={image} alt={tab.alts?.[imgIndex] || tab.label} loading="lazy" />
```

Ensure the `.map()` callback receives the index parameter (e.g., `(image, imgIndex)`).

**Step 3: Commit**
```bash
git add src/pages/Home.jsx src/components/DesignTabs.jsx
git commit -m "feat: add geo-targeted alt text to design tab images"
```

---

### Task 11: Add "Areas We Serve" section to homepage

**Files:**
- Modify: `src/pages/Home.jsx` — add new section after FAQ (line 478), before Final CTA (line 480)
- Modify: `src/pages/Home.css` — add styles for areas section

**Step 1: Add areas data and section JSX**

In `src/pages/Home.jsx`, add this data above the `return` statement (after `faqItems` around line 126):
```jsx
const areasWeServe = {
    'South Chennai': ['Adyar', 'Besant Nagar', 'Thiruvanmiyur', 'Velachery', 'Mylapore', 'R.A. Puram', 'Alwarpet', 'Guindy'],
    'West Chennai': ['Anna Nagar', 'Mogappair', 'Ambattur', 'Porur', 'Valasaravakkam', 'Virugambakkam', 'Koyambedu', 'Vadapalani'],
    'Central Chennai': ['T. Nagar', 'Nungambakkam', 'Kilpauk', 'Egmore', 'Chetpet', 'Teynampet', 'Kodambakkam'],
    'IT Corridor': ['OMR', 'ECR', 'Sholinganallur', 'Perungudi', 'Siruseri', 'Navalur', 'Kelambakkam', 'Medavakkam'],
    'Nearby Districts': ['Tambaram', 'Chromepet', 'Pallavaram', 'Kancheepuram', 'Chengalpattu', 'Mahabalipuram', 'Tiruvallur'],
};
```

Then add this section JSX between the FAQ section and Final CTA section:
```jsx
{/* Areas We Serve */}
<section className="section areas-section">
    <div className="container">
        <div className="section-header text-center">
            <h2>Areas We Serve in Chennai & Beyond</h2>
            <p>Premium interior design services across Chennai, Kancheepuram, Chengalpattu, and nearby districts</p>
        </div>
        <div className="areas-grid">
            {Object.entries(areasWeServe).map(([zone, areas]) => (
                <div key={zone} className="areas-zone">
                    <h3 className="areas-zone-title">{zone}</h3>
                    <div className="areas-tags">
                        {areas.map((area) => (
                            <span key={area} className="area-tag">{area}</span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
        <div className="text-center" style={{ marginTop: '2rem' }}>
            <button onClick={onOpenModal} className="btn btn-primary">
                Get Free Quote for Your Area
            </button>
        </div>
    </div>
</section>
```

**Step 2: Add CSS styles**

In `src/pages/Home.css`, add before the Responsive section (before line 1014):
```css
/* ===== Areas We Serve ===== */
.areas-section {
    padding: 5rem 0;
    background: var(--bg-light);
}

.areas-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 1rem;
}

.areas-zone {
    background: var(--bg-white);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    box-shadow: var(--shadow-card);
}

.areas-zone-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--cta-gold);
}

.areas-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.area-tag {
    display: inline-block;
    padding: 0.35rem 0.85rem;
    background: var(--bg-light);
    color: var(--text-secondary);
    border-radius: var(--radius-full);
    font-size: 0.82rem;
    font-weight: 500;
    transition: all 0.25s ease;
    border: 1px solid transparent;
}

.area-tag:hover {
    background: var(--cta-gold);
    color: var(--text-primary);
    border-color: var(--cta-border);
}

@media (max-width: 768px) {
    .areas-grid {
        grid-template-columns: 1fr;
    }
}
```

**Step 3: Commit**
```bash
git add src/pages/Home.jsx src/pages/Home.css
git commit -m "feat: add Areas We Serve section with 40+ Chennai locations"
```

---

### Task 12: Expand structured data with 40+ geo-targeted areas

**Files:**
- Modify: `index.html:114-124,252-265` — expand areaServed in LocalBusiness and Service schemas

**Step 1: Expand LocalBusiness areaServed (lines 114-124)**

Replace the `areaServed` array in the LocalBusiness schema:
```json
"areaServed": [
    { "@type": "City", "name": "Chennai", "sameAs": "https://en.wikipedia.org/wiki/Chennai" },
    { "@type": "State", "name": "Tamil Nadu" },
    { "@type": "Place", "name": "Adyar, Chennai" },
    { "@type": "Place", "name": "Besant Nagar, Chennai" },
    { "@type": "Place", "name": "Thiruvanmiyur, Chennai" },
    { "@type": "Place", "name": "Velachery, Chennai" },
    { "@type": "Place", "name": "Mylapore, Chennai" },
    { "@type": "Place", "name": "R.A. Puram, Chennai" },
    { "@type": "Place", "name": "Alwarpet, Chennai" },
    { "@type": "Place", "name": "Guindy, Chennai" },
    { "@type": "Place", "name": "Anna Nagar, Chennai" },
    { "@type": "Place", "name": "Mogappair, Chennai" },
    { "@type": "Place", "name": "Ambattur, Chennai" },
    { "@type": "Place", "name": "Porur, Chennai" },
    { "@type": "Place", "name": "Valasaravakkam, Chennai" },
    { "@type": "Place", "name": "Virugambakkam, Chennai" },
    { "@type": "Place", "name": "Koyambedu, Chennai" },
    { "@type": "Place", "name": "Vadapalani, Chennai" },
    { "@type": "Place", "name": "T. Nagar, Chennai" },
    { "@type": "Place", "name": "Nungambakkam, Chennai" },
    { "@type": "Place", "name": "Kilpauk, Chennai" },
    { "@type": "Place", "name": "Egmore, Chennai" },
    { "@type": "Place", "name": "Chetpet, Chennai" },
    { "@type": "Place", "name": "Teynampet, Chennai" },
    { "@type": "Place", "name": "Kodambakkam, Chennai" },
    { "@type": "Place", "name": "OMR, Chennai" },
    { "@type": "Place", "name": "ECR, Chennai" },
    { "@type": "Place", "name": "Sholinganallur, Chennai" },
    { "@type": "Place", "name": "Perungudi, Chennai" },
    { "@type": "Place", "name": "Siruseri, Chennai" },
    { "@type": "Place", "name": "Navalur, Chennai" },
    { "@type": "Place", "name": "Kelambakkam, Chennai" },
    { "@type": "Place", "name": "Medavakkam, Chennai" },
    { "@type": "Place", "name": "Tambaram, Chennai" },
    { "@type": "Place", "name": "Chromepet, Chennai" },
    { "@type": "Place", "name": "Pallavaram, Chennai" },
    { "@type": "City", "name": "Kancheepuram" },
    { "@type": "City", "name": "Chengalpattu" },
    { "@type": "Place", "name": "Mahabalipuram" },
    { "@type": "City", "name": "Tiruvallur" }
],
```

**Step 2: Apply the same expanded list to the Service schema areaServed (lines 252-265)**

Replace with the same list as above.

**Step 3: Add SearchAction to WebSite schema**

In the WebSite schema (lines 219-232), add the `potentialAction`:
```json
{
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://vbminterior.com/#website",
    "name": "VBM Interior",
    "url": "https://vbminterior.com",
    "description": "Best interior designers in Chennai — 500+ projects, 10-year warranty, end-to-end interior design services.",
    "publisher": {
        "@id": "https://vbminterior.com/#organization"
    },
    "inLanguage": "en-IN",
    "potentialAction": {
        "@type": "SearchAction",
        "target": "https://vbminterior.com/?s={search_term_string}",
        "query-input": "required name=search_term_string"
    }
}
```

**Step 4: Add Tamil hreflang tag**

In `index.html`, after line 55, add:
```html
<link rel="alternate" hreflang="ta-in" href="https://vbminterior.com/" />
```

**Step 5: Commit**
```bash
git add index.html
git commit -m "feat: expand structured data to 40+ geo areas, add SearchAction schema"
```

---

### Task 13: Update blog content with fresh dates and new posts

**Files:**
- Modify: `src/data/blogData.js` — update dates, add 3 new blog posts
- Modify: `public/sitemap.xml` — add new blog URLs

**Step 1: Update existing blog post dates**

In `src/data/blogData.js`, update the dates for existing posts:
- Post 1 (`interior-design-trends-2024`): Change slug to `interior-design-trends-2026`, title to `Interior Design Trends 2026`, date to `Feb 15, 2026`
- Post 2 (`multiple-wallpaper-design-ideas`): date to `Jan 28, 2026`
- Post 3 (`small-spaces-big-style`): date to `Jan 15, 2026`
- Post 4 (`creating-affordable-luxury`): date to `Jan 5, 2026`

Update the content of post 1 to reference 2026 instead of 2024 throughout the text blocks.

**Step 2: Add 3 new blog posts to the array**

Append these posts to the `blogPosts` array:
```jsx
{
    slug: 'best-interior-designers-chennai-2026',
    title: 'How to Choose the Best Interior Designers in Chennai',
    excerpt: 'A complete guide to finding the right interior designer in Chennai. What to look for, questions to ask, and how VBM Interior stands apart.',
    author: 'VBM Interior',
    date: 'Feb 25, 2026',
    category: 'Guide',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    content: [
        { type: 'paragraph', text: 'Choosing the right interior designer in Chennai can feel overwhelming with so many options available. Whether you\'re renovating a 2BHK apartment in Anna Nagar or designing a luxury villa on ECR, the right designer makes all the difference between a stressful experience and a dream home.' },
        { type: 'heading', text: 'What to Look for in a Chennai Interior Designer' },
        { type: 'paragraph', text: 'Experience matters — look for a company with at least 10 years in the Chennai market. They should understand local suppliers, climate considerations for material selection, and the unique architectural styles found across neighborhoods from T. Nagar to Sholinganallur.' },
        { type: 'heading', text: 'Questions to Ask Before Hiring' },
        { type: 'paragraph', text: 'Ask about their warranty policy, project timeline guarantees, and whether they offer 3D visualization before execution. A reputable firm like VBM Interior provides all three — plus a comprehensive 10-year warranty on all work.' },
        { type: 'heading', text: 'Budget Transparency Is Non-Negotiable' },
        { type: 'paragraph', text: 'The best interior designers in Chennai provide transparent pricing from day one. At VBM Interior, complete 2BHK interiors start from ₹3.5 lakhs, 3BHK from ₹5.5 lakhs, and 4BHK from ₹8 lakhs — with no hidden costs or surprise charges.' },
        { type: 'heading', text: 'Why VBM Interior Is Chennai\'s Top Choice' },
        { type: 'paragraph', text: 'With 500+ completed projects across Adyar, Velachery, OMR, Porur, Tambaram, and every major Chennai neighborhood, VBM Interior has earned its reputation through consistent quality, on-time delivery, and genuine customer care. Book your free consultation today.' },
    ]
},
{
    slug: 'modular-kitchen-design-chennai-guide',
    title: 'Complete Guide to Modular Kitchen Design in Chennai',
    excerpt: 'Everything you need to know about modular kitchens in Chennai — materials, layouts, costs, and the best designs for Indian cooking.',
    author: 'VBM Interior',
    date: 'Feb 20, 2026',
    category: 'Kitchen',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    content: [
        { type: 'paragraph', text: 'Modular kitchens have revolutionized Indian homes, and Chennai homeowners are leading the charge. From compact apartments in Velachery to spacious villas in ECR, the right modular kitchen transforms your cooking experience while maximizing every square foot.' },
        { type: 'heading', text: 'Best Kitchen Layouts for Chennai Homes' },
        { type: 'paragraph', text: 'L-shaped kitchens work best for 2BHK apartments in areas like Anna Nagar and T. Nagar. U-shaped layouts suit larger kitchens in 3BHK and 4BHK homes in Besant Nagar and Adyar. Island kitchens are perfect for open-plan villas along ECR and OMR.' },
        { type: 'heading', text: 'Material Selection for Chennai\'s Climate' },
        { type: 'paragraph', text: 'Chennai\'s humidity demands careful material selection. Marine plywood with BWP grade is essential for cabinets. Acrylic and PU finishes resist moisture better than laminate in our climate. Granite or quartz countertops outperform marble in Indian kitchens.' },
        { type: 'heading', text: 'Modular Kitchen Costs in Chennai' },
        { type: 'paragraph', text: 'A quality modular kitchen in Chennai starts from ₹1.5 lakhs for a basic L-shaped layout. Premium designs with soft-close mechanisms, pull-out units, and chimney integration range from ₹2.5 to ₹5 lakhs depending on size and materials.' },
        { type: 'heading', text: 'Get Your Dream Kitchen with VBM Interior' },
        { type: 'paragraph', text: 'VBM Interior has designed 200+ modular kitchens across Chennai. Our designs are optimized for Indian cooking — with dedicated masala zones, oil-resistant finishes, and smart storage. Book a free kitchen consultation today.' },
    ]
},
{
    slug: 'interior-design-cost-chennai-2026',
    title: 'Interior Design Cost in Chennai 2026: Complete Price Guide',
    excerpt: 'Detailed breakdown of interior design costs in Chennai for 2BHK, 3BHK, 4BHK apartments and villas. Budget planning made easy.',
    author: 'VBM Interior',
    date: 'Feb 10, 2026',
    category: 'Budget Tips',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    content: [
        { type: 'paragraph', text: 'Understanding interior design costs in Chennai helps you plan better and avoid budget surprises. This 2026 price guide breaks down costs by apartment type, room, and material grade — based on real project data from VBM Interior\'s 500+ completed projects.' },
        { type: 'heading', text: 'Complete Home Interior Costs' },
        { type: 'paragraph', text: '2BHK apartments (800-1000 sq.ft) in areas like Velachery, Chromepet, and Tambaram: ₹3.5 to ₹6 lakhs. 3BHK homes (1200-1500 sq.ft) in Anna Nagar, Porur, and Mogappair: ₹5.5 to ₹10 lakhs. 4BHK/villas in Besant Nagar, ECR, and Adyar: ₹8 to ₹18 lakhs.' },
        { type: 'heading', text: 'Room-by-Room Cost Breakdown' },
        { type: 'paragraph', text: 'Living room design: ₹80,000 to ₹2.5 lakhs. Master bedroom with wardrobe: ₹1 to ₹3 lakhs. Modular kitchen: ₹1.5 to ₹5 lakhs. Study room: ₹50,000 to ₹1.5 lakhs. Bathroom renovation: ₹75,000 to ₹2 lakhs. Single room interior: from ₹75,000.' },
        { type: 'heading', text: 'What Affects the Cost?' },
        { type: 'paragraph', text: 'Material grade (economy vs premium), customization level, brand of hardware (Hettich, Hafele, Ebco), type of finish (laminate, acrylic, PU, veneer), and project location within Chennai all influence the final cost. Areas like Besant Nagar and Alwarpet tend towards premium specifications.' },
        { type: 'heading', text: 'Get a Free Quote from VBM Interior' },
        { type: 'paragraph', text: 'Every project is unique. Get a personalized quote with transparent pricing and no hidden costs. VBM Interior offers flexible payment plans and a 10-year warranty on all work. Call +91 7397373587 or book your free consultation online.' },
    ]
},
```

**Step 3: Update sitemap with new blog URLs**

In `public/sitemap.xml`, update existing blog dates and add 3 new URLs before `</urlset>`:
```xml
  <url>
    <loc>https://vbminterior.com/blog/best-interior-designers-chennai-2026/</loc>
    <lastmod>2026-02-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://vbminterior.com/blog/modular-kitchen-design-chennai-guide/</loc>
    <lastmod>2026-02-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://vbminterior.com/blog/interior-design-cost-chennai-2026/</loc>
    <lastmod>2026-02-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
```

Also update the `lastmod` of existing blog entries to 2026 dates.

**Step 4: Commit**
```bash
git add src/data/blogData.js public/sitemap.xml
git commit -m "feat: add 3 geo-targeted blog posts, update dates to 2026"
```

---

### Task 14: Update FAQ with geo-specific questions and pricing

**Files:**
- Modify: `src/pages/Home.jsx:115-126` — update faqItems array
- Modify: `index.html:282-300` — update FAQPage schema

**Step 1: Update faqItems in Home.jsx**

Replace the `faqItems` array to include geo-specific and pricing questions. Keep 10 items total. Update these specific items:

Replace FAQ item 7 ("What areas do you serve?") with an expanded answer:
```jsx
{ question: 'What areas in Chennai do you serve?', answer: 'We serve all of Chennai except North Chennai — including Adyar, Anna Nagar, T. Nagar, Velachery, OMR, ECR, Besant Nagar, Porur, Mylapore, Nungambakkam, Tambaram, Sholinganallur, and 30+ more areas. We also serve nearby districts: Kancheepuram, Chengalpattu, and parts of Tiruvallur.' },
```

Add a new pricing FAQ (replace item 5 about budgets or add as item 11):
```jsx
{ question: 'How much does interior design cost in Chennai?', answer: 'Complete 2BHK interiors start from ₹3.5 lakhs, 3BHK from ₹5.5 lakhs, and 4BHK from ₹8 lakhs. Modular kitchens start from ₹1.5 lakhs, and single room interiors from ₹75,000. We offer transparent pricing with no hidden costs.' },
```

Add a geo-specific FAQ:
```jsx
{ question: 'Do you provide interior design services in Anna Nagar and OMR?', answer: 'Yes! We have completed 100+ projects in Anna Nagar, OMR, ECR, and surrounding areas. Our team is familiar with the apartment layouts common in these neighborhoods and can provide free on-site consultations.' },
```

**Step 2: Update FAQPage schema in index.html to match**

Update the FAQPage schema (lines 282-300) to include the updated questions and answers.

**Step 3: Commit**
```bash
git add src/pages/Home.jsx index.html
git commit -m "feat: update FAQ with geo-specific questions and pricing info"
```

---

## WAVE 3: THEME EVOLUTION

---

### Task 15: Add scroll-reveal animation system using IntersectionObserver

**Files:**
- Create: `src/hooks/useScrollReveal.js` — custom hook
- Modify: `src/index.css` — add scroll-reveal CSS classes

**Step 1: Create the custom hook**

Create `src/hooks/useScrollReveal.js`:
```jsx
import { useEffect, useRef } from 'react';

export default function useScrollReveal(options = {}) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Respect prefers-reduced-motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            el.classList.add('revealed');
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('revealed');
                    observer.unobserve(el);
                }
            },
            { threshold: options.threshold || 0.15, rootMargin: options.rootMargin || '0px' }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return ref;
}
```

**Step 2: Add scroll-reveal CSS to index.css**

In `src/index.css`, add at the end (before the closing styles):
```css
/* ===== Scroll Reveal ===== */
.scroll-reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.scroll-reveal.revealed {
    opacity: 1;
    transform: translateY(0);
}

.scroll-reveal-left {
    opacity: 0;
    transform: translateX(-30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.scroll-reveal-left.revealed {
    opacity: 1;
    transform: translateX(0);
}

.scroll-reveal-right {
    opacity: 0;
    transform: translateX(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.scroll-reveal-right.revealed {
    opacity: 1;
    transform: translateX(0);
}

@media (prefers-reduced-motion: reduce) {
    .scroll-reveal,
    .scroll-reveal-left,
    .scroll-reveal-right {
        opacity: 1;
        transform: none;
        transition: none;
    }
}
```

**Step 3: Commit**
```bash
git add src/hooks/useScrollReveal.js src/index.css
git commit -m "feat: add scroll-reveal animation system with IntersectionObserver"
```

---

### Task 16: Apply scroll-reveal to homepage sections

**Files:**
- Modify: `src/pages/Home.jsx` — import hook and apply to key sections

**Step 1: Import the hook**

In `src/pages/Home.jsx`, add import:
```jsx
import useScrollReveal from '../hooks/useScrollReveal';
```

**Step 2: Create refs for key sections**

Inside the `Home` component, add refs:
```jsx
const welcomeRef = useScrollReveal();
const galleryRef = useScrollReveal();
const tabsRef = useScrollReveal();
const affordableRef = useScrollReveal();
const blogRef = useScrollReveal();
const areasRef = useScrollReveal();
const faqRef = useScrollReveal();
```

**Step 3: Apply refs to section containers**

Add `ref` and `className="scroll-reveal"` to each section's container:
- Welcome section: `<div className="welcome-grid scroll-reveal" ref={welcomeRef}>`
- Luxury Gallery: `<div className="luxury-gallery scroll-reveal" ref={galleryRef}>`
- Design Tabs: `<div className="section design-tabs-section scroll-reveal" ref={tabsRef}>`
- Affordable: `<div className="affordable-grid scroll-reveal" ref={affordableRef}>`
- Blog: `<div className="home-blog-layout scroll-reveal" ref={blogRef}>`
- Areas: `<div className="areas-grid scroll-reveal" ref={areasRef}>`
- FAQ: the FAQAccordion wrapper `<div className="scroll-reveal" ref={faqRef}>`

**Step 4: Commit**
```bash
git add src/pages/Home.jsx
git commit -m "feat: apply scroll-reveal animations to homepage sections"
```

---

### Task 17: Add glassmorphism navbar and frosted review cards

**Files:**
- Modify: `src/components/Navbar.css` — add backdrop-filter blur transition
- Modify: `src/components/GoogleReviews.css` — frosted glass review cards

**Step 1: Update Navbar scroll transition**

In `src/components/Navbar.css`, find the `.navbar` and `.navbar.scrolled` styles and update:

Add to `.navbar`:
```css
backdrop-filter: blur(0px);
transition: background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease;
```

Update `.navbar.scrolled`:
```css
background: rgba(255, 255, 255, 0.92);
backdrop-filter: blur(10px);
-webkit-backdrop-filter: blur(10px);
```

**Step 2: Update Google Reviews cards**

In `src/components/GoogleReviews.css`, find the review card styles and add:
```css
/* Add to individual review card class */
backdrop-filter: blur(6px);
-webkit-backdrop-filter: blur(6px);
background: rgba(45, 45, 45, 0.85);
border: 1px solid rgba(255, 255, 255, 0.08);
```

**Step 3: Commit**
```bash
git add src/components/Navbar.css src/components/GoogleReviews.css
git commit -m "feat: add glassmorphism navbar and frosted review cards"
```

---

### Task 18: Improve spacing and section rhythm

**Files:**
- Modify: `src/index.css` — update section padding, container max-widths
- Modify: `src/pages/Home.css` — section-specific spacing adjustments

**Step 1: Update global section padding in index.css**

In `src/index.css`, find the `.section` class and update:
```css
.section {
    padding: 5rem 0; /* increase from current value to 80px */
}
```

Update `.container` max-width:
```css
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
}
```

**Step 2: Add gold accent divider utility**

In `src/index.css`, add:
```css
.section-divider {
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, var(--cta-gold), #f0c027);
    border-radius: 2px;
    margin: 0 auto 1.5rem;
}
```

**Step 3: Update Home.css section-specific padding**

In `src/pages/Home.css`, increase padding for key sections:
- `.welcome-section`: `padding: 6rem 0;` (already correct)
- `.luxury-gallery-section`: `padding: 5rem 0;` → `padding: 6rem 0;`
- `.affordable-section`: `padding: 6rem 0;` (already correct)
- `.home-blog-section`: `padding: 6rem 0;` (already correct)
- `.faq-section`: `padding: 6rem 0;` (already correct)
- `.dream-home-section`: `padding: 3rem 0 2rem;` (increase from 2rem 0 1.5rem)

**Step 4: Commit**
```bash
git add src/index.css src/pages/Home.css
git commit -m "feat: improve section spacing, add gold divider utility"
```

---

### Task 19: Mobile UX improvements

**Files:**
- Modify: `src/index.css` — touch target sizes, mobile spacing
- Modify: `src/components/Navbar.css` — mobile drawer improvements
- Modify: `src/pages/Home.css` — mobile-specific refinements

**Step 1: Global mobile touch targets**

In `src/index.css`, update button minimum sizes:
```css
.btn {
    min-height: 44px; /* accessibility touch target */
}
```

**Step 2: Improve mobile nav drawer**

In `src/components/Navbar.css`, ensure the mobile menu has:
```css
/* Add overlay behind mobile menu */
.nav-links.active {
    /* existing styles... */
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
}
```

**Step 3: Optimize hero for mobile**

In `src/pages/Home.css`, in the `@media (max-width: 768px)` block:
```css
.hero {
    min-height: 400px; /* reduced from 450px for faster CTA visibility */
}

.hero-title {
    font-size: 28px; /* slightly smaller for small screens */
}

.hero-subtitle {
    margin-bottom: 1.5rem; /* tighter spacing to CTA */
}
```

**Step 4: Add video loading optimization**

In `src/pages/Home.jsx`, update the hero video element:
```jsx
<video className="hero-video" autoPlay muted loop playsInline preload="metadata">
```

**Step 5: Commit**
```bash
git add src/index.css src/components/Navbar.css src/pages/Home.css src/pages/Home.jsx
git commit -m "feat: improve mobile UX with touch targets, hero optimization, video preload"
```

---

### Task 20: Add prefers-reduced-motion support and final polish

**Files:**
- Modify: `src/index.css` — add reduced-motion media query for all animations

**Step 1: Add comprehensive reduced-motion support**

In `src/index.css`, add at the end:
```css
/* ===== Reduced Motion ===== */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

**Step 2: Verify full build**

Run: `npm run build`
Expected: Build completes with no errors.

**Step 3: Commit**
```bash
git add src/index.css
git commit -m "feat: add prefers-reduced-motion support for accessibility"
```

---

### Task 21: Final verification and cleanup

**Step 1: Run dev server and verify all pages load**

Run: `npm run dev`
Visit: `/`, `/about`, `/services`, `/portfolio`, `/blog`, `/contact`
Verify: No console errors, all images load, modal works from all pages.

**Step 2: Verify build succeeds**

Run: `npm run build`
Expected: Clean build with no warnings or errors.

**Step 3: Validate structured data**

Copy the contents of `index.html`'s script tags and validate at https://search.google.com/structured-data/testing-tool or https://validator.schema.org.

**Step 4: Final commit**
```bash
git add -A
git commit -m "chore: final cleanup and verification after landing page enhancement"
```

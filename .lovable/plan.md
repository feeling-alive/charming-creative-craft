

# Plan: Perfect Replica with Glassmorphism Style

## What We're Building
A pixel-perfect recreation of the Framer portfolio site (daring-united-034842.framer.app) with:
- **Glassmorphism (iPhone glass)** style throughout — frosted glass cards, translucent backgrounds, subtle borders with glow
- **All original images** pulled from the Framer CDN as fallbacks
- **Text personalized** for you as a web developer (per your guide)
- **All animations** matching the original: scroll reveals, hover effects, marquee, staggered card entries

## Structure (matching original site sections top to bottom)

### 1. Global Style Overhaul — Glassmorphism Theme
- Update `index.css` with glass utility classes: `.glass-card` (backdrop-blur-xl, bg-white/5, border white/10), `.glass-pill`
- Add subtle glow/gradient accents for depth
- Keep dark background but make cards feel like frosted glass panels

### 2. Navbar
- Glass navbar with `backdrop-blur-2xl bg-white/5 border-b border-white/10`
- Logo: "dev." (keep current)
- Links: Services, Projects, About, Contact (no "Get Template", no "Testimonials")

### 3. Hero Section
- Keep smoke background image
- Tag: "Available for Freelance Work" with green dot
- Heading: "Web Development & Design"
- Subtitle: your developer description
- Buttons: "View Projects" + "Contact Me"
- Scroll indicator: "Scroll down — mouse icon — to see projects" (matching original horizontal layout)
- Brand logos marquee below (use original SVG logos from Framer CDN)
- Bottom marquee: "WEB DEVELOPER · DESIGNER · AVAILABLE FOR HIRE ·"

### 4. Projects Section — Bento Grid
- Recreate the original's **mixed-size bento grid** layout (not uniform 2x2)
- Use original project images from Framer CDN
- Each card: glass overlay on hover, "View Casestudy" text + arrow
- Profile photo card mixed in (like original)
- "All Projects" + "Book a Free Call" buttons below

### 5. About Section
- Two-column: photo left, content right
- Glass card for skills tags
- Experience timeline with glass dividers
- Text personalized per guide (web developer, VyatGU, freelance)

### 6. Recent Works — Horizontal Scroll Gallery
- Add new component matching original's horizontal scrolling project gallery
- Glass card overlays

### 7. Process Section
- Left: tag + heading + process image
- Right: 3 numbered steps with glass dividers
- Keep current structure, add glass styling

### 8. Services Section
- Left column: service list as glass pills + CTA buttons
- Right column: large image + 4 service description glass cards
- Bottom: two-row tag marquee (Slide Decks, Copywriting, Brand Graphics, etc.)

### 9. Stats Bar (NEW)
- "180+ projects" / "96% satisfaction" / "15+ years" — glass cards in a row

### 10. FAQ Section
- Two-column: left has image + tags + CTA, right has accordion
- Glass-styled accordion items

### 11. Contact/Footer
- "Write to Me" button → Telegram link
- "Email Me" button
- Minimal glass footer

## Technical Details
- **Images**: Download original Framer images to `src/assets/` or reference CDN URLs directly
- **Glassmorphism**: Consistent `backdrop-blur-xl bg-white/[0.03-0.08] border border-white/[0.08-0.15]` pattern
- **Animations**: framer-motion for scroll reveals (existing hook), staggered entries, hover scale/lift effects, CSS marquee for tag strips
- **New components**: `LogoMarquee`, `RecentWorks`, `StatsBar` — plus restructured `ServicesSection` and `FAQSection`
- **All 11 files** will be created/modified

## Files to Create/Modify
1. `src/index.css` — glass utility classes
2. `src/components/Navbar.tsx` — glass style
3. `src/components/HeroSection.tsx` — full rebuild with logos + scroll indicator
4. `src/components/ProjectsSection.tsx` — bento grid layout
5. `src/components/AboutSection.tsx` — glass cards
6. `src/components/RecentWorks.tsx` — NEW horizontal gallery
7. `src/components/ProcessSection.tsx` — glass style
8. `src/components/ServicesSection.tsx` — full rebuild with 2-column + marquee
9. `src/components/StatsBar.tsx` — NEW stats section
10. `src/components/FAQSection.tsx` — 2-column with image
11. `src/components/ContactSection.tsx` — glass style
12. `src/components/Footer.tsx` — minimal update
13. `src/pages/Index.tsx` — add new sections


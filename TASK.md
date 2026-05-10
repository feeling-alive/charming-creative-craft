# Portfolio Restructure Task

## Overview
Restructure the portfolio site. Remove unused sections, fix order, update ProjectsSection with modal popups, fix contacts, expand ProcessSection.

---

## 1. Update `src/pages/Index.tsx` — New Section Order

Remove: `AboutSection`, `RecentWorks`, `ServicesSection`, `StatsBar`

New order must be exactly:
```
Navbar
HeroSection
ProjectsSection
ProcessSection
TestimonialsSection
FAQSection
ContactSection
Footer
```

---

## 2. Rewrite `src/components/ProjectsSection.tsx`

### Goal
9 project cards in a 3×3 grid. Each card on click opens a modal.

### Card design
- Show: project thumbnail image (use a placeholder or solid color bg for now)
- On hover: slight scale up + show overlay with project title
- On click: open modal

### Modal design (full screen overlay or large centered modal)
Layout:
- **Left side (60%):** `<img>` tag showing a GIF of the site (use `project.gif` field — placeholder for now, will be replaced later)
- **Right side (40%):**
  - Project title (large, bold)
  - Tags row: tech stack used (e.g. "React", "Tailwind", "Framer Motion")
  - Description: 3–5 sentences about what was built and how
  - Bottom right corner: button "Visit Site →" linking to `project.url`
- Close button top-right corner (×)
- Close on backdrop click

### Projects data
Create a `projects` array with 9 items. For now all are placeholders — use this structure:
```ts
const projects = [
  {
    id: 1,
    title: "Project Name",
    tags: ["React", "Tailwind", "Framer Motion"],
    description: "Description of what was built and how. What problem it solves. What makes it special.",
    gif: "/gifs/project-1.gif", // placeholder, will be replaced
    url: "https://your-project.vercel.app", // placeholder, will be replaced
    thumbnail: "/thumbnails/project-1.jpg" // placeholder
  },
  // repeat for 2–9
]
```

Fill all 9 with placeholder data so the UI is complete and functional.

---

## 3. Expand `src/components/ProcessSection.tsx`

### Goal
Detailed step-by-step breakdown of the work process. Clients should understand exactly what happens from first message to delivery.

### New structure — 6 detailed steps (not 4):

**Step 1 — Discovery & Brief**
We discuss your goals, target audience, references, timeline and budget. I ask questions to fully understand what you need. Duration: 1 call or chat, 30–60 min.

**Step 2 — Proposal & Agreement**
I send a detailed proposal: scope of work, timeline, price, payment terms. We sign a simple agreement (even in chat). Prepayment: 50% before start.

**Step 3 — Design Concept**
I create wireframes and visual mockups. You see the look before a single line of code is written. 1–2 revision rounds included. Approval required before development.

**Step 4 — Development**
Clean, structured code. React + TypeScript + Tailwind. Smooth animations, pixel-perfect layout, mobile responsive. You can track progress via shared link.

**Step 5 — Testing & Review**
Full cross-browser and mobile testing. You get a preview link to review everything. Feedback round — I fix what's needed.

**Step 6 — Launch & Handoff**
Deploy to your domain or Vercel. I hand over all files, credentials, and a short guide. 7-day support after launch for any fixes.

### Design
- Large numbered steps (01, 02 ... 06)
- Each step: number + title (bold) + detailed description (3–5 sentences)
- Alternating layout or vertical timeline style
- Keep existing animations (scroll reveal, fade in)

---

## 4. Update `src/components/FAQSection.tsx`

Replace the static orange photo (`<img>` on the left side) with the existing Lottie animation from `src/assets/Coding.json`.

Install if not present: `npm install lottie-react`

Import and use:
```tsx
import Lottie from "lottie-react";
import codingAnimation from "@/assets/Coding.json";

// Replace the <img> with:
<Lottie animationData={codingAnimation} loop={true} className="w-full h-full" />
```

Keep all FAQ questions and answers as-is.

---

## 5. Update `src/components/ContactSection.tsx`

Replace placeholder contacts with real ones:
- Email: `nikasq2005@gmail.com` — clicking opens `mailto:nikasq2005@gmail.com`
- Telegram: `https://t.me/UXUI00X` — clicking opens Telegram chat directly
- Both buttons/links must be clearly visible and functional
- Remove any fake/example contact data

---

## 6. Update `src/components/HeroSection.tsx`

Remove the stats block if it exists inside HeroSection (50+ projects, 3+ years, 100% satisfaction). These numbers are not accurate and should be removed entirely.

---

## 7. Delete unused files

These components are no longer used. Remove their imports from Index.tsx (already done in step 1) but DO NOT delete the files — just leave them unused for now.

- `AboutSection.tsx`
- `RecentWorks.tsx`  
- `ServicesSection.tsx`
- `StatsBar.tsx`

---

## 8. Final check

After all changes:
- Run `npm run build` — must complete with 0 errors
- All 9 project cards must be clickable and open modals
- Modal must close on × click and backdrop click
- Process section must show all 6 steps
- FAQSection must show Lottie animation (no orange photo)
- Contact email must be `nikasq2005@gmail.com`

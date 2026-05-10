# FIXES 2 — 3 точных исправления

---

## FIX 1 — ProjectsSection.tsx — ПОЛНАЯ ЗАМЕНА ФАЙЛА

Замени ВЕСЬ файл `src/components/ProjectsSection.tsx` на код ниже.
Это оригинальный grid из первого коммита + добавлена модалка по клику.

```tsx
import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import React from "react"

const projects = [
  {
    id: 0,
    title: "Landing Page",
    tags: ["React", "Tailwind", "Framer Motion"],
    description: "A modern landing page with smooth scroll animations, hero section and conversion-focused layout. Built with performance and mobile-first design in mind.",
    gif: "https://framerusercontent.com/images/GkhJfmw17Q5eehve51WR25Ijjnk.png",
    url: "https://your-project-1.vercel.app",
    img: "https://framerusercontent.com/images/GkhJfmw17Q5eehve51WR25Ijjnk.png"
  },
  {
    id: 1,
    title: "Booking Site",
    tags: ["React", "Node.js", "PostgreSQL"],
    description: "Online booking system with calendar integration, automated confirmations and admin dashboard. Clean UI that guides users through the booking flow effortlessly.",
    gif: "https://framerusercontent.com/images/RYRvZnstUexQMOl8zRyrvDfDT0.png",
    url: "https://your-project-2.vercel.app",
    img: "https://framerusercontent.com/images/RYRvZnstUexQMOl8zRyrvDfDT0.png"
  },
  {
    id: 2,
    title: "SaaS App",
    tags: ["React", "TypeScript", "REST API"],
    description: "Full-featured SaaS dashboard with user authentication, subscription management and analytics. Pixel-perfect responsive design with dark mode support.",
    gif: "https://framerusercontent.com/images/MM7F7DNjn9gGQjHqbiowegENsRY.png",
    url: "https://your-project-3.vercel.app",
    img: "https://framerusercontent.com/images/MM7F7DNjn9gGQjHqbiowegENsRY.png"
  },
  {
    id: 3,
    title: "Dashboard",
    tags: ["React", "Recharts", "Tailwind"],
    description: "Data visualization dashboard with real-time charts, filterable tables and export functionality. Optimized for large datasets with smooth rendering.",
    gif: "https://framerusercontent.com/images/bed888CTflXNK3KFX1R7VhRMtE.png",
    url: "https://your-project-4.vercel.app",
    img: "https://framerusercontent.com/images/bed888CTflXNK3KFX1R7VhRMtE.png"
  },
  {
    id: 4,
    title: "Web App",
    tags: ["Next.js", "TypeScript", "Prisma"],
    description: "Full-stack web application with server-side rendering, API routes and database integration. Fast load times and SEO-optimized from day one.",
    gif: "https://framerusercontent.com/images/jlIAaI4caPj3oVLaxetMd2RvY.png",
    url: "https://your-project-5.vercel.app",
    img: "https://framerusercontent.com/images/jlIAaI4caPj3oVLaxetMd2RvY.png"
  },
  {
    id: 5,
    title: "E-Commerce",
    tags: ["React", "Node.js", "Stripe"],
    description: "Online store with product catalog, cart, checkout and payment integration via Stripe. Mobile-optimized with fast image loading and smooth UX.",
    gif: "https://framerusercontent.com/images/En1SV0rP485Zf5WOrpnHl3Nz658.png",
    url: "https://your-project-6.vercel.app",
    img: "https://framerusercontent.com/images/En1SV0rP485Zf5WOrpnHl3Nz658.png"
  },
  {
    id: 6,
    title: "Portfolio",
    tags: ["React", "Framer Motion", "Three.js"],
    description: "Creative portfolio site with 3D shader background, scroll-triggered animations and interactive project showcases. Designed to impress and convert.",
    gif: "https://framerusercontent.com/images/W7bXB4tsou7l5mHYU8sze3sBeg.png",
    url: "https://your-project-7.vercel.app",
    img: "https://framerusercontent.com/images/W7bXB4tsou7l5mHYU8sze3sBeg.png"
  },
  {
    id: 7,
    title: "Mobile App",
    tags: ["React Native", "Expo", "Firebase"],
    description: "Cross-platform mobile application with real-time data sync, push notifications and offline support. Published on both App Store and Google Play.",
    gif: "https://framerusercontent.com/images/QqqmFNIdzb0HbOiMSHvqZXkwT7w.png",
    url: "https://your-project-8.vercel.app",
    img: "https://framerusercontent.com/images/QqqmFNIdzb0HbOiMSHvqZXkwT7w.png"
  },
  {
    id: 8,
    title: "Brand Site",
    tags: ["React", "GSAP", "Tailwind"],
    description: "Brand website with immersive scroll experience, animated sections and storytelling layout. Crafted to elevate brand perception and drive engagement.",
    gif: "https://framerusercontent.com/images/fsFDlU7CKq0E96MXMN9fUXrNw.png",
    url: "https://your-project-9.vercel.app",
    img: "https://framerusercontent.com/images/fsFDlU7CKq0E96MXMN9fUXrNw.png"
  },
]

function ProjectModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "24px"
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "#111",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 16,
            width: "100%",
            maxWidth: 1000,
            maxHeight: "90vh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column"
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 28px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <h2 style={{ color: "white", fontSize: 22, fontWeight: 600, margin: 0 }}>{project.title}</h2>
            <button
              onClick={onClose}
              style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "white", width: 36, height: 36, borderRadius: "50%", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}
            >×</button>
          </div>

          {/* Body */}
          <div style={{ display: "flex", flex: 1, overflow: "hidden", flexDirection: "row" }}>
            {/* Left — image/GIF (60%) */}
            <div style={{ flex: "0 0 60%", background: "#0a0a0a", overflow: "hidden" }}>
              <img
                src={project.gif}
                alt={project.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Right — info (40%) */}
            <div style={{ flex: "0 0 40%", padding: "28px", display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "auto" }}>
              <div>
                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                  {project.tags.map((tag) => (
                    <span key={tag} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)", fontSize: 12, padding: "4px 12px", borderRadius: 999 }}>
                      {tag}
                    </span>
                  ))}
                </div>
                {/* Description */}
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.7, margin: 0 }}>
                  {project.description}
                </p>
              </div>

              {/* Visit Site button */}
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "white", color: "black",
                  padding: "12px 24px", borderRadius: 999,
                  fontWeight: 600, fontSize: 14, textDecoration: "none",
                  alignSelf: "flex-end",
                  transition: "opacity 0.2s ease"
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                Visit Site ↗
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function ProjectsSection() {
  const ref = useRef(null)
  const isVisible = useInView(ref, { once: true, margin: "-80px" })
  const [closestIndex, setClosestIndex] = useState<number | null>(null)
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const updateClosest = () => {
      const container = ref.current
      if (!container) return
      const containerRect = (container as HTMLElement).getBoundingClientRect()
      const containerCenterX = containerRect.left + containerRect.width / 2
      let closestIdx: number | null = null
      let minDistance = Infinity
      cardsRef.current.forEach((card, idx) => {
        if (!card) return
        const cardRect = card.getBoundingClientRect()
        const cardCenterX = cardRect.left + cardRect.width / 2
        const distance = Math.abs(cardCenterX - containerCenterX)
        if (distance < minDistance) { minDistance = distance; closestIdx = idx }
      })
      setClosestIndex(closestIdx)
    }
    updateClosest()
    window.addEventListener("scroll", updateClosest, true)
    window.addEventListener("resize", updateClosest)
    window.addEventListener("mousemove", updateClosest)
    return () => {
      window.removeEventListener("scroll", updateClosest, true)
      window.removeEventListener("resize", updateClosest)
      window.removeEventListener("mousemove", updateClosest)
    }
  }, [])

  const getCardHeight = (index: number) => {
    if (typeof window !== "undefined" && window.innerWidth < 1200) return "350px"
    return closestIndex === index ? "550px" : "450px"
  }

  const cardStyle = (index: number, marginBottom?: number): React.CSSProperties => ({
    aspectRatio: index === 3 || index === 4 || index === 5 ? "544/510" : "454/425",
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
    cursor: "pointer",
    height: getCardHeight(index),
    willChange: "transform",
    ...(marginBottom ? { marginBottom } : {})
  })

  const imgStyle: React.CSSProperties = {
    width: "100%", height: "100%", objectFit: "cover",
    objectPosition: "center center",
    position: "absolute", top: 0, left: 0,
    filter: "grayscale(1) brightness(0.85)",
    transition: "filter 0.45s ease",
    display: "block"
  }

  const makeCard = (projectIndex: number, cardIndex: number, mb?: number) => (
    <motion.div
      ref={(el) => (cardsRef.current[cardIndex] = el)}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0, height: getCardHeight(cardIndex) } : {}}
      transition={{ duration: 0.6, delay: cardIndex * 0.07, height: { duration: 0.45, ease: "easeInOut" } }}
      style={cardStyle(cardIndex, mb)}
      className="group"
      onClick={() => setSelectedProject(projects[projectIndex])}
    >
      <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <img
          src={projects[projectIndex].img}
          alt={projects[projectIndex].title}
          style={imgStyle}
          className="group-hover:brightness-100 group-hover:grayscale-0"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs tracking-widest uppercase rounded-full border border-white/30">
          View Project ↗
        </button>
      </div>
    </motion.div>
  )

  return (
    <section id="projects" className="section-padding-lg" ref={ref}>
      <div className="section-container">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-muted-foreground text-xs tracking-widest uppercase mb-4"
          >02 /</motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-semibold text-foreground"
          >What I build</motion.h2>
        </div>

        {/* Bento Grid — ORIGINAL LAYOUT */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", maxWidth: 1400, margin: "0 auto 4rem", width: "100%" }}>
          {/* Left column */}
          <div style={{ display: "flex", flexDirection: "column", flex: 1.2, justifyContent: "center" }}>
            {makeCard(0, 0, 8)}
            {makeCard(1, 1, 8)}
            {makeCard(2, 2)}
          </div>
          {/* Center column */}
          <div style={{ display: "flex", flexDirection: "column", flex: 1.8, gap: 8, margin: "0 8px" }}>
            {makeCard(3, 3)}
            {makeCard(4, 4)}
            {makeCard(5, 5)}
          </div>
          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", flex: 1.2, justifyContent: "center" }}>
            {makeCard(6, 6, 8)}
            {makeCard(7, 7, 8)}
            {makeCard(8, 8)}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-4"
        >
          <a href="#projects" className="backdrop-blur-md bg-white/15 border border-white/30 text-white rounded-full px-7 py-3 text-sm font-medium hover:bg-white/25 transition-all duration-300">
            All Projects
          </a>
          <a href="#contact" className="backdrop-blur-md bg-white/5 border border-white/20 text-white/80 rounded-full px-7 py-3 text-sm font-medium hover:bg-white/15 hover:border-white/30 transition-all duration-300">
            Get in Touch
          </a>
        </motion.div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  )
}

export default React.memo(ProjectsSection)
```

---

## FIX 2 — ProcessSection.tsx — Sliding window 4 шага

Верни оригинальную структуру carousel (фото слева, шаги справа, стрелки + dots).
НО добавь sliding window: показывать только 4 шага одновременно в окне.

Когда active переходит за пределы видимого окна — список плавно сдвигается:
- Используй `windowStart` state (начальный индекс видимого окна)
- При переходе на step 5 (index 4): windowStart становится 1, первый шаг уезжает вверх
- При переходе на step 6 (index 5): windowStart становится 2

Анимация сдвига: `motion.div` со списком шагов, при изменении `windowStart` применяй `animate={{ y: windowStart * -itemHeight }}` с `transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}`.

Высота одного шага (itemHeight): ~120px — замерь и используй это значение.

Данные steps — оставь 6 шагов из текущего файла (они уже правильные).

---

## FIX 3 — FAQSection.tsx — Lottie из Coding.json

ВАЖНО: файл `src/assets/Coding.json` существует (подтверждено пользователем).

Шаг 1 — установить пакет:
```bash
npm install lottie-react
```

Шаг 2 — в FAQSection.tsx добавить импорты вверху файла:
```tsx
import Lottie from "lottie-react"
import codingAnimation from "@/assets/Coding.json"
```

Шаг 3 — найти в JSX место где сейчас стоит любое изображение или SVG-иллюстрация слева.
Заменить его ПОЛНОСТЬЮ на:
```tsx
<div style={{ width: "100%", height: "100%", minHeight: 300, borderRadius: 12, overflow: "hidden" }}>
  <Lottie
    animationData={codingAnimation}
    loop={true}
    style={{ width: "100%", height: "100%" }}
  />
</div>
```

Шаг 4 — если TypeScript ругается на импорт JSON, добавить в `tsconfig.json` в compilerOptions:
```json
"resolveJsonModule": true
```

---

## После всех правок

```bash
npm run build
```
Должно быть 0 ошибок и 0 type errors.

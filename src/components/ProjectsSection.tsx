import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ArrowUpRight } from "lucide-react"
import React from "react"

const projects = [
  { title: "Landing Page",    url: "https://your-project-1.vercel.app", img: "https://framerusercontent.com/images/GkhJfmw17Q5eehve51WR25Ijjnk.png" },
  { title: "Web App",         url: "https://your-project-2.vercel.app", img: "https://framerusercontent.com/images/En1SV0rP485Zf5WOrpnHl3Nz658.png" },
  { title: "Dashboard",       url: "https://your-project-3.vercel.app", img: "https://framerusercontent.com/images/bed888CTflXNK3KFX1R7VhRMtE.png" },
  { title: "E-Commerce",      url: "https://your-project-4.vercel.app", img: "https://framerusercontent.com/images/QqqmFNIdzb0HbOiMSHvqZXkwT7w.png" },
  { title: "Booking Site",    url: "https://your-project-5.vercel.app", img: "https://framerusercontent.com/images/RYRvZnstUexQMOl8zRyrvDfDT0.png" },
  { title: "SaaS App",        url: "https://your-project-6.vercel.app", img: "https://framerusercontent.com/images/MM7F7DNjn9gGQjHqbiowegENsRY.png" },
  { title: "Portfolio",       url: "https://your-project-7.vercel.app", img: "https://framerusercontent.com/images/W7bXB4tsou7l5mHYU8sze3sBeg.png" },
  { title: "Mobile App",      url: "https://your-project-8.vercel.app", img: "https://framerusercontent.com/images/GkhJfmw17Q5eehve51WR25Ijjnk.png" },
  { title: "Brand Site",      url: "https://your-project-9.vercel.app", img: "https://framerusercontent.com/images/En1SV0rP485Zf5WOrpnHl3Nz658.png" },
]

function ProjectsSection() {
  const ref = useRef(null)
  const isVisible = useInView(ref, { once: true, margin: "-80px" })
  const [closestIndex, setClosestIndex] = useState<number | null>(null)
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

        if (distance < minDistance) {
          minDistance = distance
          closestIdx = idx
        }
      })

      setClosestIndex(closestIdx)
    }

    updateClosest()

    const handleUpdate = () => {
      updateClosest()
    }

    window.addEventListener("scroll", handleUpdate, true)
    window.addEventListener("resize", handleUpdate)
    window.addEventListener("mousemove", handleUpdate)

    return () => {
      window.removeEventListener("scroll", handleUpdate, true)
      window.removeEventListener("resize", handleUpdate)
      window.removeEventListener("mousemove", handleUpdate)
    }
  }, [])

  const getCardHeight = (index: number) => {
    if (typeof window !== 'undefined' && window.innerWidth < 1200) {
      return "350px"
    }
    return closestIndex === index ? "550px" : "450px"
  }

  return (
    <section id="projects" className="section-padding-lg" ref={ref}>
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-muted-foreground text-xs tracking-widest uppercase mb-4"
          >
            03 /
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-semibold text-foreground"
          >
            What I build
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <div className="mb-16 projects-grid" style={{ display: "flex", justifyContent: "center", alignItems: "center", maxWidth: "1400px", margin: "0 auto 4rem", width: "100%" }}>
          {/* Left column - side cards */}
          <div style={{ display: "flex", flexDirection: "column", flex: 1.2, justifyContent: "center" }} className="side-column">
            <motion.div
              ref={(el) => (cardsRef.current[0] = el)}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0, height: getCardHeight(0) } : {}}
              transition={{ duration: 0.6, delay: 0 * 0.07, height: { duration: 0.45, ease: "easeInOut" } }}
              style={{ aspectRatio: "454/425", borderRadius: 8, overflow: "hidden", position: "relative", cursor: "pointer", marginBottom: 8, height: getCardHeight(0), willChange: "transform" }}
              className="group side-card"
            >
              <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                <img
                  src="https://framerusercontent.com/images/GkhJfmw17Q5eehve51WR25Ijjnk.png"
                  alt="Project"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center", position: "absolute", top: 0, left: 0, filter: "grayscale(1) brightness(0.85)", transition: "filter 0.45s ease", display: "block" }}
                  className="group-hover:filter-none side-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs tracking-widest uppercase rounded-full border border-white/30">
                  View Casestudy ↗
                </button>
              </div>
            </motion.div>
            <motion.div
              ref={(el) => (cardsRef.current[1] = el)}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0, height: getCardHeight(1) } : {}}
              transition={{ duration: 0.6, delay: 3 * 0.07, height: { duration: 0.45, ease: "easeInOut" } }}
              style={{ aspectRatio: "454/425", borderRadius: 8, overflow: "hidden", position: "relative", cursor: "pointer", marginBottom: 8, height: getCardHeight(1), willChange: "transform" }}
              className="group side-card"
            >
              <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                <img
                  src="https://framerusercontent.com/images/RYRvZnstUexQMOl8zRyrvDfDT0.png"
                  alt="Project"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center", position: "absolute", top: 0, left: 0, filter: "grayscale(1) brightness(0.85)", transition: "filter 0.45s ease", display: "block" }}
                  className="group-hover:filter-none side-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs tracking-widest uppercase rounded-full border border-white/30">
                  View Casestudy ↗
                </button>
              </div>
            </motion.div>
            <motion.div
              ref={(el) => (cardsRef.current[2] = el)}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0, height: getCardHeight(2) } : {}}
              transition={{ duration: 0.6, delay: 6 * 0.07, height: { duration: 0.45, ease: "easeInOut" } }}
              style={{ aspectRatio: "454/425", borderRadius: 8, overflow: "hidden", position: "relative", cursor: "pointer", height: getCardHeight(2), willChange: "transform" }}
              className="group side-card"
            >
              <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                <img
                  src="https://framerusercontent.com/images/MM7F7DNjn9gGQjHqbiowegENsRY.png"
                  alt="Project"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center", position: "absolute", top: 0, left: 0, filter: "grayscale(1) brightness(0.85)", transition: "filter 0.45s ease", display: "block" }}
                  className="group-hover:filter-none"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs tracking-widest uppercase rounded-full border border-white/30">
                  View Casestudy ↗
                </button>
              </div>
            </motion.div>
          </div>

          {/* Center column - large cards */}
          <div style={{ display: "flex", flexDirection: "column", flex: 1.8, gap: "8px", margin: "0 8px" }} className="center-card">

            <motion.div
              ref={(el) => (cardsRef.current[3] = el)}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0, height: getCardHeight(3) } : {}}
              transition={{ duration: 0.6, delay: 1 * 0.07, height: { duration: 0.45, ease: "easeInOut" } }}
              style={{ aspectRatio: "544/510", borderRadius: 8, overflow: "hidden", position: "relative", cursor: "pointer", height: getCardHeight(3), willChange: "transform" }}
              className="group center-card"
            >
              <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                <img
                  src="https://framerusercontent.com/images/bed888CTflXNK3KFX1R7VhRMtE.png"
                  alt="Project"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center", position: "absolute", top: 0, left: 0, filter: "grayscale(1) brightness(0.85)", transition: "filter 0.45s ease", display: "block" }}
                  className="group-hover:filter-none"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs tracking-widest uppercase rounded-full border border-white/30">
                  View Casestudy ↗
                </button>
              </div>
            </motion.div>
            <motion.div
              ref={(el) => (cardsRef.current[4] = el)}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0, height: getCardHeight(4) } : {}}
              transition={{ duration: 0.6, delay: 4 * 0.07, height: { duration: 0.45, ease: "easeInOut" } }}
              style={{ aspectRatio: "544/510", borderRadius: 8, overflow: "hidden", position: "relative", cursor: "pointer", height: getCardHeight(4), willChange: "transform" }}
              className="group center-card"
            >
              <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                <img
                  src="https://framerusercontent.com/images/jlIAaI4caPj3oVLaxetMd2RvY.png"
                  alt="Project"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center", position: "absolute", top: 0, left: 0, filter: "grayscale(1) brightness(0.85)", transition: "filter 0.45s ease", display: "block" }}
                  className="group-hover:filter-none"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs tracking-widest uppercase rounded-full border border-white/30">
                  View Casestudy ↗
                </button>
              </div>
            </motion.div>
            <motion.div
              ref={(el) => (cardsRef.current[5] = el)}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0, height: getCardHeight(5) } : {}}
              transition={{ duration: 0.6, delay: 7 * 0.07, height: { duration: 0.45, ease: "easeInOut" } }}
              style={{ aspectRatio: "544/510", borderRadius: 8, overflow: "hidden", position: "relative", cursor: "pointer", height: getCardHeight(5), willChange: "transform" }}
              className="group center-card"
            >
              <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                <img
                  src="https://framerusercontent.com/images/En1SV0rP485Zf5WOrpnHl3Nz658.png"
                  alt="Project"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center", position: "absolute", top: 0, left: 0, filter: "grayscale(1) brightness(0.85)", transition: "filter 0.45s ease", display: "block" }}
                  className="group-hover:filter-none"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs tracking-widest uppercase rounded-full border border-white/30">
                  View Casestudy ↗
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right column - side cards */}
          <div style={{ display: "flex", flexDirection: "column", flex: 1.2, justifyContent: "center" }} className="side-column">
            <motion.div
              ref={(el) => (cardsRef.current[6] = el)}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0, height: getCardHeight(6) } : {}}
              transition={{ duration: 0.6, delay: 2 * 0.07, height: { duration: 0.45, ease: "easeInOut" } }}
              style={{ aspectRatio: "454/425", borderRadius: 8, overflow: "hidden", position: "relative", cursor: "pointer", marginBottom: 8, height: getCardHeight(6), willChange: "transform" }}
              className="group side-card"
            >
              <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                <img
                  src="https://framerusercontent.com/images/W7bXB4tsou7l5mHYU8sze3sBeg.png"
                  alt="Project"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center", position: "absolute", top: 0, left: 0, filter: "grayscale(1) brightness(0.85)", transition: "filter 0.45s ease", display: "block" }}
                  className="group-hover:filter-none"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs tracking-widest uppercase rounded-full border border-white/30">
                  View Casestudy ↗
                </button>
              </div>
            </motion.div>
            <motion.div
              ref={(el) => (cardsRef.current[7] = el)}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0, height: getCardHeight(7) } : {}}
              transition={{ duration: 0.6, delay: 5 * 0.07, height: { duration: 0.45, ease: "easeInOut" } }}
              style={{ aspectRatio: "454/425", borderRadius: 8, overflow: "hidden", position: "relative", cursor: "pointer", marginBottom: 8, height: getCardHeight(7), willChange: "transform" }}
              className="group side-card"
            >
              <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                <img
                  src="https://framerusercontent.com/images/QqqmFNIdzb0HbOiMSHvqZXkwT7w.png"
                  alt="Project"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center", position: "absolute", top: 0, left: 0, filter: "grayscale(1) brightness(0.85)", transition: "filter 0.45s ease", display: "block" }}
                  className="group-hover:filter-none"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs tracking-widest uppercase rounded-full border border-white/30">
                  View Casestudy ↗
                </button>
              </div>
            </motion.div>
            <motion.div
              ref={(el) => (cardsRef.current[8] = el)}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0, height: getCardHeight(8) } : {}}
              transition={{ duration: 0.6, delay: 8 * 0.07, height: { duration: 0.45, ease: "easeInOut" } }}
              style={{ aspectRatio: "454/425", borderRadius: 8, overflow: "hidden", position: "relative", cursor: "pointer", height: getCardHeight(8), willChange: "transform" }}
              className="group side-card"
            >
              <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                <img
                  src="https://framerusercontent.com/images/fsFDlU7CKq0E96MXMN9fUXrNw.png"
                  alt="Project"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center", position: "absolute", top: 0, left: 0, filter: "grayscale(1) brightness(0.85)", transition: "filter 0.45s ease", display: "block" }}
                  className="group-hover:filter-none"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs tracking-widest uppercase rounded-full border border-white/30">
                  View Casestudy ↗
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Buttons below grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="backdrop-blur-md bg-white/15 border border-white/30 text-white rounded-full px-7 py-3 text-sm font-medium hover:bg-white/25 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
          >
            All Projects
          </a>
          <a
            href="#contact"
            className="backdrop-blur-md bg-white/5 border border-white/20 text-white/80 rounded-full px-7 py-3 text-sm font-medium hover:bg-white/15 hover:border-white/30 transition-all duration-300"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default React.memo(ProjectsSection)
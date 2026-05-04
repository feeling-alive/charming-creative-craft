import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";

const images = [
  { src: "https://framerusercontent.com/images/bed888CTflXNK3KFX1R7VhRMtE.png?width=933&height=1200", alt: "Package Design" },
  { src: "https://framerusercontent.com/images/JGI1jOpxUUfW0IRfPmx7eMGhc.png?width=686&height=1200", alt: "Brand Identity" },
  { src: "https://framerusercontent.com/images/fsFDlU7CKq0E96MXMN9fUXrNw.png?width=1200&height=801", alt: "Web Design" },
  { src: "https://framerusercontent.com/images/jlIAaI4caPj3oVLaxetMd2RvY.png?width=800&height=1200", alt: "Mobile App" },
  { src: "https://framerusercontent.com/images/RYRvZnstUexQMOl8zRyrvDfDT0.png?width=800&height=1200", alt: "Product Mockup" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function RecentWorks() {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [paused, setPaused] = useState(false);

  return (
    <section className="section-padding" ref={ref}>
      <div className="section-container mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0)" } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <span className="glass-pill-muted text-xs uppercase tracking-wider inline-block mb-4">Gallery</span>
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mt-2">
            Recent Works
          </h2>
        </motion.div>
      </div>

      {/* Horizontal scroll gallery */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.15, ease }}
      >
        <div style={{ overflow:"hidden", width:"100%", position:"relative" }}>
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            style={{
              display:"flex",
              gap:"12px",
              width:"max-content",
              animation:"galleryScroll 40s linear infinite",
              animationPlayState: paused ? "paused" : "running"
            }}
          >
            {[...images, ...images].map((img, i) => (
              <a
                key={i}
                href="#projects"
                onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior:'smooth' }) }}
                style={{ display:"block", flexShrink:0, width:"280px", height:"340px", borderRadius:"12px", overflow:"hidden", cursor:"pointer" }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center", transition:"transform 0.4s ease" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

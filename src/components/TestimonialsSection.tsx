import { motion } from "framer-motion"
import { useRef, useState } from "react"
import { useScrollReveal } from "@/hooks/useScrollReveal"

const testimonials = [
  { name:"Marcus Webb", role:"Product Lead @ Stripe", avatar:"https://i.pravatar.cc/80?img=11", stars:5, text:"Shipped our internal dashboard in under a week. The attention to animation detail was impressive — felt like a senior eng from day one." },
  { name:"Yuki Tanaka", role:"CTO @ Notion clone startup", avatar:"https://i.pravatar.cc/80?img=22", stars:5, text:"We needed a full SaaS frontend fast. Clean architecture, zero bugs in production. Rare to find this quality at this speed." },
  { name:"Lena Hoffmann", role:"Founder @ Berlin agency", avatar:"https://i.pravatar.cc/80?img=47", stars:5, text:"Our clients love the portfolio sites he builds. Every project looks premium and loads instantly. Booked him for 3 clients already." },
  { name:"Carlos Mendez", role:"E-commerce Director", avatar:"https://i.pravatar.cc/80?img=33", stars:5, text:"Redesigned our store UI and the conversion rate jumped 35% in the first month. The guy just knows what works." },
  { name:"Priya Sharma", role:"Head of Design @ fintech", avatar:"https://i.pravatar.cc/80?img=56", stars:5, text:"Handed off Figma files on Monday, had a pixel-perfect React build by Wednesday. Absolutely unreal turnaround." },
  { name:"Tom Eriksson", role:"Solo founder, SaaS tools", avatar:"https://i.pravatar.cc/80?img=15", stars:5, text:"Built my entire landing + onboarding flow. Smooth animations, fast load, and the code is actually readable. 10/10 would hire again." },
]

export default function TestimonialsSection() {
  const { ref, isVisible } = useScrollReveal(0.1)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [paused, setPaused] = useState(false)
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <section id="reviews" className="section-padding-lg" style={{ background: "hsl(var(--background))", overflow: "hidden" }} ref={ref}>
      <div className="section-container" style={{ width: "100%", overflow: "hidden" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="glass-pill-muted text-xs uppercase tracking-wider inline-block mb-4">Testimonials</span>
          <h2 className="text-3xl md:text-5xl font-display font-semibold text-foreground">
            What Clients Say
          </h2>
        </motion.div>

        <div style={{
          WebkitMaskImage:"linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          maskImage:"linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          width:"100%"
        }}>
          <div style={{ overflow:"hidden", width:"100%" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                width: "max-content",
                padding: "16px 0",
                animation: "marquee 40s linear infinite",
                animationPlayState: paused ? "paused" : "running"
              }}
            >
              {[...testimonials, ...testimonials].map((t, i) => (
                <div
                  key={i}
                  onMouseEnter={() => { setPaused(true); setExpanded(i); setHoveredIndex(i) }}
                  onMouseLeave={() => { setPaused(false); setExpanded(null); setHoveredIndex(null) }}
                  className="testimonial-card"
                  style={{
                    minWidth: "320px",
                    maxWidth: "320px",
                    minHeight: "220px",
                    overflow: "hidden",
                    padding: "32px",
                    background: "rgba(255,255,255,0.07)",
                    backdropFilter: "blur(24px) saturate(180%)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "24px",
                    boxShadow: "inset 0 1px 1px rgba(255,255,255,0.12), 0 8px 32px rgba(0,0,0,0.3)",
                    transition: "height 0.4s ease, transform 0.35s ease, filter 0.35s ease",
                    transform: hoveredIndex === i ? "scale(1.06)" : "scale(1)",
                    filter: hoveredIndex !== null && hoveredIndex !== i ? "blur(2px) brightness(0.6)" : "none",
                    zIndex: expanded === i ? 10 : 1,
                    position: "relative"
                  }}
                >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-14 h-14 rounded-full ring-2 ring-white/20"
                  />
                  <div>
                    <div className="text-[15px] font-bold text-white">{t.name}</div>
                    <div className="text-[12px] text-muted-foreground">{t.role}</div>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.stars)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-yellow-500" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-[16px] text-white/70 leading-[1.7]" style={{
                  maxHeight: expanded === i ? "200px" : "72px",
                  overflow: "hidden",
                  transition: "max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  lineHeight: "1.6",
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.7)",
                  position: "relative"
                }}>{expanded === i ? t.text.trim() : (t.text.trim().length > 100 ? t.text.trim().slice(0, 100) + '...' : t.text.trim() + '...')}</p>
                {expanded !== i && (
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "32px",
                    background: "linear-gradient(to bottom, transparent, rgba(30,30,30,0.95))",
                    pointerEvents: "none",
                    transition: "opacity 0.3s ease",
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}

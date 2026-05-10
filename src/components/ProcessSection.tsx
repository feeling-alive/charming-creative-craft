import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState, useEffect } from "react";

const steps = [
  {
    id: 1,
    title: "Discovery & Brief",
    desc: "We discuss your goals, target audience, references, timeline and budget. I ask detailed questions to fully understand what you need and what success looks like. This stage eliminates misunderstandings before a single line is written. Duration: 1 call or chat, 30–60 min.",
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80"
  },
  {
    id: 2,
    title: "Proposal & Agreement",
    desc: "I send a detailed proposal covering scope of work, timeline, price and payment terms. We agree on deliverables clearly so there are no surprises later. We sign a simple agreement — even via chat. Prepayment is 50% before work begins.",
    img: "https://images.unsplash.com/photo-1554774853-719586f82d77?w=600&q=80"
  },
  {
    id: 3,
    title: "Design Concept",
    desc: "I create wireframes and visual mockups so you see the look and feel before a single line of code is written. You approve the direction first — this saves time and avoids costly rework. Up to 2 revision rounds included. Your approval is required before development starts.",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80"
  },
  {
    id: 4,
    title: "Development",
    desc: "Clean structured code with React, TypeScript and Tailwind CSS. Smooth animations, pixel-perfect layout and full mobile responsiveness are standard. You can track progress at any time via a shared preview link. Updates at every major milestone.",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80"
  },
  {
    id: 5,
    title: "Testing & Review",
    desc: "Full cross-browser and cross-device testing before anything goes live. You get a preview link to review everything at your own pace. I fix whatever is needed — no arguing, no extra charges for agreed scope. Quality is the standard, not the exception.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"
  },
  {
    id: 6,
    title: "Launch & Handoff",
    desc: "Deployment to your domain or Vercel with zero downtime. I hand over all files, credentials and a short guide. Post-launch support included for 7 days — any issues after going live are fixed at no additional cost.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80"
  },
];

const WINDOW_SIZE = 4;
const ITEM_HEIGHT = 120;
const ease = [0.16, 1, 0.3, 1] as const;

export default function ProcessSection() {
  const { ref, isVisible } = useScrollReveal(0.15);
  const [active, setActive] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [windowStart, setWindowStart] = useState(0);

  const goTo = (idx: number) => {
    setIsBlinking(true);
    setWindowStart((prev) => {
      if (idx >= prev + WINDOW_SIZE) return idx - WINDOW_SIZE + 1;
      if (idx < prev) return idx;
      return prev;
    });
    setTimeout(() => { setIsBlinking(false); setActive(idx); }, 600);
  };

  useEffect(() => {
    const t = setInterval(() => goTo((active + 1) % 6), 4000);
    return () => clearInterval(t);
  }, [active]);

  return (
    <section id="process" className="section-padding-lg" style={{ overflowX: "hidden" }} ref={ref}>
      <style>{`
        @keyframes dotBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.15; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left — intro + image */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0)" } : {}}
              transition={{ duration: 0.7, ease }}
            >
              <div className="flex items-center gap-3 mb-4">
                <img src="https://framerusercontent.com/images/6tTbkXggWgQCAJ4DO2QEdXXmgM.svg" alt="" className="h-5 brightness-0 invert" />
                <img src="https://framerusercontent.com/images/11KSGbIZoRSg4pjdnUoif6MKHI.svg" alt="" className="h-5 brightness-0 invert" />
              </div>
              <span className="glass-pill-muted text-xs uppercase tracking-wider inline-block mb-4">Design process</span>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mt-2 mb-4">
                Process
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Crafting bold visuals that inspire and elevate brands with thought process.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25, ease }}
              style={{ overflow: "hidden", borderRadius: "12px" }}
            >
              <img
                key={active}
                src={steps[active].img}
                alt={steps[active].title}
                className="w-full h-48 lg:h-96 object-cover object-center"
                style={{ animation: "fadeIn 0.5s ease" }}
              />
            </motion.div>
          </div>

          {/* Right — Steps with sliding window */}
          <div style={{ overflow: "hidden", wordBreak: "break-word" }}>
            {/* Navigation: arrows + dots */}
            <div className="flex items-center gap-2 mb-8">
              <button onClick={() => goTo((active - 1 + 6) % 6)} className="w-9 h-9 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-white flex items-center justify-center transition-all">‹</button>
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  style={{
                    width: i === active ? 20 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: i === active ? "white" : "rgba(255,255,255,0.25)",
                    animation: i === active && isBlinking ? "dotBlink 0.3s ease-in-out 2" : "none",
                    transition: "all 0.3s ease"
                  }}
                />
              ))}
              <button onClick={() => goTo((active + 1) % 6)} className="w-9 h-9 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-white flex items-center justify-center transition-all">›</button>
            </div>

            {/* Fixed-height viewport — shows 4 steps at a time */}
            <div style={{ height: WINDOW_SIZE * ITEM_HEIGHT, overflow: "hidden" }}>
              <motion.div
                animate={{ y: windowStart * -ITEM_HEIGHT }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {steps.map((step, i) => (
                  <div
                    key={step.id}
                    style={{
                      height: ITEM_HEIGHT,
                      display: "flex",
                      alignItems: "center",
                      borderBottom: i < steps.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                      opacity: i === active ? 1 : 0.4,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <div className="flex items-start gap-6 w-full py-2">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium"
                        style={{
                          background: i === active ? "white" : "transparent",
                          color: i === active ? "black" : "white",
                          border: i === active ? "none" : "1px solid rgba(255,255,255,0.3)"
                        }}
                      >
                        {step.id}
                      </div>
                      <div className="overflow-hidden">
                        <h3 className="text-base font-display font-medium text-foreground mb-1 leading-snug">
                          {step.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed break-words overflow-hidden line-clamp-2">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

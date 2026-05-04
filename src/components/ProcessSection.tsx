import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState, useEffect } from "react";

const steps = [
  {id:1,title:"Discovery Call",desc:"We discuss your goals and timeline. Clear communication from day one.",img:"https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80"},
  {id:2,title:"Design & Planning",desc:"Wireframes and visual concepts approved by you before coding starts.",img:"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80"},
  {id:3,title:"Development",desc:"Clean code, smooth animations, pixel-perfect on all devices.",img:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80"},
  {id:4,title:"Launch & Handoff",desc:"Deployed, tested and handed off. Ready to impress from day one.",img:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"},
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function ProcessSection() {
  const { ref, isVisible } = useScrollReveal(0.15);
  const [active, setActive] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);

  const goTo = (idx: number) => {
    setIsBlinking(true);
    setTimeout(() => { setIsBlinking(false); setActive(idx); }, 600);
  };

  useEffect(() => {
    const t = setInterval(() => goTo((active + 1) % 4), 4000);
    return () => clearInterval(t);
  }, [active]);

  return (
    <section className="section-padding-lg" ref={ref}>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
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
              style={{overflow:"hidden",borderRadius:"12px"}}
            >
              <img
                key={active}
                src={steps[active].img}
                alt={steps[active].title}
                style={{width:"100%",height:"380px",objectFit:"cover",objectPosition:"center",animation:"fadeIn 0.5s ease"}}
              />
            </motion.div>
          </div>

          {/* Right — Steps */}
          <div className="space-y-0">
            <div className="flex items-center gap-2 mb-8">
              <button onClick={() => goTo((active - 1 + 4) % 4)} className="w-9 h-9 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-white flex items-center justify-center transition-all">‹</button>
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
              <button onClick={() => goTo((active + 1) % 4)} className="w-9 h-9 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-white flex items-center justify-center transition-all">›</button>
            </div>

            {steps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: 30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease }}
                className="py-8 border-b border-white/[0.06] first:pt-0 last:border-0"
                style={{
                  opacity: i === active ? 1 : 0.4,
                  transition: "opacity 0.3s ease"
                }}
              >
                <div className="flex items-start gap-6">
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
                  <div>
                    <h3 className="text-lg font-display font-medium text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

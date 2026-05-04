import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const servicePills = [
  "Web Development", "UI / UX Design", "Frontend Engineering",
  "Responsive Design", "Automation & Bots",
];

const serviceCards = [
  { title: "Web Development", desc: "Building fast, responsive websites with modern frameworks — from landing pages to complex web apps, ensuring every touchpoint reflects quality." },
  { title: "UI / UX Design", desc: "Clean interfaces that feel intuitive and look premium. Strategic design that drives engagement and converts visitors into users." },
  { title: "Frontend Engineering", desc: "React, Next.js, and TypeScript — production-grade code. Pixel-perfect implementation of any design with robust architecture." },
  { title: "Automation & Bots", desc: "Custom tools and bots to streamline your workflows — saving time and reducing manual work so you can focus on growth." },
];

const marqueeRow1 = ["Slide Decks", "Copywriting", "Brand Graphics", "Brand Migration", "Package Design", "Branding"];
const marqueeRow2 = ["Optimization", "Landing Pages", "Social Media", "Icons", "Brand Visibility", "Integrations"];

const ease = [0.16, 1, 0.3, 1] as const;

export default function ServicesSection() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section id="services" className="section-padding-lg" style={{ background: "hsl(var(--section-alt))" }} ref={ref}>
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0)" } : {}}
              transition={{ duration: 0.7, ease }}
            >
              <span className="glass-pill-muted text-xs uppercase tracking-wider inline-block mb-4">Design services</span>
              <h2 className="text-3xl md:text-5xl font-display font-semibold text-foreground mt-2 mb-4">
                Services
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Helping businesses stand out with web development and design that captivates and converts effectively.
              </p>
            </motion.div>

            {/* Service pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="flex flex-wrap gap-2 mb-10"
            >
              {servicePills.map((s) => (
                <span key={s} className="glass-pill-muted text-sm">{s}</span>
              ))}
            </motion.div>

            {/* 2x2 service cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {serviceCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                  animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0)" } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease }}
                  className="glass-card p-5 hover-lift"
                >
                  <h4 className="font-display font-medium text-foreground text-sm mb-2">{card.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25, ease }}
              className="flex items-center gap-4"
            >
              <a href="#contact" className="backdrop-blur-md bg-white/15 border border-white/30 text-white rounded-full px-7 py-3 text-sm font-medium hover:bg-white/25 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] active:scale-[0.97]">
                Book a Free Call
              </a>
              <a href="#projects" className="backdrop-blur-md bg-white/5 border border-white/20 text-white/80 rounded-full px-7 py-3 text-sm font-medium hover:bg-white/15 hover:border-white/30 transition-all duration-300 active:scale-[0.97]">
                See Projects
              </a>
            </motion.div>
          </div>

          {/* Right column */}
          <div>
            {/* Large image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="glass-card p-1 rounded-2xl overflow-hidden"
            >
              <img
                src="https://framerusercontent.com/images/p6Im6dfknHAI0ig4NqDcO4WNpc.jpg?width=898&height=1200"
                alt="Design services"
                className="w-full aspect-[4/5] object-cover rounded-xl"
              />
            </motion.div>
          </div>
        </div>

        {/* Tag marquee rows */}
        <div className="mt-16 space-y-3 overflow-hidden">
          <div style={{display:"flex",width:"max-content",animation:"scroll 30s linear infinite",willChange:"transform"}}>
            {[...marqueeRow1, ...marqueeRow1, ...marqueeRow1, ...marqueeRow1, ...marqueeRow1, ...marqueeRow1].map((tag, i) => (
              <span key={i} className="glass-pill-muted text-xs whitespace-nowrap" style={{marginLeft:i===0?0:8,marginRight:8}}>{tag}</span>
            ))}
          </div>
          <div style={{display:"flex",width:"max-content",animation:"scroll 30s linear infinite reverse",willChange:"transform"}}>
            {[...marqueeRow2, ...marqueeRow2, ...marqueeRow2, ...marqueeRow2, ...marqueeRow2, ...marqueeRow2].map((tag, i) => (
              <span key={i} className="glass-pill-muted text-xs whitespace-nowrap" style={{marginLeft:i===0?0:8,marginRight:8}}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

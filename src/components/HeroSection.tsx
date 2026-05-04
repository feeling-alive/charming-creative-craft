import { motion } from "framer-motion";
import { Mouse } from "lucide-react";
import React, { Suspense, useState, useEffect } from "react";
import ShaderBackground from "@/components/ShaderBackground";

const ease = [0.16, 1, 0.3, 1] as const;

const HeroSection = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >

      {/* ShaderGradient background */}
      <div className="absolute inset-0 bg-black" style={{ willChange: "transform" }}>
        <Suspense fallback={<div className="absolute inset-0 bg-black" />}>
          <ShaderBackground />
        </Suspense>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div
        className="relative z-10 section-container text-center max-w-4xl mx-auto text-white"
        style={{
          transform: `translateX(${(mousePos.x - 0.5) * 16}px) translateY(${(mousePos.y - 0.5) * 16}px)`,
          transition: 'transform 0.6s ease-out'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease }}
          className="glass-pill mx-auto mb-8"
        >
          <span className="w-2 h-2 rounded-full mr-2 inline-block" style={{ background: "hsl(142 71% 45%)" }} />
          Available for Freelance Work
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.12, ease }}
          className="text-4xl sm:text-5xl md:text-7xl font-display font-semibold text-foreground leading-[1.05] tracking-tight mb-6"
        >
          Web Development
          <br />&amp; Design
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className="text-white/75 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
        >
          I build fast, beautiful websites and web apps that look premium and
          work flawlessly. Open to remote projects globally.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.38, ease }}
          className="flex items-center justify-center gap-4"
        >
          <a href="#projects" className="backdrop-blur-md bg-white/15 border border-white/30 text-white rounded-full px-7 py-3 text-sm font-medium hover:bg-white/25 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] active:scale-[0.97]">
            View Projects
          </a>
          <a href="#contact" className="backdrop-blur-md bg-white/5 border border-white/20 text-white/80 rounded-full px-7 py-3 text-sm font-medium hover:bg-white/15 hover:border-white/30 transition-all duration-300 active:scale-[0.97]">
            Contact Me
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-28 left-0 right-0 z-10"
      >
        <div className="section-container flex items-center justify-center gap-0">
          <span className="text-xs text-white/60 tracking-widest uppercase">Scroll down</span>
          <div className="flex-1 max-w-[200px] h-px bg-white/20 mx-4" />
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Mouse size={16} className="text-white/60" />
          </motion.div>
          <div className="flex-1 max-w-[200px] h-px bg-white/20 mx-4" />
          <span className="text-xs text-white/60 tracking-widest uppercase">to see projects</span>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 border-t border-white/[0.06] bg-background/50 backdrop-blur-sm overflow-hidden z-10">
        <div className="marquee-track py-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="text-xs tracking-[0.3em] uppercase text-muted-foreground/50 whitespace-nowrap mx-8">
              WEB DEVELOPER · DESIGNER · AVAILABLE FOR HIRE ·
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default React.memo(HeroSection);

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Send, Mail } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function ContactSection() {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section
      id="contact"
      className="section-padding-lg"
      style={{ background: "hsl(var(--section-alt))" }}
      ref={ref}
    >
      <div className="section-container max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0)" } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <span className="glass-pill-muted text-xs uppercase tracking-wider inline-block mb-4">Get in Touch</span>
          <h2 className="text-3xl md:text-5xl font-display font-semibold text-foreground mt-4 mb-6">
            Let's Work Together
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-10">
            Have a project in mind? I'd love to hear about it. Reach out and
            let's create something amazing.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://t.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 backdrop-blur-md bg-white/15 border border-white/30 text-white rounded-full px-8 py-3.5 text-sm font-medium hover:bg-white/25 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] active:scale-[0.97]"
          >
            <Send size={16} />
            Write to Me
          </a>
          <a
            href="mailto:hello@example.com"
            className="inline-flex items-center gap-2 backdrop-blur-md bg-white/5 border border-white/20 text-white/80 rounded-full px-8 py-3.5 text-sm font-medium hover:bg-white/15 hover:border-white/30 transition-all duration-300 active:scale-[0.97]"
          >
            <Mail size={16} />
            Email Me
          </a>
        </motion.div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "What services do you provide?", a: "I specialize in web development, UI/UX design, frontend engineering with React/Next.js, and automation tools to create premium digital experiences." },
  { q: "How do I start working with you?", a: "Reach out via Telegram or email with a brief description of your project. I'll get back to you within 24 hours." },
  { q: "What technologies do you use?", a: "React, Next.js, TypeScript, Tailwind CSS, Framer Motion, Node.js, and various modern tools depending on the project." },
  { q: "How long does a project take?", a: "Most projects are delivered within 1–3 weeks depending on scope. Landing pages can be done in 3–5 days." },
  { q: "Do you provide revisions?", a: "Yes, all projects include revision rounds to make sure the result matches your vision perfectly." },
  { q: "What industries do you work with?", a: "I work across industries — SaaS, e-commerce, fintech, agencies, startups, and personal brands." },
  { q: "Do you offer development services?", a: "Absolutely. I handle full frontend development with React/Next.js, from design implementation to deployment." },
  { q: "What is your pricing structure?", a: "Pricing is project-based. I provide a detailed quote after understanding your requirements and scope." },
  { q: "Can you redesign my existing website?", a: "Yes! I frequently take existing websites and give them a complete visual and performance overhaul." },
];

const skillPills = ["Web Development", "UI / UX Design", "Frontend Engineering"];

const ease = [0.16, 1, 0.3, 1] as const;

export default function FAQSection() {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding-lg" ref={ref}>
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — image + tags + CTA */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0)" } : {}}
              transition={{ duration: 0.7, ease }}
            >
              <span className="glass-pill-muted text-xs uppercase tracking-wider inline-block mb-4">FAQ'S</span>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mt-2 mb-4">
                Answers
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Find answers to common questions about my design process, services etc…
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="glass-card p-1 rounded-2xl overflow-hidden mb-6"
            >
              <img
                src="https://framerusercontent.com/images/QqqmFNIdzb0HbOiMSHvqZXkwT7w.png?width=1200&height=1200"
                alt="Design"
                className="w-full aspect-square object-cover rounded-xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25, ease }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {skillPills.map((s) => (
                <span key={s} className="glass-pill-muted text-xs">{s}</span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease }}
            >
              <a href="#contact" className="backdrop-blur-md bg-white/15 border border-white/30 text-white rounded-full px-7 py-3 text-sm font-medium hover:bg-white/25 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] active:scale-[0.97] inline-block">
                Book a Free Call
              </a>
            </motion.div>
          </div>

          {/* Right — accordion */}
          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.05, ease }}
                className="border-b border-white/[0.06]"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left group active:scale-[0.99] transition-transform"
                >
                  <span className="text-sm md:text-base font-medium text-foreground pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-400 ease-out ${
                    openIndex === i ? "max-h-40 pb-5" : "max-h-0"
                  }`}
                >
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

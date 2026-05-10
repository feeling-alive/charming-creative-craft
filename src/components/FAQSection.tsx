import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ChevronDown } from "lucide-react";

const lines = [
  { indent:0, tokens:[{t:"import ",c:"#ff7b72"},{t:"React",c:"#79c0ff"},{t:", { useState, useEffect }",c:"#e6edf3"},{t:" from ",c:"#ff7b72"},{t:'"react"',c:"#a5d6ff"}] },
  { indent:0, tokens:[{t:"import ",c:"#ff7b72"},{t:"{ motion }",c:"#79c0ff"},{t:" from ",c:"#ff7b72"},{t:'"framer-motion"',c:"#a5d6ff"}] },
  { indent:0, tokens:[{t:"import ",c:"#ff7b72"},{t:"ShaderBg",c:"#79c0ff"},{t:" from ",c:"#ff7b72"},{t:'"./ShaderBg"',c:"#a5d6ff"}] },
  { indent:0, tokens:[{t:"",c:"#e6edf3"}] },
  { indent:0, tokens:[{t:"const ",c:"#ff7b72"},{t:"Hero",c:"#79c0ff"},{t:" = () => {",c:"#e6edf3"}] },
  { indent:1, tokens:[{t:"return ",c:"#ff7b72"},{t:"(",c:"#e6edf3"}] },
  { indent:2, tokens:[{t:"<",c:"#7ee787"},{t:"section ",c:"#7ee787"},{t:"className",c:"#79c0ff"},{t:'="hero"',c:"#a5d6ff"},{t:">",c:"#7ee787"}] },
  { indent:3, tokens:[{t:"<",c:"#7ee787"},{t:"ShaderBg ",c:"#7ee787"},{t:"/>",c:"#7ee787"}] },
  { indent:3, tokens:[{t:"<",c:"#7ee787"},{t:"motion.h1",c:"#7ee787"},{t:">",c:"#7ee787"}] },
  { indent:4, tokens:[{t:"Web Development",c:"#a5d6ff"}] },
  { indent:3, tokens:[{t:"</",c:"#7ee787"},{t:"motion.h1",c:"#7ee787"},{t:">",c:"#7ee787"}] },
  { indent:2, tokens:[{t:"</",c:"#7ee787"},{t:"section",c:"#7ee787"},{t:">",c:"#7ee787"}] },
  { indent:0, tokens:[{t:"}",c:"#e6edf3"}] },
];

type Phase = 'typing' | 'pause' | 'erasing';

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
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('typing');

  const allChars = lines.flatMap((line, li) => [
    ...Array(line.indent * 2).fill({ char: ' ', color: '#e6edf3', lineIndex: li, type: 'space' }),
    ...line.tokens.flatMap(tok =>
      tok.t.split('').map(char => ({ char, color: tok.c, lineIndex: li, type: 'char' }))
    ),
    { char: '\n', color: '', lineIndex: li, type: 'newline' }
  ]);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (phase === 'typing') {
      if (charIndex < allChars.length) {
        t = setTimeout(() => setCharIndex(i => i + 1), 45);
      } else {
        t = setTimeout(() => setPhase('pause'), 2500);
      }
    }
    if (phase === 'pause') {
      t = setTimeout(() => setPhase('erasing'), 800);
    }
    if (phase === 'erasing') {
      if (charIndex > 0) {
        t = setTimeout(() => setCharIndex(i => i - 1), 18);
      } else {
        t = setTimeout(() => setPhase('typing'), 500);
      }
    }
    return () => clearTimeout(t);
  }, [charIndex, phase, allChars.length]);

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
              className="mb-6"
            >
              <div style={{
                background: "#111111",
                borderRadius: 12,
                padding: "20px 24px",
                fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
                fontSize: 13,
                lineHeight: 1.7,
                minHeight: 420,
                width: "100%",
                maxWidth: "100%",
                border: "1px solid rgba(255,255,255,0.10)",
                overflow: "hidden",
                marginLeft: 0,
                marginRight: "auto"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
                  <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
                  <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginLeft: 8 }}>portfolio.tsx</span>
                </div>
                <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                  {(() => {
                    const visible = allChars.slice(0, charIndex)
                    const lineGroups: { char: string; color: string }[][] = [[]]
                    visible.forEach(c => {
                      if (c.type === 'newline') lineGroups.push([])
                      else lineGroups[lineGroups.length - 1].push(c as { char: string; color: string })
                    })
                    return lineGroups.map((line, li) => (
                      <div key={li}>
                        {line.map((c, ci) => (
                          <span key={ci} style={{ color: c.color }}>{c.char}</span>
                        ))}
                        {li === lineGroups.length - 1 && (
                          <span style={{
                            display: "inline-block",
                            width: 2, height: "1em",
                            background: "#79c0ff",
                            verticalAlign: "text-bottom",
                            animation: "blink 1s step-end infinite"
                          }} />
                        )}
                      </div>
                    ))
                  })()}
                </pre>
                <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
              </div>
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

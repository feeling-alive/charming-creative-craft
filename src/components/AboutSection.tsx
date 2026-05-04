import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState, useEffect } from "react";

const skills = [
  "Web Development", "UI / UX Design", "Frontend Engineering",
  "React / Next.js", "Automation & Bots", "Figma", "VS Code",
];

const experience = [
  { role: "Freelance Developer", company: "Currently" },
  { role: "Web Developer", company: "Freelance Projects" },
  { role: "Open Source Contributor", company: "GitHub Projects" },
];

const ease = [0.16, 1, 0.3, 1] as const;

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

export default function AboutSection() {
  const { ref, isVisible } = useScrollReveal(0.15);
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
    <section id="about" className="section-padding" style={{ background: "hsl(var(--section-alt))" }} ref={ref}>
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0)" } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              <span className="glass-pill-muted mb-4 inline-block text-xs uppercase tracking-wider">Meet Me</span>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mt-4 mb-6">
                About Me
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                I'm a web developer and designer specializing in clean, fast
                websites and web applications. I work at the intersection of sharp
                design and solid code — shipping products that feel premium and
                perform well.
              </p>
            </motion.div>

            {/* Skills as glass pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="flex flex-wrap gap-2 mb-10"
            >
              {skills.map((skill) => (
                <span key={skill} className="glass-pill-muted text-xs">{skill}</span>
              ))}
            </motion.div>

            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease }}
              className="glass-card p-6 space-y-0"
            >
              {experience.map((exp, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-4 border-b border-white/[0.06] last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{exp.role}</p>
                    <p className="text-xs text-muted-foreground">{exp.company}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Code Editor */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease }}
            className="relative order-first lg:order-last"
            style={{display:"flex",flexDirection:"column",height:"100%",alignSelf:"stretch"}}
          >
            <style>{`
              @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
              }
            `}</style>
            <div className="rounded-2xl overflow-hidden border border-white/10 max-w-md mx-auto lg:mx-0" style={{flex:1,minHeight:0,display:"flex",flexDirection:"column"}}>
              <div className="bg-[#1a1a1a] h-9 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                <span className="text-xs font-mono ml-2" style={{color:"#8b8b8b"}}>portfolio.tsx</span>
              </div>
              <div className="p-5 font-mono text-sm" style={{background:"rgba(255,255,255,0.04)",flex:1,overflow:"hidden"}}>
                {(() => {
                  const visibleChars = allChars.slice(0, charIndex);
                  const lineGroups: { [key: number]: typeof visibleChars } = {};
                  visibleChars.forEach(ch => {
                    if (!lineGroups[ch.lineIndex]) lineGroups[ch.lineIndex] = [];
                    lineGroups[ch.lineIndex].push(ch);
                  });

                  return Object.entries(lineGroups).map(([lineIdx, chars]) => {
                    const lineNum = parseInt(lineIdx) + 1;
                    const isLastLine = lineNum === Math.max(...Object.keys(lineGroups).map(Number)) + 1;
                    return (
                      <div key={lineIdx} className="leading-6">
                        <span style={{color:"#4a5568"}} className="mr-4">{lineNum}</span>
                        {chars.filter(ch => ch.type !== 'newline').map((ch, i) => (
                          <span key={i} style={{color: ch.color}}>{ch.char}</span>
                        ))}
                        {isLastLine && (
                          <span className="text-white" style={{ animation: 'blink 1s step-end infinite' }}>|</span>
                        )}
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

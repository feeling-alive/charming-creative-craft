import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const stats = [
  { value: "50+", label: "Web projects delivered" },
  { value: "3+", label: "Years of experience" },
  { value: "100%", label: "Client satisfaction" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function StatsBar() {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section className="py-16 md:py-24" ref={ref}>
      <div className="section-container">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0)" } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease }}
              className="glass-card-strong p-8 text-center"
            >
              <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-2">
                {stat.value}
              </h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Projects",  href: "#projects" },
  { label: "Process",   href: "#process" },
  { label: "Reviews",   href: "#reviews" },
  { label: "Contact",   href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className={`absolute bottom-0 left-0 right-0 h-px bg-white/[0.06] transition-opacity duration-300 ${
        scrolled ? "opacity-100" : "opacity-0"
      }`} />
      <div className="section-container flex items-center justify-between h-16 md:h-20">
        <a href="#" className="font-display text-xl font-semibold text-foreground tracking-tight">
          dev.
        </a>

        <div className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-white/70 hover:text-white transition-colors duration-200 px-4 py-1.5 rounded-full hover:bg-white/10"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground p-2 active:scale-95 transition-transform"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background/80 backdrop-blur-2xl border-b border-white/[0.06] animate-fade-up">
          <div className="section-container py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

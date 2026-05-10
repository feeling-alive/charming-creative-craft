import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { readFileSync } from "fs";
import { join } from "path";

// ─── Framer-motion mock ───────────────────────────────────────────────────────
vi.mock("framer-motion", async () => {
  const React = await import("react");
  const makeEl = (tag: string) =>
    function MotionEl({ children, initial, animate, exit, transition, whileHover, variants, ...rest }: any) {
      return React.createElement(tag, rest, children);
    };
  return {
    motion: new Proxy({} as Record<string, unknown>, {
      get: (_, tag: string) => makeEl(tag),
    }),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
    useInView: () => true,
  };
});

// ─── Dependency mocks ─────────────────────────────────────────────────────────
vi.mock("@/components/ShaderBackground", () => ({ default: () => null }));
vi.mock("@/hooks/useScrollReveal", () => ({
  useScrollReveal: () => ({ ref: { current: null }, isVisible: true }),
}));

// ─── Helpers ──────────────────────────────────────────────────────────────────
const src = (rel: string) => readFileSync(join(process.cwd(), "src", rel), "utf-8");

// ─── FIX 2: HeroSection overlay ───────────────────────────────────────────────
describe("FIX 2 – HeroSection overlay", () => {
  it("overlay delay is 750 ms", () => {
    const code = src("components/HeroSection.tsx");
    expect(code).toContain("setOverlayVisible(false), 750");
  });

  it("overlay zIndex is 40 (does not cover navbar at z-50)", () => {
    const code = src("components/HeroSection.tsx");
    expect(code).toContain("zIndex: 40");
    expect(code).not.toMatch(/zIndex:\s*50/);
  });
});

// ─── FIX 3: Navbar links ──────────────────────────────────────────────────────
describe("FIX 3 – Navbar links", () => {
  it("navLinks array has Projects / Process / Reviews / Contact", () => {
    const code = src("components/Navbar.tsx");
    expect(code).toContain('"Projects"');
    expect(code).toContain('"Process"');
    expect(code).toContain('"Reviews"');
    expect(code).toContain('"Contact"');
  });

  it("navLinks no longer contains Services or About", () => {
    const code = src("components/Navbar.tsx");
    expect(code).not.toContain('"Services"');
    expect(code).not.toContain('"About"');
  });

  it("Process href is #process", () => {
    const code = src("components/Navbar.tsx");
    expect(code).toContain('href: "#process"');
  });

  it("Reviews href is #reviews", () => {
    const code = src("components/Navbar.tsx");
    expect(code).toContain('href: "#reviews"');
  });

  it("nav border is a separate element with opacity transition", () => {
    const code = src("components/Navbar.tsx");
    expect(code).toContain("transition-opacity duration-300");
    // The scrolled-state nav class must NOT include border-b (border is now a separate div)
    expect(code).toContain('"bg-background/80 backdrop-blur-md"');
    expect(code).not.toContain('"bg-background/80 backdrop-blur-md border-b');
  });

  it("desktop links are wrapped in glassmorphism pill", () => {
    const code = src("components/Navbar.tsx");
    expect(code).toContain("bg-white/5 backdrop-blur-md border border-white/10 rounded-full");
  });
});

// ─── FIX 3: Section IDs ───────────────────────────────────────────────────────
describe("FIX 3 – Section anchor IDs", () => {
  it("ProcessSection renders with id='process'", () => {
    const code = src("components/ProcessSection.tsx");
    expect(code).toContain('id="process"');
  });

  it("TestimonialsSection renders with id='reviews'", () => {
    const code = src("components/TestimonialsSection.tsx");
    expect(code).toContain('id="reviews"');
  });
});

// ─── FIX 4: FAQSection code editor dimensions ─────────────────────────────────
describe("FIX 4 – FAQSection code editor dimensions", () => {
  it("code editor maxWidth is 420", () => {
    const code = src("components/FAQSection.tsx");
    expect(code).toContain("maxWidth: 420");
  });

  it("code editor minHeight is 380", () => {
    const code = src("components/FAQSection.tsx");
    expect(code).toContain("minHeight: 380");
  });
});

// ─── FIX 5: Custom scrollbar CSS ─────────────────────────────────────────────
describe("FIX 5 – Custom scrollbar", () => {
  it("index.css has webkit scrollbar rules", () => {
    const css = src("index.css");
    expect(css).toContain("::-webkit-scrollbar {");
    expect(css).toContain("width: 4px;");
    expect(css).toContain("::-webkit-scrollbar-thumb {");
    expect(css).toContain("rgba(255, 255, 255, 0.15)");
  });

  it("index.css has Firefox scrollbar rule", () => {
    const css = src("index.css");
    expect(css).toContain("scrollbar-width: thin;");
    expect(css).toContain("scrollbar-color: rgba(255, 255, 255, 0.15) transparent;");
  });
});

// ─── FIX 6: ProjectsSection card heights & hover ─────────────────────────────
describe("FIX 6 – ProjectsSection cards", () => {
  it("desktop card heights are 480 px (focused) and 450 px (others)", () => {
    const code = src("components/ProjectsSection.tsx");
    expect(code).toContain('"480px"');
    expect(code).toContain('"450px"');
  });

  it("desktop card height difference is ≤ 30 px (was 100 px)", () => {
    const code = src("components/ProjectsSection.tsx");
    expect(code).not.toContain('"550px"');
  });

  it("imgStyle has no inline filter (uses Tailwind grayscale classes)", () => {
    const code = src("components/ProjectsSection.tsx");
    // The imgStyle const must not have inline filter (Tailwind handles it now)
    expect(code).not.toContain('transition: "filter');
    // Card images use Tailwind grayscale (modal thumbnails may still use inline filter — that's fine)
    expect(code).toContain("grayscale brightness-75");
    expect(code).toContain("group-hover:grayscale-0 group-hover:brightness-100");
    // Verify imgStyle object doesn't include filter property
    const imgStyleBlock = code.slice(
      code.indexOf("const imgStyle: React.CSSProperties"),
      code.indexOf("const makeCard")
    );
    expect(imgStyleBlock).not.toContain("filter:");
  });

  it("makeCard has whileHover scale", () => {
    const code = src("components/ProjectsSection.tsx");
    expect(code).toContain("whileHover={{ scale: 1.02 }}");
  });
});

// ─── FIX 1: Modal non-overlap ─────────────────────────────────────────────────
describe("FIX 1 – Modal overlap fix", () => {
  it("AllProjectsModal onClick does not delay onSelect with setTimeout", () => {
    const code = src("components/ProjectsSection.tsx");
    expect(code).not.toContain("setTimeout(() => onSelect");
  });

  it("AllProjectsModal onClick calls onClose then onSelect immediately", () => {
    const code = src("components/ProjectsSection.tsx");
    expect(code).toContain("onClose(); onSelect(p)");
  });

  it("card onClick resets showAllProjects before opening ProjectModal", () => {
    const code = src("components/ProjectsSection.tsx");
    expect(code).toContain("setShowAllProjects(false)");
  });
});

// ─── FIX 3 Navbar component render ────────────────────────────────────────────
describe("FIX 3 – Navbar component renders correct links", () => {
  it("renders all four nav links", async () => {
    const { default: Navbar } = await import("../components/Navbar");
    render(<Navbar />);
    expect(screen.getAllByText("Projects").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Process").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Reviews").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Contact").length).toBeGreaterThan(0);
  });

  it("does not render Services or About", async () => {
    const { default: Navbar } = await import("../components/Navbar");
    render(<Navbar />);
    expect(screen.queryByText("Services")).toBeNull();
    expect(screen.queryByText("About")).toBeNull();
  });

  it("Process link href is #process", async () => {
    const { default: Navbar } = await import("../components/Navbar");
    render(<Navbar />);
    const links = screen.getAllByRole("link");
    const processLink = links.find((l) => l.textContent?.trim() === "Process");
    expect(processLink).toBeDefined();
    expect(processLink?.getAttribute("href")).toBe("#process");
  });

  it("Reviews link href is #reviews", async () => {
    const { default: Navbar } = await import("../components/Navbar");
    render(<Navbar />);
    const links = screen.getAllByRole("link");
    const reviewsLink = links.find((l) => l.textContent?.trim() === "Reviews");
    expect(reviewsLink).toBeDefined();
    expect(reviewsLink?.getAttribute("href")).toBe("#reviews");
  });
});

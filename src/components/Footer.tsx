export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8">
      <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-4">
        <a href="#" className="font-display text-lg font-semibold text-foreground tracking-tight">
          dev.
        </a>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}

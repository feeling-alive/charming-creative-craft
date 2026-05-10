import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const ProcessSection = lazy(() => import("@/components/ProcessSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <Suspense fallback={null}>
        <ProjectsSection />
        <ProcessSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
        <Footer />
      </Suspense>
    </div>
  );
}

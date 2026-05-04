import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const RecentWorks = lazy(() => import("@/components/RecentWorks"));
const ProcessSection = lazy(() => import("@/components/ProcessSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const StatsBar = lazy(() => import("@/components/StatsBar"));
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
        <AboutSection />
        <RecentWorks />
        <ProcessSection />
        <ServicesSection />
        <TestimonialsSection />
        <StatsBar />
        <FAQSection />
        <ContactSection />
        <Footer />
      </Suspense>
    </div>
  );
}

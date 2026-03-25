"use client";

import dynamic from "next/dynamic";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useTheme } from "@/hooks/useTheme";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { PageLoader } from "@/components/loader/PageLoader";

const AboutSection = dynamic(
  () => import("@/components/sections/AboutSection").then((m) => ({ default: m.AboutSection })),
  { ssr: true }
);
const SkillsSection = dynamic(
  () => import("@/components/sections/SkillsSection").then((m) => ({ default: m.SkillsSection })),
  { ssr: true }
);
const ProjectsSection = dynamic(
  () => import("@/components/sections/ProjectsSection").then((m) => ({ default: m.ProjectsSection })),
  { ssr: true }
);
const ContactSection = dynamic(
  () => import("@/components/sections/ContactSection").then((m) => ({ default: m.ContactSection })),
  { ssr: true }
);

const ParticleCanvas = dynamic(
  () => import("@/components/canvas/ParticleCanvas").then((m) => ({ default: m.ParticleCanvas })),
  { ssr: false }
);

export default function Home() {
  const scrollProgress = useScrollProgress();
  const { theme } = useTheme();

  return (
    <>
      <PageLoader />
      <CustomCursor />
      <ParticleCanvas scrollProgress={scrollProgress} isDark={theme === "dark"} />
      <Navbar />

      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}

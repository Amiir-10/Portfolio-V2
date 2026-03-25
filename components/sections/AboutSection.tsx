"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapSetup";
import { personalInfo } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextReveal } from "@/components/ui/TextReveal";

export function AboutSection() {
  const accentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!accentRef.current) return;

    gsap.fromTo(
      accentRef.current.querySelectorAll(".accent-line"),
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: accentRef.current,
          start: "top 70%",
        },
      }
    );
  }, []);

  return (
    <section id="about" className="min-h-screen flex items-center py-24 px-4 md:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto w-full">
        <SectionHeading title="About Me" />

        <div className="space-y-6">
          {personalInfo.bio.map((paragraph, i) => (
            <TextReveal
              key={i}
              className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed"
              delay={i * 0.1}
            >
              {paragraph}
            </TextReveal>
          ))}
        </div>

        <div ref={accentRef} className="mt-12 space-y-3">
          <div className="accent-line h-[2px] w-24 bg-teal origin-left" />
          <div className="accent-line h-[2px] w-16 bg-mint origin-left" />
          <div className="accent-line h-[2px] w-8 bg-royal origin-left" />
        </div>
      </div>
    </section>
  );
}

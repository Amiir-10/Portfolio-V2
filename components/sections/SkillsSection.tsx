"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapSetup";
import { skills } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillCard } from "@/components/ui/SkillCard";

const categories = [
  { key: "languages" as const, label: "Languages", speed: 30, direction: 1 },
  { key: "frameworks" as const, label: "Frameworks", speed: 25, direction: -1 },
  { key: "tools" as const, label: "Tools", speed: 35, direction: 1 },
];

export function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tweens: gsap.core.Tween[] = [];
    const triggers: ScrollTrigger[] = [];
    const cleanups: (() => void)[] = [];

    // Category label slide-in
    const labels = sectionRef.current.querySelectorAll("[data-skill-label]");
    labels.forEach((label) => {
      gsap.fromTo(
        label,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: label,
            start: "top 85%",
          },
        }
      );
    });

    // Marquee animations
    marqueeRefs.current.forEach((track, i) => {
      if (!track) return;
      const wrapper = wrapperRefs.current[i];
      if (!wrapper) return;

      const cat = categories[i];
      const fromX = cat.direction === -1 ? 0 : -50;
      const toX = cat.direction === -1 ? -50 : 0;

      const tween = gsap.fromTo(
        track,
        { xPercent: fromX },
        {
          xPercent: toX,
          duration: cat.speed,
          ease: "none",
          repeat: -1,
        }
      );
      tweens.push(tween);

      // Hover pause on the stable overflow wrapper, not the moving track
      const onEnter = () => gsap.to(tween, { timeScale: 0, duration: 0.5 });
      const onLeave = () => gsap.to(tween, { timeScale: 1, duration: 0.5 });
      wrapper.addEventListener("mouseenter", onEnter);
      wrapper.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        wrapper.removeEventListener("mouseenter", onEnter);
        wrapper.removeEventListener("mouseleave", onLeave);
      });
    });

    // Scroll-driven sine wave
    const cards = sectionRef.current.querySelectorAll("[data-skill-card]");
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        cards.forEach((card, i) => {
          const offset = i * 0.5 + self.progress * Math.PI * 4;
          const y = Math.sin(offset) * 5;
          gsap.set(card, { y });
        });
      },
    });
    triggers.push(st);

    return () => {
      tweens.forEach((t) => t.kill());
      triggers.forEach((t) => t.kill());
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="min-h-screen py-24 px-4 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="Skills & Tech" />

        <div className="space-y-10">
          {categories.map((cat, ci) => {
            const categorySkills = skills.filter((s) => s.category === cat.key);
            if (categorySkills.length === 0) return null;

            const repeated = [...categorySkills, ...categorySkills, ...categorySkills];

            return (
              <div key={cat.key}>
                <h3
                  data-skill-label
                  className="text-sm uppercase tracking-widest text-teal mb-4 font-mono"
                >
                  {cat.label}
                </h3>
                <div
                  ref={(el) => { wrapperRefs.current[ci] = el; }}
                  className="overflow-x-hidden py-3"
                >
                  <div
                    ref={(el) => { marqueeRefs.current[ci] = el; }}
                    className="flex gap-4 w-max"
                  >
                    {repeated.map((skill, j) => (
                      <div key={`${skill.name}-${j}`} data-skill-card className="will-change-transform">
                        <SkillCard skill={skill} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

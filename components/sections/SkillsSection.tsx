"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapSetup";
import { skills } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillCard } from "@/components/ui/SkillCard";

const categories = [
  { key: "languages" as const, label: "Languages" },
  { key: "frameworks" as const, label: "Frameworks" },
  { key: "tools" as const, label: "Tools" },
];

export function SkillsSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll("[data-skill-card]");

    gsap.fromTo(
      cards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  let cardIndex = 0;

  return (
    <section id="skills" className="min-h-screen py-24 px-4 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="Skills & Tech" />

        <div ref={gridRef} className="space-y-12">
          {categories.map((cat) => {
            const categorySkills = skills.filter((s) => s.category === cat.key);
            if (categorySkills.length === 0) return null;

            return (
              <div key={cat.key}>
                <h3 className="text-sm uppercase tracking-widest text-teal mb-4 font-mono">
                  {cat.label}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {categorySkills.map((skill) => (
                    <div key={skill.name} data-skill-card>
                      <SkillCard skill={skill} index={cardIndex++} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

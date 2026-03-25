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
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const groups = sectionRef.current.querySelectorAll("[data-skill-group]");

    groups.forEach((group, groupIndex) => {
      const label = group.querySelector("[data-skill-label]");
      const cards = group.querySelectorAll("[data-skill-card]");

      if (label) {
        gsap.fromTo(
          label,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: group,
              start: "top 80%",
            },
          }
        );
      }

      gsap.fromTo(
        cards,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.06,
          ease: "power3.out",
          delay: 0.15,
          scrollTrigger: {
            trigger: group,
            start: "top 80%",
          },
        }
      );
    });
  }, []);

  let cardIndex = 0;

  return (
    <section id="skills" className="min-h-screen py-24 px-4 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="Skills & Tech" />

        <div ref={sectionRef} className="space-y-12">
          {categories.map((cat) => {
            const categorySkills = skills.filter((s) => s.category === cat.key);
            if (categorySkills.length === 0) return null;

            return (
              <div key={cat.key} data-skill-group>
                <h3
                  data-skill-label
                  className="text-sm uppercase tracking-widest text-teal mb-4 font-mono"
                >
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

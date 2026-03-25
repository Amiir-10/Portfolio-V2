"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapSetup";
import { personalInfo, aboutStats } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

const KEYWORDS = [
  "Computer Engineering",
  "German University in Cairo",
  "interactive",
  "performant",
  "scroll animations",
  "full-stack",
  "technologies",
  "browser",
];

function highlightKeywords(text: string): ReactNode[] {
  const regex = new RegExp(`(${KEYWORDS.join("|")})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    KEYWORDS.some((kw) => kw.toLowerCase() === part.toLowerCase()) ? (
      <span key={i} className="keyword-shimmer font-medium">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export function AboutSection() {
  const paraRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Alternating slide entrance — plays on scroll down, reverses on scroll up
    paraRefs.current.forEach((el, i) => {
      if (!el) return;
      const fromLeft = i % 2 === 0;
      gsap.fromTo(
        el,
        { x: fromLeft ? -60 : 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 30%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    // Accent lines — reversible
    if (accentRef.current) {
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
            start: "top 85%",
            end: "top 30%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }

    // Stats — reversible entrance + count-up that resets
    if (statsRef.current) {
      const valueEls = statsRef.current.querySelectorAll("[data-stat-value]");
      valueEls.forEach((el) => {
        const target = Number(el.getAttribute("data-stat-value"));
        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: target,
          duration: 1.5,
          ease: "power2.out",
          snap: { val: 1 },
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "top 30%",
            toggleActions: "play reverse play reverse",
          },
          onUpdate: () => {
            (el as HTMLElement).textContent = String(Math.round(proxy.val));
          },
        });
      });

      gsap.fromTo(
        statsRef.current.querySelectorAll("[data-stat]"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            end: "top 30%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }
  }, []);

  return (
    <section id="about" className="min-h-screen flex items-center py-24 px-4 md:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto w-full">
        <SectionHeading title="About Me" />

        <div className="space-y-6">
          {personalInfo.bio.map((paragraph, i) => (
            <p
              key={i}
              ref={(el) => { paraRefs.current[i] = el; }}
              className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed"
            >
              {highlightKeywords(paragraph)}
            </p>
          ))}
        </div>

        <div ref={accentRef} className="mt-12 space-y-3">
          <div className="accent-line h-[2px] w-24 bg-teal origin-left" />
          <div className="accent-line h-[2px] w-16 bg-mint origin-left" />
          <div className="accent-line h-[2px] w-8 bg-royal origin-left" />
        </div>

        <div ref={statsRef} className="grid grid-cols-3 gap-6 mt-12">
          {aboutStats.map((stat) => (
            <div key={stat.label} data-stat className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-teal">
                <span data-stat-value={stat.value}>0</span>
                {stat.suffix && <span>{stat.suffix}</span>}
              </div>
              <p className="text-sm text-[var(--text-secondary)] mt-1 font-mono uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

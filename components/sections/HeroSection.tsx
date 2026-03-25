"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsapSetup";
import { personalInfo } from "@/lib/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { LuChevronDown } from "react-icons/lu";

export function HeroSection() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    const nameEl = nameRef.current;
    if (nameEl) {
      const text = nameEl.textContent || "";
      nameEl.innerHTML = text
        .split("")
        .map((char) =>
          char === " "
            ? " "
            : `<span class="inline-block opacity-0 translate-y-full">${char}</span>`
        )
        .join("");

      tl.to(nameEl.querySelectorAll("span"), {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.03,
        ease: "power3.out",
      });
    }

    tl.fromTo(
      subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.2"
    );

    tl.fromTo(
      ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
      "-=0.2"
    );

    tl.fromTo(
      scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      "-=0.1"
    );
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen flex flex-col items-center justify-center text-center px-4"
    >
      <h1
        ref={nameRef}
        className="font-display text-[clamp(3rem,8vw,7rem)] font-extrabold leading-none mb-4"
      >
        {personalInfo.name}
      </h1>
      <p
        ref={subtitleRef}
        className="text-xl md:text-2xl text-[var(--text-secondary)] mb-8 opacity-0"
      >
        {personalInfo.title}
      </p>
      <div ref={ctaRef} className="opacity-0">
        <MagneticButton
          href="#projects"
          className="text-lg px-8 py-4"
        >
          Explore My Work
        </MagneticButton>
      </div>
      <div
        ref={scrollRef}
        className="absolute bottom-8 opacity-0 animate-bounce-slow"
      >
        <LuChevronDown size={28} className="text-teal/60" />
      </div>
    </section>
  );
}

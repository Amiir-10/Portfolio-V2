"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapSetup";

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "p" | "span" | "h1" | "h2" | "h3";
  delay?: number;
  splitBy?: "words" | "lines";
}

export function TextReveal({
  children,
  className = "",
  as: Tag = "p",
  delay = 0,
  splitBy = "words",
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll(".word-wrap");

    gsap.fromTo(
      words,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.6,
        stagger: 0.03,
        ease: "power3.out",
        delay,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [delay, children]);

  const words = children.split(" ").map((word, i) => (
    <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
      <span className="word-wrap inline-block">{word}</span>
    </span>
  ));

  return (
    // @ts-expect-error - dynamic tag
    <Tag ref={containerRef} className={className}>
      {words}
    </Tag>
  );
}

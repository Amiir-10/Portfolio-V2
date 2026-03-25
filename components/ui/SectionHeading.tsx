"use client";

import { TextReveal } from "./TextReveal";

interface SectionHeadingProps {
  title: string;
  className?: string;
}

export function SectionHeading({ title, className = "" }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${className}`}>
      <TextReveal
        as="h2"
        className="font-display text-4xl md:text-5xl lg:text-6xl font-bold"
      >
        {title}
      </TextReveal>
      <div className="mt-4 h-1 w-16 bg-teal rounded-full" />
    </div>
  );
}

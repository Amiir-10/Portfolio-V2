"use client";

import { socialLinks } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialPill } from "@/components/ui/SocialPill";
import { TextReveal } from "@/components/ui/TextReveal";

export function ContactSection() {
  return (
    <section id="contact" className="min-h-screen flex items-center pt-32 pb-24 px-4 md:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto text-center w-full">
        <TextReveal
          as="h2"
          className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          {"Let's Build Something"}
        </TextReveal>
        <TextReveal
          className="text-lg text-[var(--text-secondary)] mb-12"
          delay={0.2}
        >
          Got a project in mind or just want to connect? Reach out.
        </TextReveal>

        <div className="flex flex-wrap justify-center gap-4">
          {socialLinks.map((link) => (
            <SocialPill key={link.platform} link={link} />
          ))}
        </div>
      </div>
    </section>
  );
}

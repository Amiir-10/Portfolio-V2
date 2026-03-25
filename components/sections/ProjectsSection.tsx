"use client";

import { useState, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { gsap, ScrollTrigger } from "@/lib/gsapSetup";
import { projects } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import type { Project } from "@/lib/content";

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
    skipSnaps: true,
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!emblaApi) return;
    const root = emblaApi.rootNode();

    function onWheel(e: WheelEvent) {
      const dx = Math.abs(e.deltaX);
      const dy = Math.abs(e.deltaY);
      if (dx === 0 && dy === 0) return;

      e.preventDefault();
      const scrollAmount = dx > dy ? e.deltaX : e.deltaY;
      emblaApi!.scrollTo(
        emblaApi!.selectedScrollSnap() + (scrollAmount > 0 ? 1 : -1)
      );
    }

    root.addEventListener("wheel", onWheel, { passive: false });
    return () => root.removeEventListener("wheel", onWheel);
  }, [emblaApi]);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current.querySelector("[data-carousel]"),
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="min-h-screen py-24 px-4 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="Projects" />

        <div data-carousel>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-8">
            <MagneticButton onClick={() => emblaApi?.scrollPrev()}>
              <LuChevronLeft size={18} />
            </MagneticButton>
            <MagneticButton onClick={() => emblaApi?.scrollNext()}>
              <LuChevronRight size={18} />
            </MagneticButton>
          </div>
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

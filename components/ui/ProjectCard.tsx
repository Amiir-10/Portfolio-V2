"use client";

import { useRef, useCallback } from "react";
import type { Project } from "@/lib/content";
import { getGradient } from "@/lib/techGradients";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const gradient = getGradient(project.primaryTech);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex-shrink-0 w-[350px] h-[420px] rounded-2xl border border-white/10 overflow-hidden cursor-pointer group"
      style={{ transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)", transition: "transform 0.15s ease-out", willChange: "transform" }}
      role="button"
      tabIndex={0}
    >
      <div className="absolute inset-0 bg-[var(--bg-secondary)]" />
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient.from} ${gradient.to}`} />

      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }} />

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl shadow-[inset_0_0_40px_rgba(56,176,166,0.15)]" />

      <div className="relative z-10 flex flex-col justify-end h-full p-6">
        <h3 className="font-display text-2xl font-bold mb-2">{project.title}</h3>
        <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-mono rounded-md bg-teal/10 text-teal border border-teal/20"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

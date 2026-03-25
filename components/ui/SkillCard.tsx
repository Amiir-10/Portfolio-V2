"use client";

import { useMagnetic } from "@/hooks/useMagnetic";
import { skillIconMap } from "@/lib/iconMap";
import type { Skill } from "@/lib/content";

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export function SkillCard({ skill, index }: SkillCardProps) {
  const ref = useMagnetic(0.15);
  const IconComponent = skillIconMap[skill.icon];

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="group relative p-4 rounded-xl border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-sm hover:border-teal/50 hover:bg-teal/5 transition-all duration-300 hover:-translate-y-2"
      style={{
        animationDelay: `${index * 0.2}s`,
        animation: "float 3s ease-in-out infinite",
      }}
      data-magnetic
    >
      <div className="flex items-center gap-3">
        {IconComponent && <IconComponent className="text-2xl text-teal" />}
        <span className="font-medium text-[var(--text-primary)]">
          {skill.name}
        </span>
      </div>
    </div>
  );
}

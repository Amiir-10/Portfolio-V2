"use client";

import { skillIconMap } from "@/lib/iconMap";
import type { Skill } from "@/lib/content";

interface SkillCardProps {
  skill: Skill;
}

export function SkillCard({ skill }: SkillCardProps) {
  const IconComponent = skillIconMap[skill.icon];

  return (
    <div
      className="group relative p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-teal/50 hover:bg-teal/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal/5 flex-shrink-0"
      data-magnetic
    >
      <div className="flex items-center gap-3">
        {IconComponent && (
          <IconComponent className="text-2xl text-teal transition-transform duration-300 group-hover:scale-110" />
        )}
        <span className="font-medium text-[var(--text-primary)] whitespace-nowrap">
          {skill.name}
        </span>
      </div>
    </div>
  );
}

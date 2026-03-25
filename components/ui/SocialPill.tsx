"use client";

import { useMagnetic } from "@/hooks/useMagnetic";
import { LuMail, LuGithub, LuLinkedin, LuMessageCircle } from "react-icons/lu";
import type { IconType } from "react-icons";
import type { SocialLink } from "@/lib/content";

const socialIconMap: Record<string, IconType> = {
  LuMail,
  LuGithub,
  LuLinkedin,
  LuMessageCircle,
};

interface SocialPillProps {
  link: SocialLink;
}

export function SocialPill({ link }: SocialPillProps) {
  const ref = useMagnetic(0.3);
  const IconComponent = socialIconMap[link.icon];

  return (
    <a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={link.url}
      target={link.platform !== "email" ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-teal/30 text-lg font-medium hover:bg-teal/10 hover:border-teal hover:text-teal transition-all duration-300"
      data-magnetic
    >
      {IconComponent && <IconComponent size={22} />}
      {link.label}
    </a>
  );
}

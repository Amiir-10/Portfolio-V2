"use client";

import { ReactNode } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  external?: boolean;
}

export function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  external = false,
}: MagneticButtonProps) {
  const ref = useMagnetic(0.3);

  const baseStyles =
    "inline-flex items-center gap-2 px-6 py-3 rounded-full border border-teal/50 text-teal hover:bg-teal/10 hover:border-teal transition-colors duration-300 font-medium will-change-transform";

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={`${baseStyles} ${className}`}
        data-magnetic
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={`${baseStyles} ${className}`}
      data-magnetic
    >
      {children}
    </button>
  );
}

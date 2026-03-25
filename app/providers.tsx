"use client";

import { ReactNode } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import "@/lib/gsapSetup";

export function Providers({ children }: { children: ReactNode }) {
  const { mounted } = useTheme();
  useSmoothScroll();

  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return <>{children}</>;
}

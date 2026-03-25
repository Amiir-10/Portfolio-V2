"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { LuArrowUp } from "react-icons/lu";

export function Footer() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="py-12 px-4 text-center border-t border-white/5">
      <div className="flex flex-col items-center gap-4">
        <MagneticButton onClick={scrollToTop}>
          <LuArrowUp size={16} />
          Back to top
        </MagneticButton>
        <p className="text-sm text-[var(--text-secondary)]">
          &copy; {new Date().getFullYear()} Amir. Built with Next.js.
        </p>
      </div>
    </footer>
  );
}

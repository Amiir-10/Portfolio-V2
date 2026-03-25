"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsapSetup";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsHidden(true);
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    function handleMouseMove(e: MouseEvent) {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
    }

    function handleMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("a, button, [data-magnetic], [role='button']") !== null;
      setIsPointer(isInteractive);
    }

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (isHidden) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
      style={{
        transform: "translate(-50%, -50%)",
        willChange: "transform",
      }}
    >
      <div
        className={`rounded-full border-2 border-teal transition-all duration-200 ease-out ${
          isPointer
            ? "w-12 h-12 bg-teal/20"
            : "w-3 h-3 bg-teal"
        }`}
      />
    </div>
  );
}

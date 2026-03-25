"use client";

import { Canvas } from "@react-three/fiber";
import { ParticleSystem } from "./ParticleSystem";
import { useMousePosition } from "@/hooks/useMousePosition";
import { Suspense, useState, useEffect } from "react";

interface ParticleCanvasProps {
  scrollProgress: number;
  isDark: boolean;
}

function getParticleCount() {
  if (typeof window === "undefined") return 2500;
  const w = window.innerWidth;
  if (w < 768) return 500;
  if (w < 1024) return 1000;
  return 2500;
}

export function ParticleCanvas({ scrollProgress, isDark }: ParticleCanvasProps) {
  const mousePosition = useMousePosition();
  const [particleCount, setParticleCount] = useState(getParticleCount);

  useEffect(() => {
    function handleResize() {
      setParticleCount(getParticleCount());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none will-change-transform">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ParticleSystem
            scrollProgress={scrollProgress}
            mousePosition={mousePosition}
            isDark={isDark}
            particleCount={particleCount}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

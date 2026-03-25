"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  generateDispersed,
  generateSphere,
  generateGrid,
  generateConstellation,
  generateVortex,
} from "./particleUtils";

interface ParticleSystemProps {
  scrollProgress: number;
  mousePosition: React.RefObject<{ normalizedX: number; normalizedY: number } | null>;
  isDark: boolean;
  particleCount: number;
}

export function ParticleSystem({ scrollProgress, mousePosition, isDark, particleCount }: ParticleSystemProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const currentPositions = useRef<Float32Array>(new Float32Array(particleCount * 3));

  const targets = useMemo(
    () => [
      generateDispersed(particleCount),
      generateSphere(particleCount),
      generateGrid(particleCount),
      generateConstellation(particleCount),
      generateVortex(particleCount),
    ],
    [particleCount]
  );

  useEffect(() => {
    currentPositions.current = new Float32Array(targets[0]);
  }, [targets]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const geometry = pointsRef.current.geometry;
    const posAttr = geometry.attributes.position as THREE.BufferAttribute;

    const sectionCount = 5;
    const adjustedProgress = Math.min(scrollProgress * 1.1, 1);
    const rawIndex = adjustedProgress * (sectionCount - 1);
    const fromIndex = Math.floor(rawIndex);
    const toIndex = Math.min(fromIndex + 1, sectionCount - 1);
    const t = rawIndex - fromIndex;

    const from = targets[fromIndex];
    const to = targets[toIndex];

    const mouse = mousePosition.current;
    const mouseX = mouse ? mouse.normalizedX * 5 : 0;
    const mouseY = mouse ? mouse.normalizedY * 3 : 0;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      const targetX = from[i3] + (to[i3] - from[i3]) * t;
      const targetY = from[i3 + 1] + (to[i3 + 1] - from[i3 + 1]) * t;
      const targetZ = from[i3 + 2] + (to[i3 + 2] - from[i3 + 2]) * t;

      currentPositions.current[i3] += (targetX - currentPositions.current[i3]) * 0.05;
      currentPositions.current[i3 + 1] += (targetY - currentPositions.current[i3 + 1]) * 0.05;
      currentPositions.current[i3 + 2] += (targetZ - currentPositions.current[i3 + 2]) * 0.05;

      const dx = currentPositions.current[i3] - mouseX;
      const dy = currentPositions.current[i3 + 1] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 1.5) {
        const force = (1.5 - dist) * 0.02;
        currentPositions.current[i3] += dx * force;
        currentPositions.current[i3 + 1] += dy * force;
      }

      posAttr.array[i3] = currentPositions.current[i3];
      posAttr.array[i3 + 1] = currentPositions.current[i3 + 1];
      posAttr.array[i3 + 2] = currentPositions.current[i3 + 2];
    }

    posAttr.needsUpdate = true;
  });

  const particleColor = isDark ? "#38B0A6" : "#1245A5";
  const particleOpacity = isDark ? 0.8 : 0.5;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={useMemo(() => new Float32Array(targets[0]), [targets])}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={particleColor}
        transparent
        opacity={particleOpacity}
        sizeAttenuation
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        depthWrite={false}
      />
    </points>
  );
}

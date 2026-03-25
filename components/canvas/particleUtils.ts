import * as THREE from "three";

const PARTICLE_COUNT = 2500;

export function generateDispersed(count: number = PARTICLE_COUNT): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
  }
  return positions;
}

export function generateSphere(count: number = PARTICLE_COUNT, radius: number = 2.5): Float32Array {
  const positions = new Float32Array(count * 3);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;

    positions[i * 3] = Math.cos(theta) * radiusAtY * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(theta) * radiusAtY * radius;
  }
  return positions;
}

export function generateGrid(count: number = PARTICLE_COUNT): Float32Array {
  const positions = new Float32Array(count * 3);
  const cols = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / cols);
  const spacing = 0.15;

  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    positions[i * 3] = (col - cols / 2) * spacing;
    positions[i * 3 + 1] = (row - rows / 2) * spacing;
    positions[i * 3 + 2] = 0;
  }
  return positions;
}

export function generateConstellation(count: number = PARTICLE_COUNT): Float32Array {
  const positions = new Float32Array(count * 3);
  const clusterCount = 8;
  const clusterCenters: THREE.Vector3[] = [];

  for (let i = 0; i < clusterCount; i++) {
    clusterCenters.push(
      new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 4
      )
    );
  }

  for (let i = 0; i < count; i++) {
    const cluster = clusterCenters[i % clusterCount];
    positions[i * 3] = cluster.x + (Math.random() - 0.5) * 1.5;
    positions[i * 3 + 1] = cluster.y + (Math.random() - 0.5) * 1.5;
    positions[i * 3 + 2] = cluster.z + (Math.random() - 0.5) * 1;
  }
  return positions;
}

export function generateVortex(count: number = PARTICLE_COUNT): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = i / count;
    const angle = t * Math.PI * 8;
    const radius = (1 - t) * 4;

    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = (t - 0.5) * 6;
    positions[i * 3 + 2] = Math.sin(angle) * radius;
  }
  return positions;
}

export { PARTICLE_COUNT };

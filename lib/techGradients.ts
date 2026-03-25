export const techGradients: Record<string, { from: string; to: string }> = {
  "React": { from: "from-blue-500/20", to: "to-cyan-400/20" },
  "Next.js": { from: "from-slate-500/20", to: "to-gray-300/10" },
  "TypeScript": { from: "from-blue-600/20", to: "to-blue-400/20" },
  "Python": { from: "from-yellow-500/20", to: "to-green-500/20" },
  "Node.js": { from: "from-green-500/20", to: "to-emerald-400/20" },
  "C": { from: "from-indigo-500/20", to: "to-slate-400/20" },
  "C++": { from: "from-purple-500/20", to: "to-blue-500/20" },
  "Vue": { from: "from-emerald-500/20", to: "to-green-400/20" },
  "MongoDB": { from: "from-green-600/20", to: "to-lime-400/20" },
  "Java": { from: "from-red-500/20", to: "to-orange-400/20" },
  "Tailwind CSS": { from: "from-cyan-500/20", to: "to-teal-400/20" },
  "default": { from: "from-teal/20", to: "to-mint/20" },
};

export function getGradient(tech: string) {
  return techGradients[tech] || techGradients["default"];
}

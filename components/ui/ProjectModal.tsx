"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/lib/content";
import { MagneticButton } from "./MagneticButton";
import { LuGithub, LuX } from "react-icons/lu";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-[var(--bg-secondary)] border border-white/10 rounded-2xl p-8 max-h-[80vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
              data-magnetic
            >
              <LuX size={20} />
            </button>

            <h2 className="font-display text-3xl font-bold mb-4">{project.title}</h2>
            <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
              {project.longDescription}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-sm font-mono rounded-md bg-teal/10 text-teal border border-teal/20"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              <MagneticButton href={project.githubUrl} external>
                <LuGithub size={18} />
                View on GitHub
              </MagneticButton>
              {project.liveUrl && (
                <MagneticButton href={project.liveUrl} external>
                  Live Site
                </MagneticButton>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

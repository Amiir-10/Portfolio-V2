"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/lib/content";
import { useTheme } from "@/hooks/useTheme";
import { LuSun, LuMoon } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 right-8 z-40 flex items-center gap-6 px-6 py-3 rounded-full border border-white/10 bg-[var(--bg-primary)]/70 backdrop-blur-xl"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector(link.href);
                target?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`text-sm font-medium transition-colors duration-200 ${
                activeSection === link.href.slice(1)
                  ? "text-teal"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
              data-magnetic
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
            data-magnetic
          >
            <motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {theme === "dark" ? <LuSun size={16} /> : <LuMoon size={16} />}
            </motion.div>
          </button>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

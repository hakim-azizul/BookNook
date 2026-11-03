"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi2";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    // Render a subtle placeholder with matching dimensions to prevent hydration layout shift
    return (
      <div
        className={`w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 animate-pulse ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative p-2.5 rounded-xl border transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff5b49]/40 ${
        isDark
          ? "bg-neutral-900/90 border-neutral-700/80 text-amber-400 hover:text-amber-300 hover:bg-neutral-800 hover:border-amber-500/40 shadow-sm"
          : "bg-white/90 border-neutral-200/90 text-neutral-700 hover:text-[#ff5b49] hover:bg-neutral-100 hover:border-neutral-300 shadow-xs"
      } ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <HiOutlineSun className="w-5 h-5 transition-transform duration-300 rotate-0 hover:rotate-45" />
        ) : (
          <HiOutlineMoon className="w-5 h-5 transition-transform duration-300 rotate-0 hover:-rotate-12" />
        )}
      </div>
    </button>
  );
}

"use client";

import React, { createContext, useContext, useEffect, useState, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "booknook-theme";

function applyThemeToDocument(targetTheme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (targetTheme === "dark") {
    root.classList.add("dark");
    root.setAttribute("data-theme", "dark");
  } else {
    root.classList.remove("dark");
    root.setAttribute("data-theme", "light");
  }
}

// Subscribe helper for external store
const emptySubscribe = () => () => {};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Safe client-side check via useSyncExternalStore (React 18 & 19 recommended practice)
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
      if (stored === "light" || stored === "dark") {
        applyThemeToDocument(stored);
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        applyThemeToDocument(prefersDark ? "dark" : "light");
      }
    } catch {
      // Fallback
    }
  }, []);

  const setTheme = (targetTheme: Theme) => {
    setThemeState(targetTheme);
    applyThemeToDocument(targetTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, targetTheme);
    } catch {
      // Ignore
    }
  };

  const toggleTheme = () => {
    // Read actual active theme from DOM class to guarantee synchronization
    const isCurrentlyDark = document.documentElement.classList.contains("dark");
    const nextTheme: Theme = isCurrentlyDark ? "light" : "dark";
    setTheme(nextTheme);
  };

  // Determine current active theme
  const currentTheme: Theme = mounted && typeof document !== "undefined"
    ? document.documentElement.classList.contains("dark") ? "dark" : "light"
    : theme;

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme, setTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

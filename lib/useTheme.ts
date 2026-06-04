"use client";

import { useEffect, useState } from "react";

/**
 * Minimal dark-mode hook.
 *
 * - Reads the saved preference (or the OS preference) on first mount.
 * - Toggling adds/removes the `dark` class on <html>, which Tailwind's
 *   class-based dark mode keys off of.
 * - Persists the choice to localStorage so it survives reloads.
 *
 * Kept deliberately small and dependency-free — no theme provider needed.
 */

const STORAGE_KEY = "codobux-cms-theme";

export function useTheme() {
  const [isDark, setIsDark] = useState(false);
  const [ready, setReady] = useState(false);

  // Initialise from storage / OS preference after mount (client-only).
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const prefersDark =
      saved === "dark" ||
      (saved === null &&
        window.matchMedia?.("(prefers-color-scheme: dark)").matches);
    setIsDark(prefersDark);
    setReady(true);
  }, []);

  // Reflect state onto <html> and persist it.
  useEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
  }, [isDark, ready]);

  return { isDark, toggle: () => setIsDark((v) => !v) };
}

"use client";

import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ theme, onToggle, showLabel = false }) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      onClick={onToggle}
      className={`theme-switch ${
        showLabel ? "w-full justify-between px-5" : "w-[6.4rem] justify-between px-2"
      }`}
    >
      <span className="relative z-10 flex items-center gap-2">
        <Sun
          size={16}
          className={`transition-all duration-300 ${
            isDark ? "scale-75 text-ink/35 opacity-40" : "scale-100 text-kiln opacity-100"
          }`}
        />
        {showLabel && (
          <span className="font-body text-sm font-semibold text-ink">
            {isDark ? "Dark" : "Light"}
          </span>
        )}
      </span>

      <span
        className={`theme-switch-thumb ${
          isDark ? (showLabel ? "translate-x-[calc(100vw-8.8rem)]" : "translate-x-[3.1rem]") : "translate-x-0"
        }`}
      >
        {isDark ? <Moon size={15} /> : <Sun size={15} />}
      </span>

      <span className="relative z-10 flex items-center gap-2">
        {showLabel && (
          <span className="font-body text-sm font-semibold text-ink">
            {isDark ? "mode" : "mode"}
          </span>
        )}
        <Moon
          size={16}
          className={`transition-all duration-300 ${
            isDark ? "scale-100 text-lavender opacity-100" : "scale-75 text-ink/35 opacity-40"
          }`}
        />
      </span>
    </button>
  );
}

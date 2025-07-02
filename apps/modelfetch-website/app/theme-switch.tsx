"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2 text-xs">
      <Sun className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
      <button
        aria-label="Toggle theme"
        className="relative inline-flex h-5 w-9 items-center rounded-full bg-gray-300 dark:bg-gray-600 transition-colors hover:bg-gray-400 dark:hover:bg-gray-500"
        onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark");
        }}
      >
        <span className="inline-block h-3 w-3 transform rounded-full bg-white transition-transform translate-x-1 dark:translate-x-5" />
      </button>
      <Moon className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
    </div>
  );
}
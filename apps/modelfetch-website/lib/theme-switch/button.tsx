"use client";

import { useTheme } from "next-themes";

export function Button() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      aria-label="Toggle theme"
      className="relative inline-flex h-5 w-9 items-center rounded-full bg-gray-300 transition-colors hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
    >
      <span className="inline-block h-3 w-3 translate-x-1 transform rounded-full bg-white transition-transform dark:translate-x-5" />
    </button>
  );
}

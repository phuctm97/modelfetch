import type { ReactNode } from "react";

import { SearchButton } from "~/lib/search-button";
import { ThemeSwitch } from "~/lib/theme-switch";

interface TerminalHeaderProps {
  title?: string;
  searchButton?: boolean;
  themeSwitch?: boolean;
  actions?: ReactNode;
}

export function TerminalHeader({
  title = "terminal % ~",
  searchButton = true,
  themeSwitch = true,
  actions,
}: TerminalHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 shadow-md dark:border-[#333] dark:bg-[#2a2a2a] dark:shadow-none">
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
        <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">
          {title}
        </span>
      </div>
      <div className="flex items-center gap-3">
        {searchButton && <SearchButton />}
        {themeSwitch && <ThemeSwitch />}
        {actions}
      </div>
    </div>
  );
}

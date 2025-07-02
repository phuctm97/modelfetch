import { Moon, Sun } from "lucide-react";

import { Button } from "./button";

export function ThemeSwitch() {
  return (
    <div className="flex items-center gap-2 text-xs">
      <Sun className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
      <Button />
      <Moon className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
    </div>
  );
}

import type { ReactNode } from "react";

interface FooterTerminalProps {
  prompt?: string;
  command?: string;
  children?: ReactNode;
}

export function FooterTerminal({
  prompt = "~",
  command,
  children,
}: FooterTerminalProps) {
  return (
    <div className="mt-12 text-center text-xs text-gray-600 dark:text-gray-400">
      {children ?? (
        <div>
          <span className="text-[#008f00] dark:text-[#00ff00]">{prompt}</span>{" "}
          {command ?? 'echo "Built with ❤️ by developers, for developers"'}
        </div>
      )}
    </div>
  );
}

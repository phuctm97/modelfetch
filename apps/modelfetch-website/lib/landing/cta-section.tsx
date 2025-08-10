import type { ReactNode } from "react";

import Link from "next/link";

interface CtaButton {
  href: string;
  label: string;
  icon?: ReactNode;
  external?: boolean;
  variant?: "github" | "discord" | "youtube" | "default";
}

interface CtaSectionProps {
  message?: ReactNode;
  buttons?: CtaButton[];
}

function getButtonClasses(variant: CtaButton["variant"] = "default") {
  switch (variant) {
    case "github": {
      return "inline-flex items-center justify-center rounded bg-gray-700 px-6 py-3 font-bold text-white transition-all hover:scale-105 hover:bg-gray-800 hover:shadow-[0_0_20px_rgba(100,100,100,0.8)] dark:bg-gray-300 dark:text-black dark:hover:bg-gray-200 dark:hover:shadow-[0_0_20px_rgba(200,200,200,0.8)]";
    }
    case "discord": {
      return "inline-flex items-center justify-center rounded bg-[#5865F2] px-6 py-3 font-bold text-white transition-all hover:scale-105 hover:bg-[#4752C4] hover:shadow-[0_0_20px_rgba(88,101,242,0.8)]";
    }
    case "youtube": {
      return "inline-flex items-center justify-center rounded bg-[#FF0000] px-6 py-3 font-bold text-white transition-all hover:scale-105 hover:bg-[#CC0000] hover:shadow-[0_0_20px_rgba(255,0,0,0.8)]";
    }
    default: {
      return "inline-flex items-center justify-center rounded bg-[#008f00] px-6 py-3 font-bold text-white transition-all hover:scale-105 hover:bg-[#006f00] hover:shadow-[0_0_20px_rgba(0,143,0,0.8)] dark:bg-[#00ff00] dark:text-black dark:hover:bg-[#00dd00] dark:hover:shadow-[0_0_20px_rgba(0,255,0,0.8)]";
    }
  }
}

export function CtaSection({ message, buttons = [] }: CtaSectionProps) {
  return (
    <section className="text-center">
      <div className="w-full rounded-lg border border-gray-300 bg-gray-100 p-4 sm:inline-block sm:w-auto sm:p-6 dark:border-[#333] dark:bg-[#1a1a1a]">
        {message && (
          <p className="mb-6 text-gray-600 dark:text-gray-400">{message}</p>
        )}
        {buttons.length > 0 && (
          <div className="flex flex-col gap-3">
            {buttons.map((button) => (
              <Link
                key={button.href}
                className={getButtonClasses(button.variant)}
                href={button.href}
                {...(button.external
                  ? {
                      rel: "noopener noreferrer",
                      target: "_blank",
                    }
                  : {})}
              >
                {button.icon}
                {button.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

import type { ReactNode } from "react";

import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";

import { SectionHeading } from "./section-heading";

interface QuickStartSectionProps {
  title?: ReactNode;
  command: string;
  lang?: string;
  description?: ReactNode;
}

export function QuickStartSection({
  title = "Quick Start",
  command,
  lang = "bash",
  description,
}: QuickStartSectionProps) {
  return (
    <section className="mb-12">
      <SectionHeading>{title}</SectionHeading>

      <div className="text-center">
        <div className="group relative mx-auto w-full sm:max-w-lg">
          <div className="relative overflow-hidden rounded-lg border-2 border-[#008f00] bg-gray-900 p-6 shadow-[0_0_30px_rgba(0,143,0,0.3)] transition-all duration-300 group-hover:shadow-[0_0_50px_rgba(0,143,0,0.6)] dark:border-[#00ff00] dark:bg-black dark:shadow-[0_0_30px_rgba(0,255,0,0.3)] dark:group-hover:shadow-[0_0_50px_rgba(0,255,0,0.6)]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#008f00] to-transparent opacity-0 transition-all duration-1000 group-hover:translate-y-[200px] group-hover:opacity-100 dark:via-[#00ff00]" />

            <div className="pointer-events-none absolute -top-2 -left-2 text-xs text-[#00ff00]/20 transition-all duration-300 group-hover:text-[#00ff00]/60 dark:text-[#00ff00]/20 dark:group-hover:text-[#00ff00]/60">
              10101
              <br />
              01010
              <br />
              11001
            </div>
            <div className="pointer-events-none absolute -top-2 -right-2 text-xs text-[#00ff00]/20 transition-all duration-300 group-hover:text-[#00ff00]/60 dark:text-[#00ff00]/20 dark:group-hover:text-[#00ff00]/60">
              10101
              <br />
              01010
              <br />
              11001
            </div>

            <div className="pointer-events-none absolute inset-0 bg-[#008f00]/5 opacity-0 mix-blend-screen transition-opacity duration-100 group-hover:animate-pulse dark:bg-[#00ff00]/5" />

            <div className="mb-2 flex items-center gap-2 text-xs text-[#00ff00]/60 transition-all duration-300 group-hover:text-[#00ff00] dark:text-[#00ff00]/60 dark:group-hover:text-[#00ff00]">
              <span className="animate-pulse">▶</span>
              <span>EXECUTE COMMAND</span>
            </div>

            <DynamicCodeBlock code={command} lang={lang} />
          </div>
        </div>

        {description && (
          <p className="mt-6 text-gray-600 dark:text-gray-400">{description}</p>
        )}
      </div>
    </section>
  );
}

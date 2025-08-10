import type { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

export function FeatureCard({
  title,
  description,
  icon = "◈",
}: FeatureCardProps) {
  return (
    <div className="group rounded border border-gray-300 bg-white p-4 shadow-md transition-all hover:border-[#008f00] hover:shadow-[0_0_20px_rgba(0,143,0,0.3)] sm:p-6 dark:border-[#333] dark:bg-[#1a1a1a] dark:shadow-none dark:hover:border-[#00ff00] dark:hover:shadow-[0_0_20px_rgba(0,255,0,0.3)]">
      <h3 className="mb-3 text-xl font-semibold text-[#008f00] transition-colors group-hover:text-[#0099cc] dark:text-[#00ff00] dark:group-hover:text-[#00ffff]">
        <span className="mr-2">{icon}</span>
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

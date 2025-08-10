import type { ReactNode } from "react";

import { FeatureCard } from "./feature-card";

interface Feature {
  title: string;
  description: string;
  icon?: ReactNode;
}

interface FeaturesSectionProps {
  title?: ReactNode;
  features: Feature[];
  columns?: 1 | 2 | 3 | 4;
}

export function FeaturesSection({
  title,
  features,
  columns = 3,
}: FeaturesSectionProps) {
  const gridClass = {
    1: "grid gap-8",
    2: "grid gap-8 lg:grid-cols-2",
    3: "grid gap-8 lg:grid-cols-3",
    4: "grid gap-8 lg:grid-cols-4",
  }[columns];

  return (
    <section className="mb-12">
      {title && (
        <h2 className="mb-8 text-center text-3xl font-bold text-[#0099cc] drop-shadow-[0_0_10px_rgba(0,153,204,0.5)] dark:text-[#00ffff] dark:drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
          {title}
        </h2>
      )}
      <div className={gridClass}>
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            description={feature.description}
            icon={feature.icon}
            title={feature.title}
          />
        ))}
      </div>
    </section>
  );
}

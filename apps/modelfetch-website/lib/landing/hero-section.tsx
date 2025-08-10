import type { PropsWithChildren, ReactNode } from "react";

import Link from "next/link";

interface HeroSectionProps {
  logo?: ReactNode;
  title: ReactNode;
  description: ReactNode;
  primaryCta?: {
    href: string;
    label: string;
    icon?: ReactNode;
  };
  secondaryCta?: {
    href: string;
    label: string;
    icon?: ReactNode;
  };
  links?: {
    href: string;
    label: string;
    icon?: ReactNode;
    external?: boolean;
  }[];
  glitchEffect?: string;
  neonGlow?: boolean;
}

function InlineBlock({ children }: PropsWithChildren) {
  return <span className="inline-block">{children}</span>;
}

export function HeroSection({
  logo,
  title,
  description,
  primaryCta,
  secondaryCta,
  links,
  glitchEffect,
  neonGlow = true,
}: HeroSectionProps) {
  const titleClasses = [
    "mb-6 text-5xl font-bold text-[#008f00] dark:text-[#00ff00]",
    neonGlow &&
      "drop-shadow-[0_0_20px_rgba(0,143,0,0.5)] dark:drop-shadow-[0_0_20px_rgba(0,255,0,0.5)]",
    glitchEffect,
  ]
    .filter(Boolean)
    .join(" ");

  const primaryCtaClasses = [
    "inline-flex items-center justify-center rounded bg-[#008f00] px-4 py-3 font-bold text-white transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(0,143,0,0.8)] sm:px-6 dark:bg-[#00ff00] dark:text-black dark:hover:shadow-[0_0_20px_rgba(0,255,0,0.8)]",
    glitchEffect,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className="mb-12 text-center">
      {logo && <div className="mb-6 inline-block">{logo}</div>}

      <h1 className={titleClasses}>{title}</h1>

      <div className="mb-8">{description}</div>

      {(primaryCta ?? secondaryCta) && (
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
          {primaryCta && (
            <Link className={primaryCtaClasses} href={primaryCta.href}>
              {primaryCta.icon}
              {primaryCta.label}
            </Link>
          )}
          {secondaryCta && (
            <Link
              className="inline-flex items-center justify-center rounded border-2 border-[#0099cc] px-4 py-3 text-[#0099cc] transition-all hover:bg-[#0099cc] hover:text-white hover:shadow-[0_0_20px_rgba(0,153,204,0.8)] sm:px-6 dark:border-[#00ffff] dark:text-[#00ffff] dark:hover:bg-[#00ffff] dark:hover:text-black dark:hover:shadow-[0_0_20px_rgba(0,255,255,0.8)]"
              href={secondaryCta.href}
            >
              {secondaryCta.icon}
              {secondaryCta.label}
            </Link>
          )}
        </div>
      )}

      {links && links.length > 0 && (
        <div className="mt-4 flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              className="inline-flex items-center text-gray-600 underline decoration-gray-400 underline-offset-4 transition-all hover:text-gray-800 hover:decoration-gray-800 dark:text-gray-400 dark:decoration-gray-600 dark:hover:text-gray-200 dark:hover:decoration-gray-200"
              href={link.href}
              {...(link.external
                ? {
                    rel: "noopener noreferrer",
                    target: "_blank",
                  }
                : {})}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export { InlineBlock };

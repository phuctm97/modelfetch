import type { ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
  icon?: ReactNode;
  color?: "primary" | "secondary";
}

export function SectionHeading({
  children,
  icon = "›",
  color = "secondary",
}: SectionHeadingProps) {
  const colorClasses = {
    primary:
      "text-[#008f00] drop-shadow-[0_0_10px_rgba(0,143,0,0.5)] dark:text-[#00ff00] dark:drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]",
    secondary:
      "text-[#0099cc] drop-shadow-[0_0_10px_rgba(0,153,204,0.5)] dark:text-[#00ffff] dark:drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]",
  };

  return (
    <h2
      className={`mb-8 text-center text-3xl font-bold ${colorClasses[color]}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </h2>
  );
}

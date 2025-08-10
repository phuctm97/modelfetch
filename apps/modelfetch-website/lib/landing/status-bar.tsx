import Link from "next/link";

interface StatusBarProps {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  pulseIndicator?: boolean;
}

export function StatusBar({
  label,
  value,
  href,
  external = false,
  pulseIndicator = true,
}: StatusBarProps) {
  const content = (
    <div className="flex items-center justify-center gap-2">
      {pulseIndicator && (
        <span className="animate-pulse text-green-500">●</span>
      )}
      <span className="text-gray-600 dark:text-gray-400">
        {label}: {value}
      </span>
    </div>
  );

  if (href) {
    return (
      <div className="mb-12 text-center">
        <Link
          className="inline-block rounded border border-gray-300 bg-gray-100 px-4 py-2 text-sm transition-all hover:border-gray-400 hover:bg-gray-200 dark:border-[#333] dark:bg-[#1a1a1a] dark:hover:border-[#555] dark:hover:bg-[#2a2a2a]"
          href={href}
          {...(external
            ? {
                rel: "noopener noreferrer",
                target: "_blank",
              }
            : {})}
        >
          {content}
        </Link>
      </div>
    );
  }

  return (
    <div className="mb-12 text-center">
      <div className="inline-block rounded border border-gray-300 bg-gray-100 px-4 py-2 text-sm dark:border-[#333] dark:bg-[#1a1a1a]">
        {content}
      </div>
    </div>
  );
}

"use client";

import { useEffect,useState } from "react";

import { TerminalTyping } from "./terminal-animations";

export function HeroTitle() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <h1 className="text-5xl font-bold mb-6 text-[#008f00] dark:text-[#00ff00] drop-shadow-[0_0_20px_rgba(0,143,0,0.5)] dark:drop-shadow-[0_0_20px_rgba(0,255,0,0.5)] neon-glow">
      {mounted ? <TerminalTyping delay={100} text="ModelFetch" /> : "ModelFetch"}
    </h1>
  );
}
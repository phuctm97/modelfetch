"use client";

import { useEffect } from "react";

export function Raining() {
  useEffect(() => {
    const canvasElement = document.querySelector("#matrix");
    if (!(canvasElement instanceof HTMLCanvasElement)) return;

    const canvas = canvasElement; // Now TypeScript knows this is HTMLCanvasElement
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    const chars =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) drops[i] = 1;

    function draw() {
      if (!ctx) return;

      // Check if light mode
      const isLightMode = matchMedia("(prefers-color-scheme: light)").matches;

      ctx.fillStyle = isLightMode
        ? "rgba(240, 240, 240, 0.05)"
        : "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = isLightMode ? "#008f00" : "#00ff00";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975)
          drops[i] = 0;

        drops[i]++;
      }
    }

    const interval = setInterval(draw, 35);

    const handleResize = () => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
    };

    // Listen for theme changes
    const mediaQuery = matchMedia("(prefers-color-scheme: light)");
    const handleThemeChange = () => {
      // Force redraw with new colors
      draw();
    };

    addEventListener("resize", handleResize);
    mediaQuery.addEventListener("change", handleThemeChange);

    return () => {
      clearInterval(interval);
      removeEventListener("resize", handleResize);
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);
  return (
    <canvas
      className="fixed inset-0 z-0 opacity-5 dark:opacity-10"
      id="matrix"
      style={{ pointerEvents: "none" }}
    />
  );
}

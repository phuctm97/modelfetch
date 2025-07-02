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

      // Check if dark mode by looking for .dark class
      const isDarkMode = document.documentElement.classList.contains("dark");

      ctx.fillStyle = isDarkMode
        ? "rgba(0, 0, 0, 0.05)"
        : "rgba(240, 240, 240, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = isDarkMode ? "#00ff00" : "#008f00";
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

    // Listen for theme changes via class mutation
    const observer = new MutationObserver(() => {
      // Force redraw with new colors when dark class changes
      draw();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);
  return (
    <canvas
      className="fixed inset-0 z-10 opacity-10"
      id="matrix"
      style={{ pointerEvents: "none" }}
    />
  );
}

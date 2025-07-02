"use client";

import { useMounted } from "@mantine/hooks";
import { useEffect, useState } from "react";

interface ComponentProps {
  text: string;
  delay?: number;
}

function Component({ text, delay = 50 }: ComponentProps) {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, delay);

    // Blinking cursor
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, [text, delay]);

  return (
    <span>
      {displayText}
      <span
        className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}
      >
        _
      </span>
    </span>
  );
}

export interface TypingProps {
  children: string;
}

export function Typing({ children }: TypingProps) {
  const mounted = useMounted();
  return mounted ? <Component delay={100} text={children} /> : children;
}

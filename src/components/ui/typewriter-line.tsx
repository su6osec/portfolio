"use client";

import { useEffect, useState } from "react";

type Props = {
  text: string;
  className?: string;
  typingSpeedMs?: number;
  startDelayMs?: number;
};

export function TypewriterLine({ text, className, typingSpeedMs = 42, startDelayMs = 400 }: Props) {
  const [shown, setShown] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = window.setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length && interval) {
          clearInterval(interval);
          interval = undefined;
        }
      }, typingSpeedMs);
    }, startDelayMs);

    return () => {
      window.clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [text, typingSpeedMs, startDelayMs]);

  useEffect(() => {
    const t = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <span className={className}>
      {shown}
      <span
        className={`ml-0.5 inline-block w-[2px] align-middle ${showCursor ? "opacity-100" : "opacity-30"} bg-accent`}
        style={{ height: "1.05em" }}
        aria-hidden
      />
    </span>
  );
}

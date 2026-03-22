"use client";

import { useEffect, useState } from "react";

const TYPING_MS = 36;
const DELETE_MS = 22;
const PAUSE_AT_END_MS = 2600;
const PAUSE_BEFORE_DELETE_MS = 450;

type Phase = "typing" | "pause" | "deleting";

type Props = {
  lines: readonly string[];
  className?: string;
};

export function RotatingTypewriter({ lines, className }: Props) {
  const [lineIndex, setLineIndex] = useState(0);
  const [shown, setShown] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");
  const [showCursor, setShowCursor] = useState(true);

  const full = lines[lineIndex % lines.length] ?? "";

  useEffect(() => {
    if (phase !== "typing") return;
    if (full.length === 0) {
      setLineIndex((i) => (i + 1) % lines.length);
      return;
    }
    if (shown.length >= full.length) return;
    const t = window.setTimeout(() => {
      setShown(full.slice(0, shown.length + 1));
    }, TYPING_MS);
    return () => window.clearTimeout(t);
  }, [phase, shown, full, full.length, lineIndex, lines.length]);

  useEffect(() => {
    if (phase !== "typing") return;
    if (full.length === 0) return;
    if (shown.length !== full.length) return;
    const t = window.setTimeout(() => setPhase("pause"), PAUSE_AT_END_MS);
    return () => window.clearTimeout(t);
  }, [phase, shown, full, full.length]);

  useEffect(() => {
    if (phase !== "pause") return;
    const t = window.setTimeout(() => setPhase("deleting"), PAUSE_BEFORE_DELETE_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "deleting") return;
    if (shown.length > 0) {
      const t = window.setTimeout(() => setShown((s) => s.slice(0, -1)), DELETE_MS);
      return () => window.clearTimeout(t);
    }
    const id = window.requestAnimationFrame(() => {
      setLineIndex((i) => (i + 1) % lines.length);
      setPhase("typing");
    });
    return () => window.cancelAnimationFrame(id);
  }, [phase, shown, lines.length]);

  useEffect(() => {
    const t = window.setInterval(() => setShowCursor((c) => !c), 530);
    return () => window.clearInterval(t);
  }, []);

  return (
    <span className={["capitalize", className].filter(Boolean).join(" ")}>
      {shown}
      <span
        className={`ml-0.5 inline-block w-[2px] align-middle ${showCursor ? "opacity-100" : "opacity-25"} bg-fuchsia-400`}
        style={{ height: "1.05em" }}
        aria-hidden
      />
    </span>
  );
}

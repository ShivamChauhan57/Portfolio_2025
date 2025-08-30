// components/fx/CursorGlow.tsx
"use client";
import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const move = (e: MouseEvent) => {
      // Follow cursor with slight easing via CSS vars
      el.style.setProperty("--x", e.clientX + "px");
      el.style.setProperty("--y", e.clientY + "px");
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          "radial-gradient(600px circle at var(--x,50vw) var(--y,40vh), rgba(10,132,255,.12), transparent 60%)",
      }}
    />
  );
}

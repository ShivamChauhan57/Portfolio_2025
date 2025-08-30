// components/ui/iOS.tsx
import * as React from "react";
import clsx from "clsx";

export function iOSCard({ className, children }: React.PropsWithChildren<{className?: string}>) {
  return (
    <div
      className={clsx(
        "rounded-3xl border border-iosBorder/60 bg-iosCard backdrop-blur-md",
        "shadow-ios hover:shadow-iosLift transition-shadow",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Pill({ className, children }: React.PropsWithChildren<{className?: string}>) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 rounded-pill border border-iosBorder/60",
        "bg-white/70 backdrop-blur px-3 py-1 text-sm",
        className
      )}
    >
      {children}
    </span>
  );
}

export function SectionTitle({ kicker, title, right }: { kicker?: string; title: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 mb-5">
      <div>
        {kicker && <div className="text-xs uppercase tracking-wider text-zinc-500">{kicker}</div>}
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      </div>
      {right}
    </div>
  );
}

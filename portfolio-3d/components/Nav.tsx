// components/Nav.tsx
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const ids = ["top", "projects", "roadmap", "skills", "contact"] as const;

export default function Nav() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-iosBorder/60 bg-white/70 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a href="#top" className="font-semibold">Shivam Chauhan</a>
        <div className="flex gap-1 p-1 rounded-pill border border-iosBorder/60 bg-white/70 backdrop-blur">
          {ids.slice(1).map((id) => (
            <Link
              key={id}
              href={`/#${id}`}
              className={`px-3 py-1 rounded-pill text-sm transition ${
                active === id ? "bg-accent text-white" : "hover:bg-white"
              }`}
            >
              {id}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

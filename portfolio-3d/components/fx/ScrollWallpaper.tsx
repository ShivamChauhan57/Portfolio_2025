// components/fx/ScrollWallpaper.tsx
"use client";
import { useScroll, useTransform, motion } from "framer-motion";

export default function ScrollWallpaper() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]); // subtle parallax

  return (
    <motion.div
      style={{ y }}
      className="fixed inset-0 -z-10"
    >
      {/* soft gradient + texture */}
      <div className="absolute inset-0 bg-[radial-gradient(1000px_700px_at_20%_-10%,#dbeafe_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_80%_-10%,#e0f2fe_0%,transparent_55%)]" />
      <div className="absolute inset-0 opacity-[.05] [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]" />
    </motion.div>
  );
}

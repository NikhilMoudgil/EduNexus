"use client";
import { useState } from "react";

export default function Avatar({ src, name, className = "h-11 w-11" }: { src?: string | null; name?: string | null; className?: string }) {
  const [failed, setFailed] = useState(false);
  const base = `${className} shrink-0 overflow-hidden rounded-full border border-white/10`;
  if (!src || failed) {
    return (
      <div className={`${base} flex items-center justify-center bg-gradient-to-tr from-cyan-500 to-blue-600 text-sm font-bold uppercase`}>
        {name?.[0] || "?"}
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img key={src} src={src} alt="" referrerPolicy="no-referrer" onError={() => setFailed(true)} className={`${base} object-cover`} />
  );
}

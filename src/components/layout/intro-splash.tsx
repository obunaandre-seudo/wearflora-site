"use client";

import { useEffect, useState } from "react";
import { Bloom } from "@/components/ui/bloom-loader";

const KEY = "wf-intro-seen";

/**
 * One-time branded intro per browser session. The layout's inline script adds `wf-seen`
 * to <html> on repeat visits so the overlay never flashes again.
 */
export function IntroSplash() {
  const [phase, setPhase] = useState<"show" | "leave" | "gone">("show");

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY)) {
        setPhase("gone");
        return;
      }
      sessionStorage.setItem(KEY, "1");
    } catch {}
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const leave = setTimeout(() => setPhase("leave"), reduced ? 300 : 1900);
    const gone = setTimeout(() => setPhase("gone"), reduced ? 500 : 2600);
    return () => {
      clearTimeout(leave);
      clearTimeout(gone);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div className={`wf-splash ${phase === "leave" ? "wf-splash-leave" : ""}`} aria-hidden="true">
      <div className="flex flex-col items-center">
        <Bloom size={132} />
        <p className="wf-splash-word mt-6 font-display text-5xl font-semibold text-brand-700 sm:text-6xl">Wearflora</p>
        <p className="wf-splash-tag mt-3 text-[11px] font-medium uppercase tracking-[0.4em] text-brand-500">Wear your bloom</p>
        <span className="wf-splash-line mt-8 block h-px w-40 bg-gradient-to-r from-transparent via-solar-500 to-transparent" />
      </div>
    </div>
  );
}

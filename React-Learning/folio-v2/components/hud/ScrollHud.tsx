"use client";
/**
 * components/hud/ScrollHud.tsx
 * ---------------------------------------------------------------------------
 * A small fixed heads-up display in the corner that mirrors the spaceship's
 * state: "HULL INTEGRITY" drops from 100% to 0% as you scroll down (and the
 * ship explodes), and recovers as you scroll up (and it re-assembles).
 *
 * Uses the same getScrollProgress() as the three.js scene so both stay in sync.
 */
import { useEffect, useState, type CSSProperties } from "react";
import { getScrollProgress } from "@/lib/scroll";

/** Status labels keyed by minimum integrity percentage. */
function statusFor(integrity: number) {
  if (integrity > 80) return "NOMINAL";
  if (integrity > 50) return "HULL STRESS";
  if (integrity > 20) return "CRITICAL";
  return "BREACH";
}

export default function ScrollHud() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    // Throttle scroll updates to one per animation frame.
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setProgress(getScrollProgress()));
    };
    onScroll(); // initialise for mid-page reloads
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const integrity = Math.round((1 - progress) * 100);

  return (
    // aria-hidden: decorative; the info is purely visual flavour.
    <div className="hud" aria-hidden="true">
      <div className="hud__row">
        <span>HULL INTEGRITY</span>
        <span className="hud__value">
          {integrity.toString().padStart(3, "0")}%
        </span>
      </div>
      {/* Meter fill width is driven by a CSS custom property. */}
      <div
        className="hud__meter"
        style={{ "--fill": `${integrity}%` } as CSSProperties}
      >
        <span className="hud__fill" />
      </div>
      <div className="hud__row hud__row--dim">
        <span>STATUS</span>
        <span className={integrity <= 20 ? "hud__alert" : undefined}>
          {statusFor(integrity)}
        </span>
      </div>
    </div>
  );
}

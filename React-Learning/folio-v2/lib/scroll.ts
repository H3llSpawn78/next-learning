/**
 * lib/scroll.ts
 * ---------------------------------------------------------------------------
 * Shared scroll helpers used by both the three.js scene and the HUD overlay,
 * so they always agree on "how far down the page" the user is.
 */

/**
 * Returns normalised scroll progress for the whole document:
 *   0 = very top of the page, 1 = very bottom.
 * Safe to call every animation frame (only reads layout values).
 */
export function getScrollProgress(): number {
  const doc = document.documentElement;
  // Total scrollable distance = full document height minus one viewport.
  const max = doc.scrollHeight - window.innerHeight;
  if (max <= 0) return 0;
  // Clamp to [0, 1] to ignore iOS rubber-band overscroll values.
  return Math.min(Math.max(window.scrollY / max, 0), 1);
}

"use client";

/**
 * This file solves the MUI + Next.js App Router hydration issue.
 *
 * Problem:
 * - MUI uses Emotion for styling
 * - Server renders styles as <style> tags
 * - Client generates styles differently
 * → This causes hydration mismatch
 *
 * Solution:
 * - Create a shared Emotion cache
 * - Track inserted styles during SSR
 * - Inject them manually into HTML using Next.js hook
 */

import * as React from "react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useServerInsertedHTML } from "next/navigation";

/**
 * Create your MUI theme (can be customized later)
 */
const theme = createTheme();

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  /**
   * We use useState to ensure this only runs once per request/render
   *
   * It returns:
   * - cache → Emotion cache instance
   * - flush → function to get & reset inserted styles
   */
  const [{ cache, flush }] = React.useState(() => {
    /**
     * Create Emotion cache
     * key: unique identifier for styles
     * prepend: ensures MUI styles come first (important for overrides)
     */
    const cache = createCache({ key: "mui", prepend: true });

    /**
     * Enables compatibility mode for Emotion (fixes SSR edge cases)
     */
    cache.compat = true;

    /**
     * Store original insert method
     * We'll override it to track which styles are added
     */
    const prevInsert = cache.insert;

    /**
     * This array tracks all style "names" inserted during render
     */
    let inserted: string[] = [];

    /**
     * Override Emotion's insert function
     *
     * Every time a style is added:
     * - Capture its name
     * - Store it so we can inject it on server
     */
    cache.insert = (...args: Parameters<typeof prevInsert>) => {
      const serialized = args[1];

      /**
       * Only track styles that haven't already been inserted
       */
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }

      /**
       * Call original insert function to continue normal behavior
       */
      return prevInsert(...args);
    };

    /**
     * flush():
     * - Returns all collected style names
     * - Clears the list for next render
     *
     * This is critical for SSR to avoid duplicating styles
     */
    const flush = () => {
      const prev = inserted;
      inserted = [];
      return prev;
    };

    return { cache, flush };
  });

  /**
   * Next.js hook that lets us inject HTML during server rendering
   *
   * Here we:
   * - Get all styles used during render
   * - Convert them into a <style> tag
   * - Inject into server HTML
   *
   * This ensures server + client render match exactly ✅
   */
  useServerInsertedHTML(() => {
    const names = flush();

    /**
     * If no styles were added, do nothing
     */
    if (names.length === 0) return null;

    let styles = "";

    /**
     * Build the CSS string from Emotion's cache
     */
    for (const name of names) {
      styles += cache.inserted[name];
    }

    /**
     * Inject styles into the HTML
     *
     * data-emotion is used by Emotion to rehydrate on client
     */
    return (
      <style
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  /**
   * Wrap the app with:
   * - CacheProvider → gives Emotion cache to all components
   * - ThemeProvider → provides MUI theme
   */
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
}

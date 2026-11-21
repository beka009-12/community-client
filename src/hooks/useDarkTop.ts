"use client";

import { RefObject, useEffect } from "react";
import { heroTheme } from "@/src/lib/hero-theme";

// Keeps the sticky header dark while a dark block at the top of the page is
// still behind it. Rects come in zoomed pixels on wide screens, so the
// header is measured instead of read from --header-height.
export const useDarkTop = (ref: RefObject<HTMLElement | null>): void => {
  useEffect(() => {
    const block = ref.current;
    if (!block) return;
    const update = () => {
      const headerBottom = document.querySelector("header")?.getBoundingClientRect().bottom ?? 0;
      heroTheme.set(block.getBoundingClientRect().bottom > headerBottom);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      // The next page with a dark top starts dark again.
      heroTheme.set(true);
    };
  }, [ref]);
};

"use client";

import { FC, useEffect, useRef } from "react";
import scss from "./InteractiveGrid.module.scss";

// The mockup's «Интерактивная сетка» (a port of Magic UI's Interactive Grid
// Pattern): 48px cells skewed by 12°, faded out by a circular mask, and the
// cell under the pointer lights up. Static on touch screens.
const CELL = 48;
const SKEW = Math.tan((12 * Math.PI) / 180);
// The grid starts above the page so its skewed top edge never shows.
const GRID_TOP = -340;
// Cells left behind fade out one by one, so a few stay lit at once.
const TRAIL = 6;

interface InteractiveGridProps {
  variant: "home" | "section";
}

const InteractiveGrid: FC<InteractiveGridProps> = ({ variant }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let litKey: string | null = null;
    let next = 0;

    const darken = () => {
      cellsRef.current.forEach((cell) => cell?.removeAttribute("data-lit"));
      litKey = null;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || event.pointerType !== "mouse") return;
      const rect = box.getBoundingClientRect();
      // Rects are in zoomed pixels on wide screens (html zoom).
      const scale = rect.width / box.offsetWidth || 1;
      const x = (event.clientX - rect.left) / scale;
      const y = (event.clientY - rect.top) / scale;
      if (x < 0 || y < 0 || x >= box.offsetWidth || y >= box.offsetHeight) {
        if (litKey) darken();
        return;
      }
      const column = Math.floor(x / CELL);
      const row = Math.floor((y - GRID_TOP - x * SKEW) / CELL);
      const key = `${column}:${row}`;
      if (key === litKey) return;

      cellsRef.current.forEach((cell) => cell?.removeAttribute("data-lit"));
      const cell = cellsRef.current[next];
      next = (next + 1) % TRAIL;
      if (!cell) return;
      cell.style.translate = `${column * CELL}px ${row * CELL}px`;
      cell.setAttribute("data-lit", "");
      litKey = key;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", darken);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", darken);
    };
  }, []);

  return (
    <div ref={boxRef} className={`${scss.box} ${scss[`box--${variant}`]}`}>
      <div className={scss.grid}>
        {Array.from({ length: TRAIL }, (_, index) => (
          <span
            key={index}
            ref={(node) => {
              cellsRef.current[index] = node;
            }}
            className={scss.cell}
          />
        ))}
      </div>
    </div>
  );
};

export default InteractiveGrid;

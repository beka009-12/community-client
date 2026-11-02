// Scroll maths shared by the hero's canvas and its copy. The hero stays
// pinned while its logo scatters into dots, then the light page slides up
// over it; the page's top edge dissolves into halftone dots that grow as the
// edge passes them.

// Share of the stage height the dotted edge spans.
const EDGE_BAND = 0.4;

export const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

export const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

export interface HeroScroll {
  // 0 → 1 over the scroll before the light page shows up.
  scatter: number;
  // Where the light page's top edge is, in stage pixels (below 0 = past it).
  edge: number;
  height: number;
}

// The track is the pinned stage, the scatter runway, and one more stage
// height that the next section overlaps (it is pulled up by that much).
export const heroScroll = (track: HTMLElement, stage: HTMLElement): HeroScroll => {
  const height = stage.offsetHeight;
  const rect = track.getBoundingClientRect();
  const runway = track.offsetHeight - 2 * height;
  return {
    scatter: runway > 0 ? clamp01(-rect.top / runway) : 0,
    edge: rect.bottom - height,
    height,
  };
};

// How grown the halftone cell at height `y` is: full at the edge, nothing
// half a screen above it.
export const edgeCover = (y: number, scroll: HeroScroll): number =>
  clamp01(1 - (scroll.edge - y) / (EDGE_BAND * scroll.height));

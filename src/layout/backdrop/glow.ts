import type { CSSProperties } from "react";

// One blurred ellipse from the Figma «Фон» layer, in the mockup's 1440px
// frame: the ellipse's top-left corner before rotation, its size, rotation
// in Figma's sense (counter-clockwise), colour, fill opacity and layer blur.
export interface Glow {
  x: number;
  y: number;
  w: number;
  h: number;
  rot?: number;
  color: string;
  alpha: number;
  blur: number;
}

// Standard normal CDF via the Abramowitz–Stegun erf approximation (7.1.26).
const phi = (x: number): number => {
  const z = Math.abs(x) / Math.SQRT2;
  const t = 1 / (1 + 0.3275911 * z);
  const poly = ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t;
  const erf = 1 - poly * Math.exp(-z * z);
  return x >= 0 ? 0.5 * (1 + erf) : 0.5 * (1 - erf);
};

// A solid band of half-width `half` blurred with `sigma`, sampled `at` px
// from its middle.
const blurredBand = (half: number, sigma: number, at: number): number =>
  phi((half - at) / sigma) - phi((-half - at) / sigma);

const STOPS = 12;

const rgb = (hex: string): string => {
  const value = Number.parseInt(hex.slice(1), 16);
  return `${(value >> 16) & 255} ${(value >> 8) & 255} ${value & 255}`;
};

// Figma's layer blur redrawn as a radial gradient with the same Gaussian
// falloff. A gradient is painted once, so a drifting glow only moves a
// texture; a CSS blur filter would be recomputed on every frame.
export const glowStyle = (glow: Glow): CSSProperties => {
  // Figma's blur radius is about two standard deviations.
  const sigma = Math.max(glow.blur / 2, 1);
  const pad = sigma * 2.5;
  const halfW = glow.w / 2;
  const halfH = glow.h / 2;
  const centre = blurredBand(halfW, sigma, 0) * blurredBand(halfH, sigma, 0);
  const color = rgb(glow.color);

  const stops = Array.from({ length: STOPS + 1 }, (_, index) => {
    const t = index / STOPS;
    // Average of the falloff along both axes of the ellipse.
    const along =
      (blurredBand(halfW, sigma, t * (halfW + pad)) * blurredBand(halfH, sigma, 0) +
        blurredBand(halfW, sigma, 0) * blurredBand(halfH, sigma, t * (halfH + pad))) /
      2;
    const alpha = index === STOPS ? 0 : glow.alpha * Math.min(along, centre);
    return `rgb(${color} / ${alpha.toFixed(4)}) ${(t * 100).toFixed(1)}%`;
  });

  return {
    left: glow.x,
    top: glow.y,
    width: glow.w + pad * 2,
    height: glow.h + pad * 2,
    // Figma rotates around the node's top-left; the box is wider by the
    // blur on every side.
    transformOrigin: "0 0",
    transform: `rotate(${-(glow.rot ?? 0)}deg) translate(${-pad}px, ${-pad}px)`,
    background: `radial-gradient(closest-side, ${stops.join(", ")})`,
  };
};

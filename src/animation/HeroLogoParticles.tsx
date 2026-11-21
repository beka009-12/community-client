"use client";

import { FC, RefObject, useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

interface Particle {
  // Home in the logo.
  tx: number;
  ty: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  delay: number;
  color: string;
}

interface HeroLogoParticlesProps {
  // Where the logo sits; the canvas itself covers the whole hero, so the
  // dots fly in from its edges.
  markRef: RefObject<HTMLElement | null>;
  className?: string;
}

const SRC = "/brand/motion-logo-particles.png";
const OFFSCREEN_W = 320;
const OFFSCREEN_H = 220;

// Source PNG is 85x57. Its own wordmark row (y 42-53) clips the leading "C"
// and trailing "Y" against the canvas edges, so only the mark (y 0-34) is
// sampled from the bitmap; "COMMUNITY" is redrawn as real text instead.
const MARK_SOURCE_ROWS = 34;
const WORD_SOURCE_TOP = 42;
const WORD_SOURCE_BOTTOM = 53;

// Logo width the dot radii were tuned for.
const BASE_MARK_WIDTH = 480;

const sampleLogo = (img: HTMLImageElement) => {
  const off = document.createElement("canvas");
  off.width = OFFSCREEN_W;
  off.height = OFFSCREEN_H;
  const o = off.getContext("2d");
  if (!o) return [];

  const scale = Math.min((OFFSCREEN_W * 0.78) / img.width, (OFFSCREEN_H * 0.72) / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  const dx = (OFFSCREEN_W - dw) / 2;
  const dy = (OFFSCREEN_H - dh) / 2;
  o.drawImage(img, 0, 0, img.width, MARK_SOURCE_ROWS, dx, dy, dw, MARK_SOURCE_ROWS * scale);

  const wordTop = dy + WORD_SOURCE_TOP * scale;
  const wordBottom = dy + WORD_SOURCE_BOTTOM * scale;
  const gradient = o.createLinearGradient(0, wordTop, 0, wordBottom);
  gradient.addColorStop(0, "#bfe6ff");
  gradient.addColorStop(1, "#4fa8e0");
  o.font = `700 ${Math.round((wordBottom - wordTop) * 1.4)}px Inter, system-ui, sans-serif`;
  o.textAlign = "center";
  o.textBaseline = "middle";
  o.fillStyle = gradient;
  o.fillText("COMMUNITY", OFFSCREEN_W / 2, (wordTop + wordBottom) / 2);

  const data = o.getImageData(0, 0, OFFSCREEN_W, OFFSCREEN_H).data;
  const points: { x: number; y: number; color: string; wordmark: boolean }[] = [];
  // Symbol (upper) stays sparse/elegant; wordmark (lower) stays dense so every letter reads clearly.
  for (let y = 0; y < OFFSCREEN_H; y++) {
    const wordmark = y > OFFSCREEN_H * 0.57;
    const step = wordmark ? 2 : 3;
    if (y % step !== 0) continue;
    for (let x = 0; x < OFFSCREEN_W; x += step) {
      const i = (y * OFFSCREEN_W + x) * 4;
      const a = data[i + 3];
      if (a > 55 && (wordmark || Math.random() > 0.08)) {
        points.push({
          x: x / OFFSCREEN_W,
          y: y / OFFSCREEN_H,
          color: `rgba(${data[i]},${data[i + 1]},${data[i + 2]},${Math.min(1, a / 255)})`,
          wordmark,
        });
      }
    }
  }
  return points;
};

const HeroLogoParticles: FC<HeroLogoParticlesProps> = ({ markRef, className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = SRC;

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let start = performance.now();
    let animationFrame: number | null = null;
    let disposed = false;
    const mouse = { x: -9999, y: -9999, active: false };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const build = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      if (!width || !height) return;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const mark = markRef.current;
      if (!mark || !img.complete || !img.naturalWidth) {
        particles = [];
        return;
      }

      const stageBox = canvas.getBoundingClientRect();
      const markBox = mark.getBoundingClientRect();
      const boxX = markBox.left - stageBox.left;
      const boxY = markBox.top - stageBox.top;
      const sizeScale = markBox.width / BASE_MARK_WIDTH;

      particles = sampleLogo(img).map((point) => {
        const tx = boxX + point.x * markBox.width;
        const ty = boxY + point.y * markBox.height;
        const r = ((point.wordmark ? 0.85 : 0.7) + Math.random() * (point.wordmark ? 0.8 : 1.25)) * sizeScale;
        const base = { tx, ty, vx: 0, vy: 0, r, color: point.color };
        if (reduceMotion) return { ...base, x: tx, y: ty, delay: 0 };

        // Fly in from just outside a random edge of the hero.
        const edge = Math.floor(Math.random() * 4);
        const off = 30 + Math.random() * 90;
        const x = edge === 1 ? width + off : edge === 3 ? -off : Math.random() * width;
        const y = edge === 0 ? -off : edge === 2 ? height + off : Math.random() * height;
        return { ...base, x, y, delay: Math.random() * (point.wordmark ? 520 : 700) };
      });
      start = performance.now();
    };

    const drawDot = (x: number, y: number, r: number, color: string) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    // The logo assembles and the loop stops once every particle is home, so
    // nothing keeps moving on its own (WCAG 2.2.2); the pointer restarts it.
    const frame = (now: number) => {
      if (disposed) return;
      let moving = mouse.active;
      ctx.clearRect(0, 0, width, height);
      const elapsed = now - start;

      for (const q of particles) {
        if (elapsed < q.delay) {
          moving = true;
          continue;
        }
        if (reduceMotion) {
          q.x = q.tx;
          q.y = q.ty;
        } else {
          const mdx = q.x - mouse.x;
          const mdy = q.y - mouse.y;
          const md = Math.hypot(mdx, mdy);
          if (mouse.active && md < 75) {
            const force = (1 - md / 75) * 1.8;
            q.vx += (mdx / (md || 1)) * force;
            q.vy += (mdy / (md || 1)) * force;
          }
          const dx = q.tx - q.x;
          const dy = q.ty - q.y;
          q.vx = (q.vx + dx * 0.022) * 0.84;
          q.vy = (q.vy + dy * 0.022) * 0.84;
          q.x += q.vx;
          q.y += q.vy;
          if (Math.abs(dx) + Math.abs(dy) > 0.3 || Math.abs(q.vx) + Math.abs(q.vy) > 0.05) {
            moving = true;
          }
        }
        drawDot(q.x, q.y, q.r, q.color);
      }

      animationFrame = moving ? window.requestAnimationFrame(frame) : null;
    };

    const play = () => {
      if (animationFrame === null) animationFrame = window.requestAnimationFrame(frame);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const box = canvas.getBoundingClientRect();
      mouse.x = event.clientX - box.left;
      mouse.y = event.clientY - box.top;
      mouse.active = mouse.x >= 0 && mouse.x <= box.width && mouse.y >= 0 && mouse.y <= box.height;
      if (mouse.active && !reduceMotion) play();
    };
    const handlePointerLeave = () => {
      mouse.active = false;
    };
    const handleResize = () => {
      build();
      play();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", handleResize);

    const ready = () => {
      if (disposed) return;
      build();
      play();
    };
    if (!img.complete) img.onload = ready;
    else ready();

    return () => {
      disposed = true;
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
    };
  }, [reduceMotion, markRef]);

  return <canvas ref={canvasRef} className={className} role="img" aria-label="Motion Community" />;
};

export default HeroLogoParticles;

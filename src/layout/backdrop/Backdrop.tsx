"use client";

import { CSSProperties, FC, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { glowStyle } from "./glow";
import { HOME_NEBULA, HOME_STARS, PAGE_CLOUDS, SECTION_NEBULA, type DriftingGlow } from "./nebula-data";
import InteractiveGrid from "./InteractiveGrid";
import scss from "./Backdrop.module.scss";

type DriftStyle = CSSProperties & Record<"--dx" | "--dy" | "--from-opacity", string>;

// Drawn at its brighter phase-2 alpha, dimmed by opacity in phase 1.
const driftStyle = (glow: DriftingGlow): DriftStyle => {
  const peak = glow.alpha2 ?? glow.alpha;
  return {
    ...glowStyle({ ...glow, alpha: peak }),
    "--dx": `${glow.x2 - glow.x}px`,
    "--dy": `${glow.y2 - glow.y}px`,
    "--from-opacity": (glow.alpha / peak).toFixed(3),
  };
};

const HOME_STYLES = HOME_NEBULA.map(driftStyle);
const SECTION_STYLES = SECTION_NEBULA.map(driftStyle);
const CLOUD_STYLES = PAGE_CLOUDS.map(glowStyle);

// The page's background from the Figma «Фон» layer: blue clouds down the
// page, a drifting nebula with a skewed grid in the first screen (a denser
// one with stars on home). Decorative, under all content.
const Backdrop: FC = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const firstRef = useRef<HTMLDivElement>(null);

  // The drift stops while the first screen is scrolled away.
  useEffect(() => {
    const first = firstRef.current;
    if (!first) return;
    const observer = new IntersectionObserver(([entry]) => {
      first.toggleAttribute("data-paused", !entry.isIntersecting);
    });
    observer.observe(first);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={scss.backdrop} aria-hidden="true">
      <div className={scss.clouds}>
        <div className={scss.frame}>
          {CLOUD_STYLES.map((style, index) => (
            <span key={index} className={scss.glow} style={style} />
          ))}
        </div>
      </div>

      <div ref={firstRef} className={`${scss.frame} ${scss.first}`}>
        {(isHome ? HOME_STYLES : SECTION_STYLES).map((style, index) => (
          <span key={`${isHome}-${index}`} className={`${scss.glow} ${scss["glow--drift"]}`} style={style} />
        ))}
        {isHome && (
          <svg className={scss.stars} viewBox="0 0 1440 1000">
            {HOME_STARS.map(([x, y, size, opacity]) => (
              <circle key={`${x}-${y}`} cx={x + size / 2} cy={y + size / 2} r={size / 2} fill="#fff" opacity={opacity} />
            ))}
          </svg>
        )}
      </div>

      <InteractiveGrid variant={isHome ? "home" : "section"} />
    </div>
  );
};

export default Backdrop;

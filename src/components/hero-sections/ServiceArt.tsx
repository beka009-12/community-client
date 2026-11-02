import { FC, ReactNode } from "react";
import type { ServiceCategory } from "@/src/data/services";
import scss from "./ServiceArt.module.scss";

// What each service builds, drawn as plain shapes (viewBox 320×200). They
// become a mask, so every stroke and fill shows as the same dot grid as the
// hero logo.
const SHAPES: Record<ServiceCategory, ReactNode> = {
  web: (
    <>
      <rect x="28" y="20" width="264" height="164" rx="14" fill="none" stroke="#fff" strokeWidth="8" />
      <rect x="28" y="20" width="264" height="28" rx="10" />
      <rect x="52" y="68" width="124" height="16" rx="6" />
      <rect x="52" y="94" width="92" height="10" rx="5" />
      <rect x="52" y="112" width="108" height="10" rx="5" />
      <rect x="52" y="138" width="64" height="24" rx="9" />
      <rect x="190" y="68" width="82" height="96" rx="10" />
    </>
  ),
  systems: (
    <>
      <rect x="24" y="20" width="272" height="164" rx="12" fill="none" stroke="#fff" strokeWidth="7" />
      <rect x="24" y="20" width="58" height="164" rx="8" />
      <rect x="100" y="38" width="82" height="36" rx="8" />
      <rect x="196" y="38" width="82" height="36" rx="8" />
      <rect x="104" y="128" width="18" height="38" rx="4" />
      <rect x="132" y="104" width="18" height="62" rx="4" />
      <rect x="160" y="118" width="18" height="48" rx="4" />
      <rect x="188" y="92" width="18" height="74" rx="4" />
      <rect x="216" y="112" width="18" height="54" rx="4" />
      <rect x="244" y="96" width="18" height="70" rx="4" />
    </>
  ),
  bots: (
    <>
      <rect x="36" y="22" width="176" height="42" rx="20" />
      <rect x="112" y="78" width="172" height="42" rx="20" />
      <rect x="36" y="134" width="134" height="42" rx="20" />
    </>
  ),
  ai: (
    <>
      <path
        d="M70 52 160 36M70 52 160 100M70 100 160 36M70 100 160 100M70 148 160 100M70 148 160 164M70 52 160 164M160 36 250 72M160 100 250 72M160 100 250 128M160 164 250 128M160 36 250 128"
        fill="none"
        stroke="#fff"
        strokeWidth="5"
      />
      <circle cx="70" cy="52" r="18" />
      <circle cx="70" cy="100" r="18" />
      <circle cx="70" cy="148" r="18" />
      <circle cx="160" cy="36" r="18" />
      <circle cx="160" cy="100" r="18" />
      <circle cx="160" cy="164" r="18" />
      <circle cx="250" cy="72" r="22" />
      <circle cx="250" cy="128" r="22" />
    </>
  ),
};

const ServiceArt: FC<{ category: ServiceCategory }> = ({ category }) => {
  // One of each category per page, so the ids don't clash.
  const id = `service-art-${category}`;
  return (
    <svg className={scss.art} viewBox="0 0 320 200" aria-hidden="true">
      <defs>
        <pattern id={`${id}-dots`} width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.35" className={scss.dot} />
        </pattern>
        <mask id={`${id}-mask`}>
          <g fill="#fff">{SHAPES[category]}</g>
        </mask>
      </defs>
      <rect width="320" height="200" fill={`url(#${id}-dots)`} mask={`url(#${id}-mask)`} />
    </svg>
  );
};

export default ServiceArt;

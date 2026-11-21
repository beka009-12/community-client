"use client";

import { CSSProperties, FC, useState } from "react";
import Image from "next/image";
import { EMPLOYERS, type Employer } from "@/src/data/employers";
import scss from "./EmployerMarquee.module.scss";

// Two rows: the first half of the logos runs right, the second left.
const ROWS: { employers: Employer[]; direction: "left" | "right" }[] = [
  { employers: EMPLOYERS.slice(0, 5), direction: "right" },
  { employers: EMPLOYERS.slice(5), direction: "left" },
];

const LogoList: FC<{ employers: Employer[]; copy?: boolean }> = ({ employers, copy = false }) => (
  // The copy only makes the loop seamless: screen readers hear each company once.
  <ul className={scss.list} aria-hidden={copy || undefined}>
    {employers.map((employer) => (
      <li key={employer.name} className={scss.item}>
        <Image
          src={employer.logo}
          alt={copy ? "" : employer.name}
          className={scss.logo}
          style={{ "--logo-height": `${employer.height}px` } as CSSProperties}
          sizes="200px"
        />
      </li>
    ))}
  </ul>
);

interface EmployerMarqueeProps {
  label?: string;
}

// Full-bleed logo marquee. Pauses on hover, on focus inside and with the
// button (WCAG 2.2.2: anything moving for more than 5 seconds can be
// stopped); with reduced motion the rows stand still and wrap.
const EmployerMarquee: FC<EmployerMarqueeProps> = ({ label = "Где работают выпускники академии" }) => {
  const [paused, setPaused] = useState(false);

  return (
    <div className={scss.marquee} data-paused={paused}>
      <div className={`container ${scss.head}`}>
        <h3 className={scss.label}>{label}</h3>
        <button
          type="button"
          className={scss.pause}
          aria-label={paused ? "Запустить ленту логотипов" : "Остановить ленту логотипов"}
          onClick={() => setPaused(!paused)}
        >
          {paused ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="7" y="6" width="3.2" height="12" rx="1" fill="currentColor" />
              <rect x="13.8" y="6" width="3.2" height="12" rx="1" fill="currentColor" />
            </svg>
          )}
        </button>
      </div>
      <div className={scss.rows}>
        {ROWS.map((row) => (
          <div key={row.direction} className={scss.viewport}>
            <div className={`${scss.track} ${scss[`track--${row.direction}`]}`}>
              <LogoList employers={row.employers} />
              <LogoList employers={row.employers} copy />
              <LogoList employers={row.employers} copy />
              <LogoList employers={row.employers} copy />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployerMarquee;

import { FC, ReactNode } from "react";
import { typograph } from "@/src/lib/typograph";
import scss from "./HomeSection.module.scss";

interface IHomeSectionProps {
  // Position among the sections actually shown, so the «0N /» line never
  // skips a number when a data section is hidden.
  index: number;
  label: string;
  title: string;
  lead?: string;
  id?: string;
  // Grey band, to set a section apart from its white neighbours.
  band?: boolean;
  // Sits on the title's line, right-aligned, e.g. «Все проекты».
  aside?: ReactNode;
  // Content follows the title closely, as a lead would.
  tight?: boolean;
  children: ReactNode;
  // Full-bleed content after the container, e.g. the logo marquee.
  after?: ReactNode;
}

const HomeSection: FC<IHomeSectionProps> = ({ index, label, title, lead, id, band, aside, tight, children, after }) => {
  const headingId = `${id ?? `section-${index}`}-title`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`${scss.section} ${band ? scss["section--band"] : ""}`}
    >
      <div className="container">
        <p className={scss.section__eyebrow}>
          {String(index).padStart(2, "0")} / {label}
        </p>
        <div className={`${scss.section__head} ${tight ? scss["section__head--tight"] : ""}`}>
          <div className={scss.section__titles}>
            <h2 id={headingId} className={scss.section__title}>
              {typograph(title)}
            </h2>
            {lead && <p className={scss.section__lead}>{typograph(lead)}</p>}
          </div>
          {aside}
        </div>
        {children}
      </div>
      {after}
    </section>
  );
};

export default HomeSection;

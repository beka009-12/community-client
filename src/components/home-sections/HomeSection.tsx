import { FC, ReactNode } from "react";
import { typograph } from "@/src/lib/typograph";
import { titleLines } from "@/src/lib/title-lines";
import scss from "./HomeSection.module.scss";

interface IHomeSectionProps {
  // Position among the sections actually shown, so the «0N /» line never
  // skips a number when a data section is hidden.
  index: number;
  label: string;
  title: string;
  lead?: string;
  id?: string;
  // Sits on the title's line, right-aligned, e.g. «Все проекты».
  aside?: ReactNode;
  // Content follows the title closely, as a lead would.
  tight?: boolean;
  children: ReactNode;
  // Full-bleed content after the container, e.g. the logo marquee.
  after?: ReactNode;
  // A column to the right of the whole heading block (eyebrow, title and
  // `top`), its top on the eyebrow's line, e.g. the academy's facts.
  beside?: ReactNode;
  // Under the title, inside the left column when `beside` is set.
  top?: ReactNode;
}

const HomeSection: FC<IHomeSectionProps> = ({
  index,
  label,
  title,
  lead,
  id,
  aside,
  tight,
  children,
  after,
  beside,
  top,
}) => {
  const headingId = `${id ?? `section-${index}`}-title`;
  const heading = (
    <>
      <p className={scss.section__eyebrow}>
        {String(index).padStart(2, "0")} / {label}
      </p>
      <div className={`${scss.section__head} ${tight || top ? scss["section__head--tight"] : ""}`}>
        <div className={scss.section__titles}>
          <h2 id={headingId} className={scss.section__title}>
            {titleLines(title)}
          </h2>
          {lead && <p className={scss.section__lead}>{typograph(lead)}</p>}
        </div>
        {aside}
      </div>
      {top}
    </>
  );
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={scss.section}
    >
      <div className="container">
        {beside ? (
          <div className={scss.section__split}>
            <div className={scss.section__main}>{heading}</div>
            {beside}
          </div>
        ) : (
          heading
        )}
        {children}
      </div>
      {after}
    </section>
  );
};

export default HomeSection;

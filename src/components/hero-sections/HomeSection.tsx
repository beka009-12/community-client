import { FC, ReactNode } from "react";
import scss from "./HomeSection.module.scss";

interface HomeSectionProps {
  // «01 / Портфолио»: the section's place on the page.
  eyebrow: string;
  title: string;
  id?: string;
  // A button on the heading's line, e.g. «Все проекты».
  action?: ReactNode;
  // Right after the hero: slides up over it (see .section--after-hero).
  afterHero?: boolean;
  children: ReactNode;
}

const HomeSection: FC<HomeSectionProps> = ({ eyebrow, title, id, action, afterHero, children }) => (
  <section
    id={id}
    className={`container ${scss.section} ${afterHero ? scss["section--after-hero"] : ""}`}
  >
    <div className={scss.section__head}>
      <div className={scss.section__titles}>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="section-title">{title}</h2>
      </div>
      {action}
    </div>
    {children}
  </section>
);

export default HomeSection;

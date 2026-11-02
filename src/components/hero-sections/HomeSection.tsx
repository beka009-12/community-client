import { FC, ReactNode } from "react";
import scss from "./HomeSection.module.scss";

interface HomeSectionProps {
  title: string;
  lead?: string;
  id?: string;
  // A link on the heading's line, e.g. «Все проекты».
  action?: ReactNode;
  // A grey band across the page, to set a section apart from its neighbours.
  band?: boolean;
  // Right after the hero, whose last frame is already the white page: a full
  // section gap on top of it read as an empty screen.
  afterHero?: boolean;
  children: ReactNode;
}

const HomeSection: FC<HomeSectionProps> = ({ title, lead, id, action, band, afterHero, children }) => (
  <section
    id={id}
    className={[
      scss.section,
      band ? scss["section--band"] : "",
      afterHero ? scss["section--after-hero"] : "",
    ].join(" ")}
  >
    <div className="container">
      <div className={scss.section__head}>
        <div className={scss.section__titles}>
          <h2 className="section-title">{title}</h2>
          {lead && <p className={scss.section__lead}>{lead}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  </section>
);

export default HomeSection;

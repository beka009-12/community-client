import { FC, ReactNode } from "react";
import scss from "./HomeSection.module.scss";

interface HomeSectionProps {
  title: string;
  // A link on the heading's line, e.g. «Все проекты».
  action?: ReactNode;
  children: ReactNode;
}

const HomeSection: FC<HomeSectionProps> = ({ title, action, children }) => (
  <section className={`container ${scss.section}`}>
    <div className={scss.section__head}>
      <h2 className={scss.section__title}>{title}</h2>
      {action}
    </div>
    {children}
  </section>
);

export default HomeSection;

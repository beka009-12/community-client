import { FC, ReactNode } from "react";
import scss from "./PageIntro.module.scss";

interface PageIntroProps {
  title: string;
  lead?: string;
  children?: ReactNode;
}

// The same dot-grid band as the home hero, so inner pages open alike.
const PageIntro: FC<PageIntroProps> = ({ title, lead, children }) => (
  <div className={scss.band}>
    <div className={`container ${scss.intro}`}>
      <h1 className="page-title">{title}</h1>
      {lead && <p className={scss.intro__lead}>{lead}</p>}
      {children}
    </div>
  </div>
);

export default PageIntro;

import { FC, ReactNode } from "react";
import scss from "./PageIntro.module.scss";

interface PageIntroProps {
  title: string;
  lead?: string;
  children?: ReactNode;
}

const PageIntro: FC<PageIntroProps> = ({ title, lead, children }) => (
  <div className={`container ${scss.intro}`}>
    <h1 className="page-title">{title}</h1>
    {lead && <p className={scss.intro__lead}>{lead}</p>}
    {children}
  </div>
);

export default PageIntro;

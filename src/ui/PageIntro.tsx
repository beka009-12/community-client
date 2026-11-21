import { FC, ReactNode } from "react";
import Badge from "./Badge";
import { typograph } from "@/src/lib/typograph";
import scss from "./PageIntro.module.scss";

interface PageIntroProps {
  badge?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}

// The same dot-grid band as the home hero, so inner pages open alike.
const PageIntro: FC<PageIntroProps> = ({ badge, title, lead, children }) => (
  <div className={scss.band}>
    <div className={`container ${scss.intro}`}>
      {badge && <Badge>{badge}</Badge>}
      <h1 className={`page-title ${badge ? scss.intro__title : ""}`}>{typograph(title)}</h1>
      {lead && <p className={scss.intro__lead}>{typograph(lead)}</p>}
      {children}
    </div>
  </div>
);

export default PageIntro;

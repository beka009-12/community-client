import { FC, ReactNode } from "react";
import Badge from "./Badge";
import DarkBand from "./DarkBand";
import { typograph } from "@/src/lib/typograph";
import scss from "./PageIntro.module.scss";

export interface IntroFact {
  value: string;
  label: string;
}

interface PageIntroProps {
  // The section's name above a title that says more than the menu label.
  crumb?: string;
  badge?: string;
  title: string;
  lead?: string;
  // A few figures on the right, e.g. how many projects or members.
  facts?: IntroFact[];
  children?: ReactNode;
}

// Inner pages open dark, like the home hero, and turn light below it.
const PageIntro: FC<PageIntroProps> = ({ crumb, badge, title, lead, facts, children }) => (
  <DarkBand className={scss.band}>
    <div className={`container ${scss.intro}`}>
      <div className={scss.intro__main}>
        {crumb && <p className={scss.intro__crumb}>{crumb}</p>}
        {badge && <Badge>{badge}</Badge>}
        <h1 className={scss.intro__title}>{typograph(title)}</h1>
        {lead && <p className={scss.intro__lead}>{typograph(lead)}</p>}
        {children}
      </div>
      {facts && facts.length > 0 && (
        <dl className={scss.facts}>
          {facts.map((fact) => (
            <div key={fact.label} className={scss.fact}>
              <dt className={scss.fact__label}>{typograph(fact.label)}</dt>
              <dd className={scss.fact__value}>{fact.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  </DarkBand>
);

export default PageIntro;

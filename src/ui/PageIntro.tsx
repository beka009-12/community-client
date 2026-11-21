import { FC, ReactNode } from "react";
import Link from "next/link";
import DarkBand from "./DarkBand";
import { typograph } from "@/src/lib/typograph";
import { titleLines } from "@/src/lib/title-lines";
import scss from "./PageIntro.module.scss";

export interface IntroFact {
  value: string;
  label: string;
}

interface PageIntroProps {
  // The section's name above the title; with crumbHref it is a way back.
  crumb?: string;
  crumbHref?: string;
  // Labels between the crumb and the title (status, category, role).
  tags?: ReactNode;
  // «\n» breaks the line where the mockup breaks it.
  title: string;
  lead?: string;
  // A few figures on the right, e.g. how many projects or members.
  facts?: IntroFact[];
  // Anything else for the right column (a project's passport).
  aside?: ReactNode;
  // A square on the left of the text (a member's photo).
  media?: ReactNode;
  className?: string;
  children?: ReactNode;
}

// Inner pages open dark, like the home hero, and turn light below it.
const PageIntro: FC<PageIntroProps> = ({
  crumb,
  crumbHref,
  tags,
  title,
  lead,
  facts,
  aside,
  media,
  className = "",
  children,
}) => {
  const hasFacts = Boolean(facts && facts.length > 0);
  const side = aside ?? (hasFacts && facts ? (
    <dl className={scss.facts}>
      {facts.map((fact) => (
        <div key={fact.label} className={scss.fact}>
          <dt className={scss.fact__label}>{typograph(fact.label)}</dt>
          <dd className={scss.fact__value}>{fact.value}</dd>
        </div>
      ))}
    </dl>
  ) : null);

  return (
    <DarkBand className={`${scss.band} ${className}`}>
      <div className={`container ${scss.intro} ${media ? scss["intro--media"] : ""}`}>
        {media && <div className={scss.intro__media}>{media}</div>}
        <div className={scss.intro__main}>
          {crumb &&
            (crumbHref ? (
              <Link href={crumbHref} className={`${scss.intro__crumb} ${scss["intro__crumb--link"]}`}>
                <span aria-hidden="true">←</span> {crumb}
              </Link>
            ) : (
              <p className={scss.intro__crumb}>{crumb}</p>
            ))}
          {tags && <div className={scss.intro__tags}>{tags}</div>}
          <h1 className={scss.intro__title}>{titleLines(title)}</h1>
          {lead && <p className={scss.intro__lead}>{typograph(lead)}</p>}
          {children}
        </div>
        {side && <div className={scss.intro__side}>{side}</div>}
      </div>
    </DarkBand>
  );
};

export default PageIntro;

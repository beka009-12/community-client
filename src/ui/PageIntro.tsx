import { FC, ReactNode } from "react";
import Link from "next/link";
import { typograph } from "@/src/lib/typograph";
import { titleLines } from "@/src/lib/title-lines";
import scss from "./PageIntro.module.scss";

interface PageIntroProps {
  // The section's name above the title; with crumbHref it is a way back.
  crumb?: string;
  crumbHref?: string;
  // Labels between the crumb and the title (status, category, role).
  tags?: ReactNode;
  // «\n» breaks the line where the mockup breaks it.
  title: string;
  lead?: string;
  // The right column (a project's passport).
  aside?: ReactNode;
  // A square on the left of the text (a member's photo).
  media?: ReactNode;
  className?: string;
  children?: ReactNode;
}

// The first screen of an inner page, over the page's nebula and grid.
const PageIntro: FC<PageIntroProps> = ({
  crumb,
  crumbHref,
  tags,
  title,
  lead,
  aside,
  media,
  className = "",
  children,
}) => {
  return (
    <div className={`${scss.band} ${className}`}>
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
        {aside && <div className={scss.intro__side}>{aside}</div>}
      </div>
    </div>
  );
};

export default PageIntro;

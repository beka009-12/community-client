import { FC } from "react";
import { MISSION, STORY } from "@/src/data/about";
import { typograph } from "@/src/lib/typograph";
import scss from "./AboutSection.module.scss";

// How the community started, and its mission.
const Story: FC = () => (
  <section className={`container ${scss.section}`} aria-labelledby="story-title">
    <div className={scss.story}>
      <h2 id="story-title" className={scss.title}>
        Как появилось сообщество
      </h2>
      <div className={scss.story__text}>
        <p className={scss.story__lead}>{typograph(STORY.lead)}</p>
        <p className={scss.story__more}>{typograph(STORY.text)}</p>
      </div>
    </div>
    <div className={`${scss.card} ${scss.mission}`}>
      <h3 className={scss.label}>Миссия</h3>
      <p className={scss.mission__text}>{typograph(MISSION)}</p>
    </div>
  </section>
);

export default Story;

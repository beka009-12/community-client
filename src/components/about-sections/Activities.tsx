import { FC } from "react";
import { ACTIVITIES, TECHNOLOGIES } from "@/src/data/about";
import { typograph } from "@/src/lib/typograph";
import scss from "./AboutSection.module.scss";

// What the community works on and with which technologies.
const Activities: FC = () => (
  <section className={`container ${scss.section}`} aria-labelledby="activities-title">
    <h2 id="activities-title" className={scss.title}>
      Чем занимаемся
    </h2>
    <p className={scss.lead}>{typograph(ACTIVITIES)}</p>
    <h3 id="tech-title" className={`${scss.label} ${scss.tech__label}`}>
      Технологии
    </h3>
    <ul className={scss.tech} aria-labelledby="tech-title">
      {TECHNOLOGIES.map((technology) => (
        <li key={technology} className={scss.tech__item}>
          {technology}
        </li>
      ))}
    </ul>
  </section>
);

export default Activities;

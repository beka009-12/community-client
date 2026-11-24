import { FC } from "react";
import { EXPERIENCE, EXPERIENCE_LEAD } from "@/src/data/about";
import { typograph } from "@/src/lib/typograph";
import scss from "./AboutSection.module.scss";

// Internships and hackathons members take part in while still studying.
const Experience: FC = () => (
  <section className={`container ${scss.section}`} aria-labelledby="experience-title">
    <h2 id="experience-title" className={scss.title}>
      Опыт ещё во время учёбы
    </h2>
    <p className={scss.lead}>{typograph(EXPERIENCE_LEAD)}</p>
    <ul className={scss.cards}>
      {EXPERIENCE.map((card) => (
        <li key={card.label} className={scss.card}>
          <h3 className={scss.label}>{card.label}</h3>
          <p className={scss.card__text}>{typograph(card.text)}</p>
        </li>
      ))}
    </ul>
  </section>
);

export default Experience;

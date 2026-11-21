import { FC } from "react";
import {
  ACADEMY_ALUMNI_EMPLOYERS,
  ACADEMY_FACTS,
  ACADEMY_PROGRAMS,
  ACADEMY_URL,
} from "@/src/data/academy";
import Button from "@/src/ui/Button";
import { typograph } from "@/src/lib/typograph";
import HomeSection from "./HomeSection";
import scss from "./Academy.module.scss";

const Academy: FC<{ index: number }> = ({ index }) => (
  <HomeSection index={index} id="academy" label="Академия MotionWeb" title="Академия, из которой мы выросли." band tight>
    <div className={scss.intro}>
      <div className={scss.intro__copy}>
        <p className={scss.lead}>
          {typograph(
            "MotionWeb — IT-академия в Бишкеке. С 2020 года учит программированию с нуля до первой работы, а лучших студентов берёт на стажировку в IT Клуб — так появилась наша команда.",
          )}
        </p>
        <Button href={ACADEMY_URL} variant="link" external>
          Сайт академии — motion.kg
        </Button>
      </div>
      <dl className={scss.facts}>
        {ACADEMY_FACTS.map((fact) => (
          <div key={fact.label} className={scss.fact}>
            <dt className={scss.fact__label}>{fact.label}</dt>
            <dd className={scss.fact__value}>{fact.value}</dd>
          </div>
        ))}
      </dl>
    </div>

    <h3 className={scss.subtitle}>Программы академии</h3>
    <ul className={scss.programs}>
      {ACADEMY_PROGRAMS.map((program) => (
        <li
          key={program.title}
          className={`${scss.program} ${program.highlight ? scss["program--highlight"] : ""}`}
        >
          <div className={scss.program__top}>
            <span className={scss.program__duration}>{program.duration}</span>
            <p className={scss.program__title}>{program.title}</p>
          </div>
          <p className={scss.program__text}>{typograph(program.text)}</p>
          {program.note && <p className={scss.program__note}>{program.note}</p>}
        </li>
      ))}
    </ul>

    <p className={scss.alumni__label}>Где работают выпускники академии</p>
    <ul className={scss.alumni}>
      {ACADEMY_ALUMNI_EMPLOYERS.map((employer) => (
        <li key={employer} className={scss.alumni__item}>
          {employer}
        </li>
      ))}
    </ul>
  </HomeSection>
);

export default Academy;

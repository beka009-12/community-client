import { FC } from "react";
import { MEMBER_PATH } from "@/src/data/about";
import { typograph } from "@/src/lib/typograph";
import scss from "./MemberPath.module.scss";

const MemberPath: FC = () => (
  <section className={`container ${scss.path}`} aria-labelledby="path-title">
    <h2 id="path-title" className={scss.path__title}>
      Как человек попадает в команду
    </h2>
    <p className={scss.path__lead}>
      {typograph("Каждый участник проходит один и тот же путь: от первого урока до проекта для заказчика.")}
    </p>
    <ol className={scss.steps}>
      {MEMBER_PATH.map((step, index) => (
        <li key={step.title} className={scss.step}>
          <span className={scss.step__number} aria-hidden="true">
            {index + 1}
          </span>
          <h3 className={scss.step__title}>{typograph(step.title)}</h3>
          <p className={scss.step__text}>{typograph(step.text)}</p>
        </li>
      ))}
    </ol>
  </section>
);

export default MemberPath;

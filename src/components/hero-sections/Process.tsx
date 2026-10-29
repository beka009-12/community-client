import { FC } from "react";
import HomeSection from "./HomeSection";
import scss from "./Process.module.scss";

const STEPS = [
  {
    title: "Анализ идеи",
    description:
      "Разбираем задачу и цель продукта, оцениваем объём и сроки до старта разработки.",
  },
  {
    title: "Дизайн и архитектура",
    description: "Проектируем интерфейс и техническую архитектуру.",
  },
  {
    title: "Разработка и тестирование",
    description: "Собираем продукт короткими итерациями с код-ревью на каждом этапе.",
  },
  {
    title: "Запуск и поддержка",
    description: "Выкатываем в прод и остаёмся на связи после запуска.",
  },
];

const Process: FC = () => (
  <HomeSection eyebrow="03 / Процесс" title="Как работаем">
    <ol className={scss.steps}>
      {STEPS.map((step, index) => (
        <li key={step.title} className={scss.step}>
          <div className={scss.step__head}>
            <span
              className={`${scss.step__number} ${index === 0 ? scss["step__number--current"] : ""}`}
            >
              {index + 1}
            </span>
            {index < STEPS.length - 1 && (
              <span
                className={`${scss.step__line} ${index === 0 ? scss["step__line--current"] : ""}`}
                aria-hidden="true"
              />
            )}
          </div>
          <h3 className={scss.step__title}>{step.title}</h3>
          <p className={scss.step__text}>{step.description}</p>
        </li>
      ))}
    </ol>
  </HomeSection>
);

export default Process;

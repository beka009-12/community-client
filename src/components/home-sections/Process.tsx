import { FC } from "react";
import { typograph } from "@/src/lib/typograph";
import HomeSection from "./HomeSection";
import scss from "./Process.module.scss";

const STEPS = [
  {
    title: "Знакомимся с задачей",
    text: "Обсуждаем цели, предлагаем решение, фиксируем этапы, сроки и состав команды.",
  },
  {
    title: "Делаем и показываем",
    text: "Работаем спринтами. Делимся прогрессом, проводим демо и ревью с ментором.",
  },
  {
    title: "Запускаем и остаёмся рядом",
    text: "Тестируем, передаём продукт и документацию. Помогаем с развитием и поддержкой.",
  },
];

const Process: FC<{ index: number }> = ({ index }) => (
  <HomeSection index={index} id="process" label="Как устроена работа" title="Понятный процесс. Общий результат." band>
    <ol className={scss.steps}>
      {STEPS.map((step, i) => (
        <li key={step.title} className={scss.step}>
          <span className={scss.step__number} aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className={scss.step__title}>{step.title}</h3>
            <p className={scss.step__text}>{typograph(step.text)}</p>
          </div>
        </li>
      ))}
    </ol>
  </HomeSection>
);

export default Process;

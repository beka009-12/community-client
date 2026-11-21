import { FC } from "react";
import { typograph } from "@/src/lib/typograph";
import HomeSection from "./HomeSection";
import scss from "./WhoWeAre.module.scss";

const AUDIENCES = [
  {
    title: "Для бизнеса",
    text: "Команда под задачу, прозрачные этапы и ответственность за результат.",
  },
  {
    title: "Для выпускников",
    text: "Коммерческий опыт, работа в команде и поддержка опытных специалистов.",
  },
];

const WhoWeAre: FC<{ index: number }> = ({ index }) => (
  <HomeSection
    index={index}
    id="who-we-are"
    label="Кто мы"
    title="Не учебный проект. Команда для настоящих задач."
    tight
  >
    <div className={scss.layout}>
      <div>
        <p className={scss.lead}>
          {typograph(
            "Мы выросли из MotionWeb и остаёмся частью её структуры. Академия даёт базу и менторов. Community превращает знания в опыт — через работу над продуктами для клиентов.",
          )}
        </p>
        <ul className={scss.audiences}>
          {AUDIENCES.map((audience) => (
            <li key={audience.title} className={scss.audience}>
              <h3 className={scss.audience__title}>{audience.title}</h3>
              <p className={scss.audience__text}>{typograph(audience.text)}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className={scss.chain}>
        <span className={scss.chain__pill}>Головная организация</span>
        <p className={scss.chain__name}>MotionWeb</p>
        <p className={scss.chain__meta}>IT-академия в Бишкеке · с 2020 года</p>
        <span className={scss.chain__arrow} aria-hidden="true">
          ↓
        </span>
        <div className={scss.chain__community}>
          <p className={scss.chain__communityName}>Motion Community</p>
          <p className={scss.chain__communityMeta}>
            {typograph("IT Клуб академии · стажировка на реальных проектах")}
          </p>
        </div>
      </div>
    </div>
  </HomeSection>
);

export default WhoWeAre;

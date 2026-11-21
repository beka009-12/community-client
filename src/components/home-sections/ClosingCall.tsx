import { FC } from "react";
import Button from "@/src/ui/Button";
import { TELEGRAM_URL } from "@/src/data/socials";
import { typograph } from "@/src/lib/typograph";
import scss from "./ClosingCall.module.scss";

const TITLE_LINES = ["Есть идея?", "Давайте сделаем", "её реальностью."];

// Dark again, closing the page the way the hero opened it.
const ClosingCall: FC = () => (
  <section className={`theme-dark ${scss.call}`} aria-labelledby="closing-title" data-footer-flush>
    <div className="container">
      <p className={scss.call__badge}>Открыты к новым проектам</p>
      <div className={scss.call__layout}>
        <h2 id="closing-title" className={scss.call__title}>
          {TITLE_LINES.map((line) => (
            <span key={line} className={scss.call__line}>
              {typograph(line)}{" "}
            </span>
          ))}
        </h2>
        <div className={scss.call__side}>
          <p className={scss.call__text}>
            {typograph("Расскажите о задаче — предложим решение, команду и следующие шаги.")}
          </p>
          <Button href="/contact" size="lg">
            Обсудить проект
          </Button>
          {TELEGRAM_URL && (
            <div className={scss.students}>
              <p className={scss.students__label}>Для выпускников MotionWeb</p>
              <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className={scss.students__link}>
                Присоединиться к сообществу ↗
              </a>
            </div>
          )}
        </div>
      </div>
      <p className={scss.call__footnote}>Разработка / Дизайн / Сообщество</p>
    </div>
  </section>
);

export default ClosingCall;

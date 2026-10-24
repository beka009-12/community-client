import { FC } from "react";
import Button from "@/src/ui/Button";
import { TELEGRAM_URL } from "@/src/data/socials";
import scss from "./FinalCall.module.scss";

// `eyebrow` is the home page's section label; other pages leave it out.
const FinalCall: FC<{ eyebrow?: string }> = ({ eyebrow }) => (
  <section className={`container ${scss.call}`}>
    <div className={scss.call__block}>
      <div className={scss.call__titles}>
        {eyebrow && <span className={scss.call__eyebrow}>{eyebrow}</span>}
        <h2 className={scss.call__title}>Расскажите о задаче — предложим команду и сроки</h2>
      </div>
      <Button href="/contact" variant="dark" size="lg" arrow>
        Обсудить проект
      </Button>
    </div>
    {TELEGRAM_URL && (
      <p className={scss.students}>
        Разработчик и хотите в сообщество?{" "}
        <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className={scss.students__link}>
          Напишите нам в Telegram
        </a>
      </p>
    )}
  </section>
);

export default FinalCall;

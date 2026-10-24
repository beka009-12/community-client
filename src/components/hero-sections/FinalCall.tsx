import { FC } from "react";
import Button from "@/src/ui/Button";
import { TELEGRAM_URL } from "@/src/data/socials";
import scss from "./FinalCall.module.scss";

const FinalCall: FC = () => (
  <section className={`container ${scss.call}`}>
    <h2 className={scss.call__title}>Расскажите о задаче — предложим команду и сроки</h2>
    <Button href="/contact" className={scss.call__cta}>
      Обсудить проект
    </Button>
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

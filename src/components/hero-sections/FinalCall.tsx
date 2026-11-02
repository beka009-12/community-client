import { FC } from "react";
import Button from "@/src/ui/Button";
import { TELEGRAM_URL } from "@/src/data/socials";
import scss from "./FinalCall.module.scss";

// Dark again, closing the page the way the hero opened it.
const FinalCall: FC = () => (
  <section className={`container ${scss.call}`}>
    <div className={`theme-dark ${scss.call__block}`}>
      <h2 className={scss.call__title}>Расскажите о задаче, предложим команду и сроки</h2>
      <div className={scss.call__side}>
        <p className={scss.call__text}>
          Заполните короткую заявку. Мы изучим задачу и свяжемся с вами, чтобы обсудить детали.
        </p>
        <Button href="/contact" size="lg">
          Обсудить проект
        </Button>
      </div>
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

import { FC } from "react";
import Form from "next/form";
import Button from "@/src/ui/Button";
import { TELEGRAM_URL } from "@/src/data/socials";
import { PROJECT_TYPES } from "@/src/data/services";
import { typograph } from "@/src/lib/typograph";
import scss from "./ClosingCall.module.scss";

const TITLE_LINES = ["Есть идея?", "Соберём под неё", "команду."];

// The same three steps as on the contact page.
const STEPS = ["Разбираем заявку", "Собираем команду", "Созваниваемся с тимлидом"];

// An inset dark panel that ends the page. The type picked here goes to the
// request form as ?type=…, so the client starts the request right away; a
// plain GET form, it works before any JavaScript loads.
const ClosingCall: FC = () => (
  <section className={scss.call} aria-labelledby="closing-title" data-footer-flush>
    <div className={`theme-dark ${scss.panel}`}>
      <div className="container">
        <div className={scss.layout}>
          <div className={scss.pitch}>
            <h2 id="closing-title" className={scss.title}>
              {TITLE_LINES.map((line) => (
                <span key={line} className={scss.title__line}>
                  {typograph(line)}{" "}
                </span>
              ))}
            </h2>
            <ol className={scss.steps}>
              {STEPS.map((step, index) => (
                <li key={step} className={scss.step}>
                  <span className={scss.step__number} aria-hidden="true">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <Form action="/contact" className={scss.start}>
            <fieldset className={scss.types}>
              <legend className={scss.start__title}>Что нужно сделать?</legend>
              <div className={scss.chips}>
                {PROJECT_TYPES.map((type) => (
                  <label key={type} className={scss.chip}>
                    <input type="radio" name="type" value={type} className={scss.chip__input} />
                    {type}
                  </label>
                ))}
              </div>
            </fieldset>
            <Button type="submit" size="lg" className={scss.start__button}>
              Обсудить проект
            </Button>
          </Form>
        </div>

        {TELEGRAM_URL && (
          <p className={scss.students}>
            Учитесь в MotionWeb?{" "}
            <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className={scss.students__link}>
              Присоединиться к сообществу ↗
            </a>
          </p>
        )}
      </div>
    </div>
  </section>
);

export default ClosingCall;

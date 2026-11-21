import { FC } from "react";
import { HISTORY } from "@/src/data/about";
import { typograph } from "@/src/lib/typograph";
import scss from "./History.module.scss";

const History: FC = () => (
  <section className={`container ${scss.history}`} aria-labelledby="history-title">
    <div className={scss.history__head}>
      <h2 id="history-title" className={scss.history__title}>
        Наша история
      </h2>
      <p className={scss.history__lead}>От академии до проектной команды.</p>
    </div>
    <ol className={scss.timeline}>
      {HISTORY.map((event) => (
        <li key={event.year} className={scss.event}>
          <span className={scss.event__year}>{event.year}</span>
          <div>
            <h3 className={scss.event__title}>{event.title}</h3>
            <p className={scss.event__text}>{typograph(event.text)}</p>
          </div>
        </li>
      ))}
    </ol>
  </section>
);

export default History;

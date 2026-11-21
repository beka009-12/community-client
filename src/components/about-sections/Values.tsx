import { FC } from "react";
import { VALUES } from "@/src/data/about";
import { typograph } from "@/src/lib/typograph";
import scss from "./Values.module.scss";

const Values: FC = () => (
  <section className={scss.values} aria-labelledby="values-title" data-footer-flush>
    <div className="container">
      <h2 id="values-title" className={scss.values__title}>
        Что для нас важно
      </h2>
      <ul className={scss.values__grid}>
        {VALUES.map((value) => (
          <li key={value.title} className={scss.value}>
            <h3 className={scss.value__title}>{value.title}</h3>
            <p className={scss.value__text}>{typograph(value.text)}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Values;

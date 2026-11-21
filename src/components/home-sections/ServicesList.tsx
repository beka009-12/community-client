import { FC } from "react";
import { SERVICES } from "@/src/data/services";
import { typograph } from "@/src/lib/typograph";
import HomeSection from "./HomeSection";
import scss from "./ServicesList.module.scss";

const ServicesList: FC<{ index: number }> = ({ index }) => (
  <HomeSection
    index={index}
    id="services"
    label="Что делаем"
    title="Собираем продукт целиком"
    lead="От исследования и дизайна до разработки, релиза и поддержки."
  >
    <ol className={scss.list}>
      {SERVICES.map((service, i) => (
        <li key={service.category} className={scss.item}>
          <span className={scss.item__number} aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className={scss.item__body}>
            <h3 className={scss.item__title}>{service.title}</h3>
            <p className={scss.item__text}>{typograph(service.description)}</p>
            <p className={scss.item__stack}>{service.stack.join(" / ")}</p>
          </div>
        </li>
      ))}
    </ol>
  </HomeSection>
);

export default ServicesList;

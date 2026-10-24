import { FC } from "react";
import { SERVICES } from "@/src/data/services";
import HomeSection from "./HomeSection";
import scss from "./ServiceRows.module.scss";

const ServiceRows: FC = () => (
  <HomeSection title="Что делаем">
    <ul className={scss.list}>
      {SERVICES.map((service) => (
        <li key={service.category} className={scss.row}>
          <h3 className={scss.row__title}>{service.title}</h3>
          <p className={scss.row__text}>{service.description}</p>
        </li>
      ))}
    </ul>
  </HomeSection>
);

export default ServiceRows;

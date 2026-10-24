import { FC, ReactNode } from "react";
import { SERVICES, type ServiceCategory } from "@/src/data/services";
import HomeSection from "./HomeSection";
import scss from "./ServiceRows.module.scss";

const ICONS: Record<ServiceCategory, ReactNode> = {
  web: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
    </>
  ),
  systems: (
    <>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </>
  ),
  bots: <path d="M21 4 3 11l6 2.5M21 4l-3.5 16L9 13.5M21 4 9 13.5V19l3-3.5" />,
  ai: (
    <>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
};

const ServiceRows: FC = () => (
  <HomeSection eyebrow="02 / Услуги" title="Что делаем">
    <ul className={scss.grid}>
      {SERVICES.map((service, index) => (
        <li key={service.category} className={scss.card}>
          <div className={scss.card__top}>
            <span
              className={`${scss.card__icon} ${index === 0 ? scss["card__icon--accent"] : ""}`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {ICONS[service.category]}
              </svg>
            </span>
            <span className={scss.card__number}>{String(index + 1).padStart(2, "0")}</span>
          </div>
          <h3 className={scss.card__title}>{service.title}</h3>
          <p className={scss.card__text}>{service.description}</p>
        </li>
      ))}
    </ul>
  </HomeSection>
);

export default ServiceRows;

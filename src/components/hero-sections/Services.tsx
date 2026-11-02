import { FC } from "react";
import Link from "next/link";
import { SERVICES } from "@/src/data/services";
import ProjectCover from "@/src/ui/ProjectCover";
import type { ProjectListItem } from "@/src/server/api/schemas";
import HomeSection from "./HomeSection";
import ServiceArt from "./ServiceArt";
import scss from "./Services.module.scss";

// One row per service, text and picture swapping sides down the list. The
// picture is a portfolio project when the service names one, else a dotted
// drawing of what the service builds.
const Services: FC<{ projects: ProjectListItem[] }> = ({ projects }) => (
  <HomeSection
    id="services"
    title="Что мы делаем"
    lead="Берём проект целиком: структура, дизайн, разработка, запуск и поддержка. Под каждую задачу собираем свою команду."
    afterHero
  >
    <div className={scss.list}>
      {SERVICES.map((service) => {
        const project = projects.find((item) => item.id === service.projectId);
        return (
          <article key={service.category} className={scss.service}>
            <div className={scss.service__text}>
              <h3 className={scss.service__title}>{service.title}</h3>
              <p className={scss.service__description}>{service.description}</p>
              <ul className={scss.service__includes}>
                {service.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className={scss.service__team}>
                В команде: <span>{service.team.join(", ")}</span>
              </p>
            </div>

            {project ? (
              <figure className={scss.visual}>
                <div className={scss.visual__shot}>
                  <ProjectCover src={project.image} name={project.name} />
                </div>
                <figcaption className={scss.visual__caption}>
                  Из портфолио:{" "}
                  <Link href={`/projects/${project.id}`} className={scss.visual__link}>
                    {project.name}
                  </Link>
                </figcaption>
              </figure>
            ) : (
              <div className={`${scss.visual} ${scss["visual--art"]}`}>
                <ServiceArt category={service.category} />
              </div>
            )}
          </article>
        );
      })}
    </div>
  </HomeSection>
);

export default Services;

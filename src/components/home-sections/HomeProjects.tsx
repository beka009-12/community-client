import { FC, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/src/ui/Button";
import ProjectCover from "@/src/ui/ProjectCover";
import type { HomeProject } from "@/src/data/home-mock";
import { PROJECT_STATUS_LABELS } from "@/src/lib/api-labels";
import { typograph } from "@/src/lib/typograph";
import type { ProjectListItem } from "@/src/server/api/schemas";
import Tag from "@/src/ui/Tag";
import HomeSection from "./HomeSection";
import scss from "./HomeProjects.module.scss";

export const projectFromApi = (project: ProjectListItem): HomeProject => ({
  key: String(project.id),
  title: project.name,
  image: project.image,
  tags: [project.category, PROJECT_STATUS_LABELS[project.status]].filter(Boolean),
  teamLabel: project.team ? `Команда: ${project.team.name}` : undefined,
  href: `/projects/${project.id}`,
});

// API covers come from the backend host as plain URLs; bundled images go
// through next/image.
const Cover: FC<{ project: HomeProject }> = ({ project }) =>
  typeof project.image === "string" || project.image === null ? (
    <ProjectCover src={project.image} name={project.title} />
  ) : (
    <Image
      src={project.image}
      alt={`${project.title} — превью`}
      fill
      sizes="(max-width: 767px) 100vw, 560px"
      className={scss.card__image}
      placeholder="blur"
    />
  );

const CardShell: FC<{ href: string | null; children: ReactNode }> = ({ href, children }) =>
  href ? (
    <Link href={href} className={`${scss.card} ${scss["card--link"]}`}>
      {children}
    </Link>
  ) : (
    <div className={scss.card}>{children}</div>
  );

interface IHomeProjectsProps {
  index: number;
  projects: HomeProject[];
}

const HomeProjects: FC<IHomeProjectsProps> = ({ index, projects }) => (
  <HomeSection
    index={index}
    id="projects"
    label="Практика, которую видно"
    title="Сделано в Community"
    lead="Примеры проектов и результатов команды."
    band
    aside={
      <Button href="/projects" variant="link">
        Все проекты
      </Button>
    }
  >
    <ul className={scss.grid}>
      {projects.map((project) => (
        <li key={project.key}>
          <CardShell href={project.href}>
            <span className={scss.card__plate}>
              <span className={scss.card__shot}>
                <Cover project={project} />
              </span>
            </span>
            <h3 className={scss.card__title}>{project.title}</h3>
            {project.description && <p className={scss.card__text}>{typograph(project.description)}</p>}
            <span className={scss.card__meta}>
              <span className={scss.card__tags}>
                {project.tags.map((tag) => (
                  <Tag key={tag} tone="raised">
                    {tag}
                  </Tag>
                ))}
              </span>
              {project.teamLabel && <span className={scss.card__team}>{project.teamLabel}</span>}
            </span>
          </CardShell>
        </li>
      ))}
    </ul>
  </HomeSection>
);

export default HomeProjects;

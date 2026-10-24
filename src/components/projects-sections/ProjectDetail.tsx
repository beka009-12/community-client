import { FC } from "react";
import Link from "next/link";
import Button from "@/src/ui/Button";
import HeroImage from "./HeroImage";
import TeamSection from "./TeamSection";
import StatusPill from "@/src/ui/StatusPill";
import type { TeamPerson } from "@/src/server/api/joins";
import type {
  ProjectDetail as ProjectDetailData,
  ProjectListItem,
} from "@/src/server/api/schemas";
import scss from "./ProjectDetail.module.scss";

interface ProjectDetailProps {
  project: ProjectDetailData;
  team: TeamPerson[];
  adjacent: { prev: ProjectListItem; next: ProjectListItem } | null;
}

const ProjectDetail: FC<ProjectDetailProps> = ({ project, team, adjacent }) => {
  const hasLinks = Boolean(project.demo_url || project.github_url);

  return (
    <article className={scss.detail}>
      <div className={`container ${scss.detail__inner}`}>
        <Link href="/projects" className={scss.detail__back}>
          Все проекты
        </Link>

        <div className={scss.detail__header}>
          <div className={scss.detail__meta}>
            <StatusPill status={project.status} />
            <span>{project.category}</span>
            <span>{project.created_at.slice(0, 4)}</span>
          </div>
          <h1 className="page-title">{project.name}</h1>
          {project.description && (
            <p className={scss.detail__description}>{project.description}</p>
          )}
        </div>

        <HeroImage src={project.image} name={project.name} />

        <div className={scss.detail__section}>
          <h2 className={scss.detail__sectionTitle}>Команда проекта</h2>
          {team.length > 0 ? (
            <TeamSection people={team} />
          ) : (
            <p className={scss.detail__details}>Команда проекта ещё собирается.</p>
          )}
        </div>

        {hasLinks && (
          <div className={scss.detail__links}>
            {project.demo_url && (
              <Button href={project.demo_url} external arrow>
                Открыть демо
              </Button>
            )}
            {project.github_url && (
              <Button href={project.github_url} variant="outline" external arrow>
                GitHub
              </Button>
            )}
          </div>
        )}
      </div>

      {adjacent && (
        <nav className={`container ${scss.pager}`} aria-label="Соседние проекты">
          <Link href={`/projects/${adjacent.prev.id}`} className={scss.pager__link}>
            <span className={scss.pager__direction}>Предыдущий</span>
            <span className={scss.pager__name}>{adjacent.prev.name}</span>
          </Link>

          <Link
            href={`/projects/${adjacent.next.id}`}
            className={`${scss.pager__link} ${scss["pager__link--next"]}`}
          >
            <span className={scss.pager__direction}>Следующий</span>
            <span className={scss.pager__name}>{adjacent.next.name}</span>
          </Link>
        </nav>
      )}
    </article>
  );
};

export default ProjectDetail;

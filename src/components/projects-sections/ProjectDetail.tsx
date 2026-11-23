import { FC } from "react";
import Link from "next/link";
import Button from "@/src/ui/Button";
import PageIntro from "@/src/ui/PageIntro";
import ProjectCover from "@/src/ui/ProjectCover";
import Tag from "@/src/ui/Tag";
import TeamSection from "./TeamSection";
import { PROJECT_STATUS_LABELS } from "@/src/lib/api-labels";
import { plural } from "@/src/lib/plural";
import { typograph } from "@/src/lib/typograph";
import type { TeamPerson } from "@/src/server/api/joins";
import type {
  ProjectDetail as ProjectDetailData,
  ProjectListItem,
} from "@/src/server/api/schemas";
import scss from "./ProjectDetail.module.scss";

interface ProjectDetailProps {
  project: ProjectDetailData;
  team: TeamPerson[];
  next: ProjectListItem | null;
}

// A description this short reads as the intro's lead, like the mockup's
// one-line summary; a longer one gets its own «О проекте» block.
const LEAD_LIMIT = 180;

const ProjectDetail: FC<ProjectDetailProps> = ({ project, team, next }) => {
  const description = project.description.trim();
  const lead = description.length > 0 && description.length <= LEAD_LIMIT ? description : undefined;
  const story = lead ? null : description || null;
  const hasLinks = Boolean(project.demo_url || project.github_url);
  const hasMain = Boolean(story || hasLinks);

  const passport = [
    project.category && { label: "Тип", value: project.category },
    team.length > 0 && {
      label: "Команда",
      value: `${team.length} ${plural(team.length, "человек", "человека", "человек")}`,
    },
    { label: "Год", value: project.created_at.slice(0, 4) },
  ].filter((row): row is { label: string; value: string } => Boolean(row));

  return (
    <article>
      <PageIntro
        className={scss.intro}
        crumb="Все проекты"
        crumbHref="/projects"
        tags={
          <>
            <Tag tone="accent">{PROJECT_STATUS_LABELS[project.status]}</Tag>
            {project.category && <Tag>{project.category}</Tag>}
          </>
        }
        title={project.name}
        lead={lead}
        aside={
          <dl className={scss.passport}>
            {passport.map((row) => (
              <div key={row.label} className={scss.passport__row}>
                <dt className={scss.passport__label}>{row.label}</dt>
                <dd className={scss.passport__value}>{row.value}</dd>
              </div>
            ))}
          </dl>
        }
      />

      {/* The cover sits on the seam: dark above its middle, light below. */}
      <div className={scss.cover}>
        <div className="container">
          <div className={scss.cover__frame}>
            <ProjectCover src={project.image} name={project.name} sizes="(max-width: 1440px) 100vw, 1400px" eager />
          </div>
        </div>
      </div>

      <div className={`container ${scss.about} ${hasMain ? "" : scss["about--single"]}`}>
        {hasMain && (
          <div className={scss.story}>
            {story && (
              <section className={scss.block}>
                <h2 className={scss.block__title}>О проекте</h2>
                {story.split(/\n+/).map((paragraph) => (
                  <p key={paragraph} className={scss.block__text}>
                    {typograph(paragraph)}
                  </p>
                ))}
              </section>
            )}
            {hasLinks && (
              <div className={scss.links}>
                {project.demo_url && (
                  <Button href={project.demo_url} external>
                    Открыть демо
                  </Button>
                )}
                {project.github_url && (
                  <Button href={project.github_url} variant="secondary" external>
                    GitHub
                  </Button>
                )}
              </div>
            )}
          </div>
        )}

        <section className={scss.details} aria-labelledby="project-team">
          <h2 id="project-team" className={scss.details__title}>
            Команда проекта
          </h2>
          {team.length > 0 ? (
            <TeamSection people={team} />
          ) : (
            <p className={scss.details__empty}>Команда проекта ещё собирается.</p>
          )}
        </section>
      </div>

      {next && (
        <nav className={scss.next} aria-label="Следующий проект">
          <Link href={`/projects/${next.id}`} className={`container ${scss.next__link}`}>
            <span className={scss.next__text}>
              <span className={scss.next__label}>Следующий проект</span>
              <span className={scss.next__name}>
                {next.name}
                <span className={scss.next__arrow} aria-hidden="true">
                  {" "}
                  →
                </span>
              </span>
              {next.category && <span className={scss.next__meta}>{next.category}</span>}
            </span>
            <span className={scss.next__preview}>
              <ProjectCover src={next.image} name={next.name} sizes="(max-width: 480px) 100vw, 440px" />
            </span>
          </Link>
        </nav>
      )}
    </article>
  );
};

export default ProjectDetail;

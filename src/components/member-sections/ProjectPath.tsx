import { FC } from "react";
import Link from "next/link";
import ProjectCover from "@/src/ui/ProjectCover";
import { MEMBERSHIP_ROLE_LABELS, PROJECT_STATUS_LABELS } from "@/src/lib/api-labels";
import type { MemberProject } from "@/src/server/api/schemas";
import scss from "./ProjectPath.module.scss";

// The member's projects with their role in each.
const ProjectPath: FC<{ projects: MemberProject[] }> = ({ projects }) => {
  if (projects.length === 0) {
    return (
      <p className={scss.empty}>
        Участник пока не входил в команды проектов сообщества.
      </p>
    );
  }

  return (
    <ul className={scss.list}>
      {projects.map((project) => (
        <li key={project.id}>
          <Link href={`/projects/${project.id}`} className={scss.row}>
            <span className={scss.row__thumb}>
              <ProjectCover src={project.image} name={project.name} />
            </span>
            <span className={scss.row__name}>{project.name}</span>
            <span className={scss.row__meta}>
              {MEMBERSHIP_ROLE_LABELS[project.role]}, {PROJECT_STATUS_LABELS[project.status].toLowerCase()}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ProjectPath;

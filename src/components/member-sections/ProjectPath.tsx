import { FC } from "react";
import Link from "next/link";
import ProjectCover from "@/src/ui/ProjectCover";
import StatusPill from "@/src/ui/StatusPill";
import { MEMBERSHIP_ROLE_LABELS } from "@/src/lib/api-labels";
import type { MemberProject } from "@/src/server/api/schemas";
import scss from "./ProjectPath.module.scss";

// The member's projects: a preview, the name, their role, the status.
const ProjectPath: FC<{ projects: MemberProject[] }> = ({ projects }) => {
  if (projects.length === 0) {
    return <p className={scss.empty}>Пока не участвует в проектах сообщества.</p>;
  }

  return (
    <ul className={scss.list}>
      {projects.map((project) => (
        <li key={project.id}>
          <Link href={`/projects/${project.id}`} className={scss.row}>
            <span className={scss.row__thumb}>
              <ProjectCover src={project.image} name={project.name} sizes="120px" />
            </span>
            <span className={scss.row__text}>
              <span className={scss.row__name}>{project.name}</span>
              <span className={scss.row__role}>{MEMBERSHIP_ROLE_LABELS[project.role]}</span>
            </span>
            <StatusPill status={project.status} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ProjectPath;

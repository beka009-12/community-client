"use client";

import { FC, useMemo, useState } from "react";
import Header from "@/src/components/projects-sections/Header";
import ProjectListing from "@/src/components/projects-sections/ProjectListing";
import type { ProjectStatus } from "@/src/lib/api-enums";
import type { ProjectListItem } from "@/src/server/api/schemas";
import scss from "./Projects.module.scss";

const Projects: FC<{ projects: ProjectListItem[] }> = ({ projects }) => {
  // null = all. Categories are free text in the API, so the tabs come
  // from the data itself.
  const [category, setCategory] = useState<string | null>(null);
  const [status, setStatus] = useState<ProjectStatus | null>(null);
  const categories = [...new Set(projects.map((project) => project.category))];

  const visible = useMemo(
    () =>
      projects.filter(
        (project) =>
          (category === null || project.category === category) &&
          (status === null || project.status === status),
      ),
    [projects, category, status],
  );

  return (
    <div>
      <Header
        categories={categories}
        category={category}
        onCategoryChange={setCategory}
        status={status}
        onStatusChange={setStatus}
      />
      <div className={`container ${scss.list}`}>
        <ProjectListing projects={visible} />
      </div>
    </div>
  );
};

export default Projects;

"use client";

import { FC, useMemo, useRef, useState } from "react";
import Header from "@/src/components/projects-sections/Header";
import ProjectListing from "@/src/components/projects-sections/ProjectListing";
import Button from "@/src/ui/Button";
import type { ProjectStatus } from "@/src/lib/api-enums";
import { PROJECT_STATUS_LABELS } from "@/src/lib/api-labels";
import type { ProjectListItem } from "@/src/server/api/schemas";
import { plural } from "@/src/lib/plural";
import type { IntroFact } from "@/src/ui/PageIntro";
import scss from "./Projects.module.scss";

// Names the filters that left nothing, so the client knows what to change.
const emptyText = (category: string | null, status: ProjectStatus | null): string => {
  const filters = [
    category !== null && `в категории «${category}»`,
    status !== null && `со статусом «${PROJECT_STATUS_LABELS[status]}»`,
  ].filter(Boolean);
  return filters.length > 0 ? `Нет проектов ${filters.join(" ")}.` : "Проектов пока нет.";
};

// Figures for the intro: the whole showcase, then what is being built now.
const introFacts = (projects: ProjectListItem[]): IntroFact[] => {
  const total = projects.length;
  const inProgress = projects.filter((project) => project.status === "In_progress").length;
  const completed = projects.filter((project) => project.status === "Completed").length;
  return [
    { value: String(total), label: plural(total, "проект на витрине", "проекта на витрине", "проектов на витрине") },
    { value: String(completed), label: plural(completed, "проект запущен", "проекта запущено", "проектов запущено") },
    { value: String(inProgress), label: "сейчас в работе" },
  ].filter((fact) => fact.value !== "0");
};

const Projects: FC<{ projects: ProjectListItem[] }> = ({ projects }) => {
  // null = all. Categories are free text in the API, so the tabs come
  // from the data itself.
  const [category, setCategory] = useState<string | null>(null);
  const [status, setStatus] = useState<ProjectStatus | null>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const categories = [...new Set(projects.map((project) => project.category))];
  const filtered = category !== null || status !== null;

  const visible = useMemo(
    () =>
      projects.filter(
        (project) =>
          (category === null || project.category === category) &&
          (status === null || project.status === status),
      ),
    [projects, category, status],
  );

  const resetFilters = () => {
    setCategory(null);
    setStatus(null);
    // The reset button unmounts with the empty state; «Все» takes the focus.
    filtersRef.current?.querySelector<HTMLButtonElement>("[aria-pressed]")?.focus();
  };

  return (
    <div>
      <div ref={filtersRef}>
        <Header
          facts={introFacts(projects)}
          categories={categories}
          category={category}
          onCategoryChange={setCategory}
          status={status}
          onStatusChange={setStatus}
        />
      </div>
      <div className={`container ${scss.list}`}>
        {visible.length > 0 && <ProjectListing projects={visible} />}
        {/* Always rendered: a live region announces reliably only when it
            exists before its text changes. */}
        <p role="status" className={scss.empty}>
          {visible.length === 0 ? emptyText(category, status) : ""}
        </p>
        {visible.length === 0 && filtered && (
          <Button variant="link" onClick={resetFilters}>
            Сбросить фильтры
          </Button>
        )}
      </div>
    </div>
  );
};

export default Projects;

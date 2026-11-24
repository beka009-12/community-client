"use client";

import { FC, useMemo, useRef, useState } from "react";
import Header, { type CategoryTab } from "@/src/components/projects-sections/Header";
import ProjectListing from "@/src/components/projects-sections/ProjectListing";
import Button from "@/src/ui/Button";
import type { ProjectStatus } from "@/src/lib/api-enums";
import { PROJECT_STATUS_LABELS } from "@/src/lib/api-labels";
import type { ProjectListItem } from "@/src/server/api/schemas";
import { plural } from "@/src/lib/plural";
import scss from "./Projects.module.scss";

// Names the filters that left nothing, so the client knows what to change.
const emptyText = (category: string | null, status: ProjectStatus | null): string => {
  const filters = [
    category !== null && `в категории «${category}»`,
    status !== null && `со статусом «${PROJECT_STATUS_LABELS[status]}»`,
  ].filter(Boolean);
  return filters.length > 0 ? `Нет проектов ${filters.join(" ")}.` : "Проектов пока нет.";
};

// The list shows this many rows, then «Показать ещё».
const PAGE_SIZE = 8;

const Projects: FC<{ projects: ProjectListItem[] }> = ({ projects }) => {
  // null = all. Categories are free text in the API, so the tabs come
  // from the data itself.
  const [category, setCategory] = useState<string | null>(null);
  const [status, setStatus] = useState<ProjectStatus | null>(null);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const filtersRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const categories = [...new Set(projects.map((project) => project.category))];
  const tabs: CategoryTab[] = [
    { key: null, label: "Все", count: projects.length },
    ...categories.map((item) => ({
      key: item,
      label: item,
      count: projects.filter((project) => project.category === item).length,
    })),
  ];
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

  const shown = visible.slice(0, limit);
  const rest = visible.length - shown.length;

  // A new filter starts the list from its first page again.
  const changeCategory = (next: string | null) => {
    setCategory(next);
    setLimit(PAGE_SIZE);
  };
  const changeStatus = (next: ProjectStatus | null) => {
    setStatus(next);
    setLimit(PAGE_SIZE);
  };

  // The new rows get the focus, so a keyboard user lands on them, not back
  // on a button that has moved down the page.
  const showMore = () => {
    const first = shown.length;
    setLimit((current) => current + PAGE_SIZE);
    requestAnimationFrame(() => {
      listRef.current?.querySelectorAll<HTMLAnchorElement>("li a")[first]?.focus();
    });
  };

  const resetFilters = () => {
    setCategory(null);
    setStatus(null);
    setLimit(PAGE_SIZE);
    // The reset button unmounts with the empty state; «Все» takes the focus.
    filtersRef.current?.querySelector<HTMLButtonElement>("[aria-pressed]")?.focus();
  };

  return (
    <div>
      <div ref={filtersRef}>
        <Header
          tabs={tabs}
          category={category}
          onCategoryChange={changeCategory}
          status={status}
          onStatusChange={changeStatus}
        />
      </div>
      <div ref={listRef} className={`container ${scss.list}`}>
        {shown.length > 0 && <ProjectListing projects={shown} />}
        {rest > 0 && (
          <div className={scss.more}>
            <Button variant="secondary" onClick={showMore}>
              Показать ещё {Math.min(rest, PAGE_SIZE)} {plural(Math.min(rest, PAGE_SIZE), "проект", "проекта", "проектов")}
            </Button>
          </div>
        )}
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

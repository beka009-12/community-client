"use client";

import { FC } from "react";
import PageIntro from "@/src/ui/PageIntro";
import Select from "@/src/ui/Select";
import type { ProjectStatus } from "@/src/lib/api-enums";
import { PROJECT_STATUS_LABELS } from "@/src/lib/api-labels";
import scss from "./Header.module.scss";

// Completed first — "готовые проекты" is the most likely thing someone
// filters for.
const STATUS_ORDER: ProjectStatus[] = ["Completed", "In_progress", "Planned", "Paused"];

const ALL = "all";

const STATUS_OPTIONS = [
  { value: ALL, label: "Все статусы" },
  ...STATUS_ORDER.map((key) => ({ value: key, label: PROJECT_STATUS_LABELS[key] })),
];

export interface CategoryTab {
  key: string | null;
  label: string;
  count: number;
}

interface HeaderProps {
  // «Все» first, then each category with how many projects it has.
  tabs: CategoryTab[];
  category: string | null;
  onCategoryChange: (category: string | null) => void;
  status: ProjectStatus | null;
  onStatusChange: (status: ProjectStatus | null) => void;
}

const Header: FC<HeaderProps> = ({
  tabs,
  category,
  onCategoryChange,
  status,
  onStatusChange,
}) => (
  <>
    <PageIntro
      crumb="Проекты"
      title={"Что мы\nуже сделали."}
      lead="Сайты, веб-системы, Telegram-боты и AI-интеграции, которые собрали команды сообщества."
    />
    <div className={`container ${scss.filters}`}>
      <div className={scss.tabs} role="group" aria-label="Фильтр по категории">
        {tabs.map((item) => (
          <button
            key={item.key ?? ALL}
            type="button"
            className={scss.tab}
            aria-pressed={category === item.key}
            onClick={() => onCategoryChange(item.key)}
          >
            {item.label}
            <span className={scss.tab__count}>{item.count}</span>
          </button>
        ))}
      </div>
      <Select
        options={STATUS_OPTIONS}
        value={status ?? ALL}
        onChange={(next) => onStatusChange(next === ALL ? null : (next as ProjectStatus))}
        ariaLabel="Фильтр по статусу"
      />
    </div>
  </>
);

export default Header;

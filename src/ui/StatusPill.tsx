import { FC } from "react";
import type { ProjectStatus } from "@/src/lib/api-enums";
import { PROJECT_STATUS_LABELS } from "@/src/lib/api-labels";
import scss from "./StatusPill.module.scss";

// Work in progress gets the accent dot; the label always carries the meaning.
const StatusPill: FC<{ status: ProjectStatus }> = ({ status }) => (
  <span className={`${scss.pill} ${scss[`pill--${status}`] ?? ""}`}>
    <span className={scss.pill__dot} aria-hidden="true" />
    {PROJECT_STATUS_LABELS[status]}
  </span>
);

export default StatusPill;

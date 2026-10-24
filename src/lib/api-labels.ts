import type { MembershipRole, Position, ProjectStatus } from "./api-enums";

// Modifier suffixes for the public status pills (`status--<tone>`).
export type Tone = "positive" | "accent" | "neutral" | "muted" | "danger";

export const POSITION_LABELS: Record<Position, string> = {
  Frontend_Developer: "Frontend Developer",
  Backend_Developer: "Backend Developer",
  Fullstack_Developer: "Fullstack Developer",
  UI_UX_Designer: "UI/UX Designer",
  QA_Engineer: "QA Engineer",
  Mobile_Developer: "Mobile Developer",
};

// Fresh accounts can have no position yet.
export const positionLabel = (position: Position | null): string | null =>
  position ? POSITION_LABELS[position] : null;

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  Planned: "В планах",
  In_progress: "В разработке",
  Completed: "Готово",
  Paused: "На паузе",
};

export const PROJECT_STATUS_TONE: Record<ProjectStatus, Tone> = {
  Planned: "neutral",
  In_progress: "accent",
  Completed: "positive",
  Paused: "muted",
};

export const MEMBERSHIP_ROLE_LABELS: Record<MembershipRole, string> = {
  Team_Lead: "Тимлид",
  Member: "Участник",
};

// One muted line under a project name: «В разработке, web service, 2026».
export const projectMeta = (
  status: ProjectStatus,
  category: string,
  year?: string,
): string => [PROJECT_STATUS_LABELS[status], category, year].filter(Boolean).join(", ");

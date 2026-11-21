import type { MembershipRole, Position, ProjectStatus } from "./api-enums";

export const POSITION_LABELS: Record<Position, string> = {
  Frontend_Developer: "Frontend-разработчик",
  Backend_Developer: "Backend-разработчик",
  Fullstack_Developer: "Fullstack-разработчик",
  UI_UX_Designer: "UI/UX-дизайнер",
  QA_Engineer: "QA-инженер",
  Mobile_Developer: "Mobile-разработчик",
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

export const MEMBERSHIP_ROLE_LABELS: Record<MembershipRole, string> = {
  Team_Lead: "Тимлид",
  Member: "Участник",
};

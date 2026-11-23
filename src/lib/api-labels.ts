import type { MembershipRole, Position, ProjectStatus } from "./api-enums";

export const POSITION_LABELS: Record<Position, string> = {
  Frontend_Developer: "Frontend-разработчик",
  Backend_Developer: "Backend-разработчик",
  Fullstack_Developer: "Fullstack-разработчик",
  UI_UX_Designer: "UI/UX-дизайнер",
  QA_Engineer: "QA-инженер",
  Mobile_Developer: "Mobile-разработчик",
  AI_ML_Engineer: "AI/ML-инженер",
};

// Filter chips and the team grid, where the role is a column, not a title.
export const POSITION_SHORT_LABELS: Record<Position, string> = {
  Frontend_Developer: "Frontend",
  Backend_Developer: "Backend",
  Fullstack_Developer: "Fullstack",
  UI_UX_Designer: "UI/UX",
  QA_Engineer: "QA",
  Mobile_Developer: "Mobile",
  AI_ML_Engineer: "AI/ML",
};

// Every direction a member works in, the main one first. Fresh accounts
// can have none yet.
export const positionsLabel = (
  positions: readonly Position[],
  labels: Record<Position, string> = POSITION_LABELS,
): string | null => (positions.length ? positions.map((position) => labels[position]).join(", ") : null);

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  Planned: "В планах",
  In_progress: "В разработке",
  Completed: "Запущен",
  Paused: "На паузе",
};

export const MEMBERSHIP_ROLE_LABELS: Record<MembershipRole, string> = {
  Team_Lead: "Тимлид",
  Member: "Участник",
};

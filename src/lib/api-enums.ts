// Enum values exactly as the Django API sends them (GET /api/ru/choices/).
// Shared by server and client code.

export const POSITIONS = [
  "Frontend_Developer",
  "Backend_Developer",
  "Fullstack_Developer",
  "UI_UX_Designer",
  "QA_Engineer",
  "Mobile_Developer",
] as const;
export type Position = (typeof POSITIONS)[number];

export const PROJECT_STATUSES = ["Planned", "In_progress", "Completed", "Paused"] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export const MEMBERSHIP_ROLES = ["Team_Lead", "Member"] as const;
export type MembershipRole = (typeof MEMBERSHIP_ROLES)[number];

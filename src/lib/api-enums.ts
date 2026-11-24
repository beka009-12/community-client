// Enum values exactly as the Django API sends them (GET /api/ru/choices/).
// Shared by server and client code.

export const POSITIONS = [
  "Frontend_Developer",
  "Backend_Developer",
  "Fullstack_Developer",
  "UI_UX_Designer",
  "QA_Engineer",
  "Mobile_Developer",
  "AI_ML_Engineer",
] as const;
export type Position = (typeof POSITIONS)[number];

export const isPosition = (value: unknown): value is Position => (POSITIONS as readonly unknown[]).includes(value);

export const PROJECT_STATUSES = ["Planned", "In_progress", "Completed", "Paused"] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export const MEMBERSHIP_ROLES = ["Team_Lead", "Member"] as const;
export type MembershipRole = (typeof MEMBERSHIP_ROLES)[number];

// An account's role in the community, not in a project.
export const USER_ROLES = ["Admin", "Member"] as const;
export type UserRole = (typeof USER_ROLES)[number];

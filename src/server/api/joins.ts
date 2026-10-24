import type { MembershipRole } from "@/src/lib/api-enums";
import type { MemberListItem, Membership } from "./schemas";

export interface TeamPerson {
  member: MemberListItem;
  role: MembershipRole;
}

// Only people on the public roster: an unfilled profile has no page to link
// to. Leads first.
export function withPeople(memberships: Membership[], roster: MemberListItem[]): TeamPerson[] {
  const listed = new Set(roster.map((member) => member.id));
  return memberships
    .filter((row) => listed.has(row.user.id))
    .map((row) => ({ member: row.user, role: row.role }))
    .sort((a, b) => Number(b.role === "Team_Lead") - Number(a.role === "Team_Lead"));
}

// `skills` is free text in the API: "React, TypeScript" or one per line.
export const splitSkills = (skills: string): string[] => [
  ...new Set(
    skills
      .split(/[,\n]/)
      .map((skill) => skill.trim())
      .filter(Boolean),
  ),
];

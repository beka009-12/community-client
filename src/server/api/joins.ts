import type { MembershipRole } from "@/src/lib/api-enums";
import type { MemberListItem, Membership, ProjectDetail } from "./schemas";

export interface TeamPerson {
  member: MemberListItem;
  role: MembershipRole;
}

export interface ProjectTeam {
  project: ProjectDetail;
  people: TeamPerson[];
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

export const projectTeams = (projects: ProjectDetail[], roster: MemberListItem[]): ProjectTeam[] =>
  projects
    .map((project) => ({ project, people: withPeople(project.members, roster) }))
    .filter((team) => team.people.length > 0);

// `skills` is free text in the API: "React, TypeScript" or one per line.
export const splitSkills = (skills: string): string[] => [
  ...new Set(
    skills
      .split(/[,\n]/)
      .map((skill) => skill.trim())
      .filter(Boolean),
  ),
];

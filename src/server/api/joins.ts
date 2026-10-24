import type { MembershipRole, ProjectStatus } from "@/src/lib/api-enums";
import type { MemberDetail, MemberListItem, Membership, ProjectDetail } from "./schemas";

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

// Everyone who leads at least one project, once, in order of first appearance.
export function teamLeads(projects: ProjectDetail[], roster: MemberListItem[]): MemberListItem[] {
  const leads = new Map<number, MemberListItem>();
  for (const project of projects) {
    for (const { member, role } of withPeople(project.members, roster)) {
      if (role === "Team_Lead" && !leads.has(member.id)) leads.set(member.id, member);
    }
  }
  return [...leads.values()];
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

export interface LeadProject {
  id: number;
  name: string;
  status: ProjectStatus;
  role: MembershipRole;
}

export interface LeadProfile {
  member: MemberListItem;
  bio: string;
  projects: LeadProject[];
}

// A slim, serialisable shape for the homepage's client-side leads section.
export const leadProfile = ({ id, first_name, last_name, position, avatar, bio, projects }: MemberDetail): LeadProfile => ({
  member: { id, first_name, last_name, position, avatar },
  bio,
  projects: projects.map(({ id: projectId, name, status, role }) => ({ id: projectId, name, status, role })),
});

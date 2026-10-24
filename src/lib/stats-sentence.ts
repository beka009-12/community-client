import { plural } from "./plural";

interface StatsCounts {
  members_count: number;
  projects_count: number;
  companies_count: number;
}

// The home page's numbers as one plain line. Project counts include client
// work, so the wording doesn't call them the community's own products.
export function statsSentence({ members_count, projects_count, companies_count }: StatsCounts): string {
  if (members_count === 0) return "";

  const members = `${members_count} ${plural(members_count, "участник", "участника", "участников")}`;
  if (projects_count === 0) return `${members} в сообществе.`;

  const projects = `${projects_count} ${plural(projects_count, "проект", "проекта", "проектов")}`;
  if (companies_count === 0) return `${members}, ${projects}.`;

  const companies = `${companies_count} ${plural(companies_count, "компания", "компании", "компаний")}`;
  const work = plural(companies_count, "работает", "работают", "работают");
  return `${members}, ${projects}, ${companies} уже ${work} с нами.`;
}

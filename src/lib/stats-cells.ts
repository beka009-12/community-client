import { plural } from "./plural";

interface StatsCounts {
  members_count: number;
  projects_count: number;
  companies_count: number;
}

export interface StatCell {
  value: number;
  // Two short lines under/next to the number.
  label: [string, string];
}

// The home page's numbers; empty counts are left out. Project counts include
// client work, so they are «проекты», not the community's own products.
export function statsCells({ members_count, projects_count, companies_count }: StatsCounts): StatCell[] {
  if (members_count === 0) return [];
  const cells: StatCell[] = [
    {
      value: members_count,
      label: [plural(members_count, "участник", "участника", "участников"), "в сообществе"],
    },
  ];
  if (projects_count > 0) {
    cells.push({
      value: projects_count,
      label: [plural(projects_count, "проект", "проекта", "проектов"), "в портфолио"],
    });
  }
  if (companies_count > 0) {
    cells.push({
      value: companies_count,
      label: [
        `${plural(companies_count, "компания", "компании", "компаний")} уже`,
        `${plural(companies_count, "работает", "работают", "работают")} с нами`,
      ],
    });
  }
  return cells;
}

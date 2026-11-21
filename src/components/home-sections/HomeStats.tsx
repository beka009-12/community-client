import { FC } from "react";
import { COMMUNITY_FOUNDED_YEAR } from "@/src/data/community";
import type { StatCard } from "@/src/data/home-mock";
import { plural } from "@/src/lib/plural";
import type { Stats } from "@/src/server/api/schemas";
import scss from "./HomeStats.module.scss";

// Room for three live counters next to the founding year.
const MAX_COUNTERS = 3;

// /stats/ as cards. A zero reads as "nothing yet" to a client, so zero
// counters are left out, and with none left there is no strip at all.
export const statCardsFromApi = (stats: Stats | null): StatCard[] => {
  if (!stats) return [];
  const counters = [
    {
      value: stats.members_count,
      label: plural(stats.members_count, "участник сообщества", "участника сообщества", "участников сообщества"),
    },
    { value: stats.projects_count, label: plural(stats.projects_count, "проект", "проекта", "проектов") },
    {
      value: stats.companies_count,
      label: plural(stats.companies_count, "компания-клиент", "компании-клиента", "компаний-клиентов"),
    },
    { value: stats.teams_count, label: plural(stats.teams_count, "команда", "команды", "команд") },
  ]
    .filter((row) => row.value > 0)
    .slice(0, MAX_COUNTERS)
    .map((row) => ({ value: row.value.toLocaleString("ru-RU"), label: row.label }));
  return counters.length > 0
    ? [...counters, { value: String(COMMUNITY_FOUNDED_YEAR), label: "год основания" }]
    : [];
};

const HomeStats: FC<{ cards: StatCard[] }> = ({ cards }) => {
  if (cards.length === 0) return null;
  return (
    <section className={scss.stats} aria-label="Сообщество в цифрах">
      <dl className={`container ${scss.stats__grid}`}>
        {cards.map((card) => (
          <div key={card.label} className={`theme-dark ${scss.card}`}>
            <dt className={scss.card__label}>{card.label}</dt>
            <dd className={scss.card__value}>{card.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default HomeStats;

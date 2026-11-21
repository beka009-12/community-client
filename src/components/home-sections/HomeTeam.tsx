import { FC, ReactNode } from "react";
import Link from "next/link";
import Avatar from "@/src/ui/Avatar";
import Button from "@/src/ui/Button";
import type { HomePerson } from "@/src/data/home-mock";
import { positionLabel } from "@/src/lib/api-labels";
import { fullName } from "@/src/lib/people";
import type { MemberListItem } from "@/src/server/api/schemas";
import HomeSection from "./HomeSection";
import scss from "./HomeTeam.module.scss";

const HOME_TEAM_LIMIT = 4;

// People with a photo go first: a row of initials reads as placeholders.
export const peopleFromApi = (members: MemberListItem[]): HomePerson[] =>
  [...members.filter((member) => member.avatar), ...members.filter((member) => !member.avatar)]
    .slice(0, HOME_TEAM_LIMIT)
    .map((member) => ({
      key: String(member.id),
      name: fullName(member),
      position: positionLabel(member.position) ?? "Участник",
      photo: member.avatar,
      href: `/team/${member.id}`,
    }));

const PersonShell: FC<{ href: string | null; children: ReactNode }> = ({ href, children }) =>
  href ? (
    <Link href={href} className={`${scss.member} ${scss["member--link"]}`}>
      {children}
    </Link>
  ) : (
    <div className={scss.member}>{children}</div>
  );

interface IHomeTeamProps {
  index: number;
  people: HomePerson[];
}

const HomeTeam: FC<IHomeTeamProps> = ({ index, people }) => (
  <HomeSection
    index={index}
    id="team"
    label="Люди за продуктом"
    title="Растём вместе. Делаем всерьёз."
    lead="Выпускники академии работают в проектных командах, менторы помогают держать качество."
    aside={
      <Button href="/team" variant="link">
        Вся команда
      </Button>
    }
  >
    <ul className={scss.grid}>
      {people.map((person) => (
        <li key={person.key}>
          <PersonShell href={person.href}>
            <span className={scss.member__photo}>
              <Avatar
                src={person.photo}
                name={person.name}
                imageClassName={scss.member__img}
                fallbackClassName={scss.member__initials}
              />
              {person.badge && (
                <span
                  className={`${scss.member__badge} ${person.badge.strong ? scss["member__badge--strong"] : ""}`}
                >
                  {person.badge.label}
                </span>
              )}
            </span>
            <span className={scss.member__name}>{person.name}</span>
            <span className={scss.member__position}>{person.position}</span>
            {person.focus && <span className={scss.member__focus}>{person.focus}</span>}
          </PersonShell>
        </li>
      ))}
    </ul>
  </HomeSection>
);

export default HomeTeam;

import { FC } from "react";
import Link from "next/link";
import Avatar from "@/src/ui/Avatar";
import { positionsLabel } from "@/src/lib/api-labels";
import { fullName } from "@/src/lib/people";
import type { TeamPerson } from "@/src/server/api/joins";
import scss from "./TeamSection.module.scss";

// The lead says so first; everyone else is their directions.
const caption = ({ member, role }: TeamPerson): string => {
  const position = positionsLabel(member.positions);
  if (role === "Team_Lead") return position ? `Тимлид, ${position}` : "Тимлид";
  return position ?? "Участник";
};

const TeamSection: FC<{ people: TeamPerson[] }> = ({ people }) => (
  <ul className={scss.team}>
    {people.map((person) => {
      const name = fullName(person.member);
      return (
        <li key={person.member.id}>
          <Link href={`/team/${person.member.id}`} className={scss.member}>
            <span className={scss.member__avatar}>
              <Avatar
                src={person.member.avatar}
                name={name}
                imageClassName={scss.member__avatarImg}
                fallbackClassName={scss.member__initials}
              />
            </span>
            <span className={scss.member__text}>
              <span className={scss.member__name}>{name}</span>
              <span className={scss.member__caption}>{caption(person)}</span>
            </span>
          </Link>
        </li>
      );
    })}
  </ul>
);

export default TeamSection;

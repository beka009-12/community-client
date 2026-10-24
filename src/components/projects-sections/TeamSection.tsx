import { FC } from "react";
import Link from "next/link";
import Avatar from "@/src/ui/Avatar";
import { MEMBERSHIP_ROLE_LABELS, positionLabel } from "@/src/lib/api-labels";
import { fullName } from "@/src/lib/people";
import type { TeamPerson } from "@/src/server/api/joins";
import scss from "./TeamSection.module.scss";

const TeamSection: FC<{ people: TeamPerson[] }> = ({ people }) => (
  <ul className={scss.team}>
    {people.map(({ member, role }) => {
      const name = fullName(member);
      const caption = [MEMBERSHIP_ROLE_LABELS[role], positionLabel(member.position)]
        .filter(Boolean)
        .join(", ");
      return (
        <li key={member.id}>
          <Link href={`/team/${member.id}`} className={scss.member}>
            <span className={scss.member__avatar}>
              <Avatar src={member.avatar} name={name} imageClassName={scss.member__avatarImg} />
            </span>
            <span className={scss.member__name}>{name}</span>
            <span className={scss.member__caption}>{caption}</span>
          </Link>
        </li>
      );
    })}
  </ul>
);

export default TeamSection;

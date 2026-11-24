import { FC } from "react";
import Link from "next/link";
import Avatar from "@/src/ui/Avatar";
import { POSITION_SHORT_LABELS, positionsLabel } from "@/src/lib/api-labels";
import { fullName } from "@/src/lib/people";
import type { MemberListItem } from "@/src/server/api/schemas";
import scss from "./MemberCard.module.scss";

// A square portrait, the name and the directions: one cell of the /team
// grids. Greyscale until hovered or focused.
const MemberCard: FC<{ member: MemberListItem }> = ({ member }) => {
  const name = fullName(member);
  const position = positionsLabel(member.positions, POSITION_SHORT_LABELS) ?? "Участник";
  return (
    <Link href={`/team/${member.id}`} className={scss.card}>
      <span className={scss.card__photo}>
        <Avatar
          src={member.avatar}
          name={name}
          sizes="(max-width: 767px) 50vw, (max-width: 1280px) 20vw, 240px"
          imageClassName={scss.card__img}
          fallbackClassName={scss.card__initials}
        />
      </span>
      <span className={scss.card__name}>{name}</span>
      <span className={scss.card__position}>{position}</span>
    </Link>
  );
};

export default MemberCard;

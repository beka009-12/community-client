import { FC } from "react";
import Link from "next/link";
import Avatar from "@/src/ui/Avatar";
import Button from "@/src/ui/Button";
import { positionLabel } from "@/src/lib/api-labels";
import { fullName } from "@/src/lib/people";
import type { MemberListItem } from "@/src/server/api/schemas";
import HomeSection from "./HomeSection";
import scss from "./HomeTeam.module.scss";

const HOME_TEAM_LIMIT = 6;

// People with a photo go first: a row of initials reads as placeholders.
const pickMembers = (members: MemberListItem[]): MemberListItem[] =>
  [...members.filter((member) => member.avatar), ...members.filter((member) => !member.avatar)].slice(
    0,
    HOME_TEAM_LIMIT,
  );

const HomeTeam: FC<{ members: MemberListItem[] }> = ({ members }) => (
  <HomeSection
    title="Кто будет делать"
    lead="Разработчики, дизайнеры и тестировщики из Бишкека. Под ваш проект соберём тех, кто уже делал похожие."
    action={
      <Button href="/team" variant="link">
        Вся команда
      </Button>
    }
  >
    <ul className={scss.grid}>
      {pickMembers(members).map((member) => {
        const name = fullName(member);
        return (
          <li key={member.id}>
            <Link href={`/team/${member.id}`} className={scss.member}>
              <span className={scss.member__photo}>
                <Avatar
                  src={member.avatar}
                  name={name}
                  imageClassName={scss.member__img}
                  fallbackClassName={scss.member__initials}
                />
              </span>
              <span className={scss.member__name}>{name}</span>
              <span className={scss.member__position}>
                {positionLabel(member.position) ?? "Участник"}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  </HomeSection>
);

export default HomeTeam;

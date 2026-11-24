import { FC } from "react";
import Avatar from "@/src/ui/Avatar";
import Button from "@/src/ui/Button";
import PageIntro from "@/src/ui/PageIntro";
import Tag from "@/src/ui/Tag";
import ProjectPath from "@/src/components/member-sections/ProjectPath";
import { positionsLabel } from "@/src/lib/api-labels";
import { fullName } from "@/src/lib/people";
import { typograph } from "@/src/lib/typograph";
import { splitSkills } from "@/src/server/api/joins";
import type { MemberDetail } from "@/src/server/api/schemas";
import scss from "./MemberProfile.module.scss";

interface ProfileLink {
  href: string;
  label: string;
  // A PDF opens in a new tab like the rest, but isn't another website.
  arrow?: boolean;
}

// Scenario 4 in the platform plan: a client checks someone's profile and
// projects before sending a request. The API has no education or join date
// yet, so the mockup's «Обучение» and «В сообществе с …» wait for them.
const MemberProfile: FC<{ member: MemberDetail }> = ({ member }) => {
  const name = fullName(member);
  // First name over last name, as in the mockup.
  const title = [member.first_name, member.last_name]
    .map((part) => part?.trim())
    .filter(Boolean)
    .join("\n") || name;
  const position = positionsLabel(member.positions);
  const skills = splitSkills(member.skills);
  const leads = member.projects.some((project) => project.role === "Team_Lead");

  // Only links the member actually filled in — no dead buttons.
  const links = [
    member.github && { href: member.github, label: "GitHub" },
    member.linkedin && { href: member.linkedin, label: "LinkedIn" },
    member.portfolio && { href: member.portfolio, label: "Портфолио" },
    member.resume && { href: member.resume, label: "Резюме, PDF", arrow: false },
  ].filter((link): link is ProfileLink => Boolean(link));

  return (
    <article>
      <PageIntro
        className={scss.intro}
        crumb="Все участники"
        crumbHref="/team"
        tags={<Tag>{leads ? "Тимлид" : "Участник"}</Tag>}
        title={title}
        media={
          <div className={scss.photo}>
            <Avatar
              src={member.avatar}
              name={name}
              sizes="320px"
              imageClassName={scss.photo__img}
              fallbackClassName={scss.photo__initials}
              eager
            />
          </div>
        }
      >
        {position && <p className={scss.position}>{position}</p>}
        {links.length > 0 && (
          <ul className={scss.links}>
            {links.map((link) => (
              <li key={link.label}>
                <Button href={link.href} variant="secondary" external arrow={link.arrow ?? true}>
                  {link.label}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </PageIntro>

      <div className={`container ${scss.profile}`}>
        <div className={scss.main}>
          <section className={scss.block}>
            <h2 className={scss.block__title}>О себе</h2>
            <p className={scss.bio}>{typograph(member.bio || "Рассказа о себе пока нет.")}</p>
          </section>

          <section className={scss.block}>
            <h2 className={scss.block__title}>Проекты</h2>
            <ProjectPath projects={member.projects} />
          </section>
        </div>

        {skills.length > 0 && (
          <aside className={scss.details}>
            <section className={scss.detail}>
              <h2 className={scss.detail__title}>Навыки</h2>
              <ul className={scss.skills}>
                {skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </section>
          </aside>
        )}
      </div>
    </article>
  );
};

export default MemberProfile;

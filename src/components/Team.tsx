import PageIntro, { type IntroFact } from "@/src/ui/PageIntro";
import Roster from "@/src/components/team-sections/Roster";
import ForStudents from "@/src/components/team-sections/ForStudents";
import { getMembers } from "@/src/server/api/members";
import { getProjects } from "@/src/server/api/projects";
import { plural } from "@/src/lib/plural";

// The mockup also has a «Менторы» block: the API has no mentors yet, so it
// waits for that data instead of showing invented people.
const Team = async () => {
  const [members, projects] = await Promise.all([getMembers(), getProjects()]);
  const completed = projects.filter((project) => project.status === "Completed").length;
  const facts: IntroFact[] = [
    members.length > 0 && {
      value: String(members.length),
      label: `${plural(members.length, "участник", "участника", "участников")} в сообществе`,
    },
    completed > 0 && {
      value: String(completed),
      label: plural(completed, "проект запущен", "проекта запущено", "проектов запущено"),
    },
  ].filter((fact): fact is IntroFact => Boolean(fact));

  return (
    <>
      <PageIntro
        crumb="Команда"
        title={"Люди, которые\nделают проекты."}
        lead="Разработчики, дизайнеры и тимлиды. Все прошли академию MotionWeb, а менторы следят за качеством каждого проекта."
        facts={facts}
      />
      <Roster members={members} />
      <ForStudents />
    </>
  );
};

export default Team;

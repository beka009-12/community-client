import PageIntro from "@/src/ui/PageIntro";
import Roster from "@/src/components/team-sections/Roster";
import { getMembers } from "@/src/server/api/members";
import { plural } from "@/src/lib/plural";

const Team = async () => {
  const members = await getMembers();
  const count = members.length;
  return (
    <>
      <PageIntro
        crumb="Команда"
        title="Люди, которые делают проекты."
        lead="Разработчики, дизайнеры и тимлиды. Все прошли академию MotionWeb, а менторы следят за качеством каждого проекта."
        facts={
          count > 0
            ? [{ value: String(count), label: `${plural(count, "участник", "участника", "участников")} в сообществе` }]
            : undefined
        }
      />
      <Roster members={members} />
    </>
  );
};

export default Team;

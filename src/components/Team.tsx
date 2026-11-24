import PageIntro from "@/src/ui/PageIntro";
import Roster from "@/src/components/team-sections/Roster";
import ForStudents from "@/src/components/team-sections/ForStudents";
import { getMembers } from "@/src/server/api/members";

const Team = async () => {
  const members = await getMembers();

  return (
    <>
      <PageIntro
        crumb="Команда"
        title={"Люди, которые\nделают проекты."}
        lead="Разработчики, дизайнеры и тимлиды. Все прошли академию MotionWeb, а менторы следят за качеством каждого проекта."
      />
      <Roster members={members} />
      <ForStudents />
    </>
  );
};

export default Team;

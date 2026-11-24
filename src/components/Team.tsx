import PageIntro from "@/src/ui/PageIntro";
import Admins from "@/src/components/team-sections/Admins";
import Roster from "@/src/components/team-sections/Roster";
import { getMembers } from "@/src/server/api/members";

const Team = async () => {
  const members = await getMembers();
  const admins = members.filter((member) => member.role === "Admin");
  const others = members.filter((member) => member.role !== "Admin");

  return (
    <>
      <PageIntro
        crumb="Участники"
        title={"Люди, которые\nделают проекты."}
        lead="Разработчики, дизайнеры и тимлиды. Все прошли академию MotionWeb, а менторы следят за качеством каждого проекта."
      />
      <Admins admins={admins} />
      <Roster members={others} />
    </>
  );
};

export default Team;

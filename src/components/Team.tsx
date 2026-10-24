import PageIntro from "@/src/ui/PageIntro";
import Roster from "@/src/components/team-sections/Roster";
import { getMembers } from "@/src/server/api/members";

const Team = async () => {
  const members = await getMembers();
  return (
    <>
      <PageIntro
        title="Команда"
        lead="Разработчики, дизайнеры и тимлиды, которые делают наши проекты."
      />
      <Roster members={members} />
    </>
  );
};

export default Team;

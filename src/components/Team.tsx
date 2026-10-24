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
        badge={
          count > 0
            ? `${count} ${plural(count, "участник", "участника", "участников")} в сообществе`
            : undefined
        }
        title="Команда"
        lead="Разработчики, дизайнеры и тимлиды, которые делают наши проекты."
      />
      <Roster members={members} />
    </>
  );
};

export default Team;

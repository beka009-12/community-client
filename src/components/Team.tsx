import Intro from "@/src/components/team-sections/Intro";
import Roster from "@/src/components/team-sections/Roster";
import Teams from "@/src/components/team-sections/Teams";
import { unstable_rethrow } from "next/navigation";
import { projectTeams } from "@/src/server/api/joins";
import { getMembers } from "@/src/server/api/members";
import { getProjectsWithMembers } from "@/src/server/api/projects";
import type { ProjectDetail } from "@/src/server/api/schemas";
import scss from "./Team.module.scss";

// A secondary section: when the project details can't load, the roster
// still shows.
async function loadProjects(): Promise<ProjectDetail[]> {
  try {
    return await getProjectsWithMembers();
  } catch (error) {
    // Next signals dynamic rendering, redirects etc. by throwing: not a failure.
    unstable_rethrow(error);
    console.error("Failed to load project teams for /team", error);
    return [];
  }
}

// Same section-per-file pattern as about-sections/ and hero-sections/.
// /teams/ needs a token, so «Команды по проектам» is built from project
// memberships instead.
const Team = async () => {
  const [members, projects] = await Promise.all([getMembers(), loadProjects()]);
  const teams = projectTeams(projects, members);
  return (
    <div className={scss.page}>
      <Intro />
      <Roster members={members} />
      {teams.length > 0 && <Teams teams={teams} />}
    </div>
  );
};

export default Team;

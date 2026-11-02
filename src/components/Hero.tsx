import Welcome from "./hero-sections/Welcome";
import Services from "./hero-sections/Services";
import HomeSection from "./hero-sections/HomeSection";
import HomeTeam from "./hero-sections/HomeTeam";
import FinalCall from "./hero-sections/FinalCall";
import EditorialList from "./projects-sections/EditorialList";
import ProjectStack from "./projects-sections/ProjectStack";
import Button from "@/src/ui/Button";
import { getProjects } from "@/src/server/api/projects";
import { getMembers } from "@/src/server/api/members";

// The rest of the catalogue is one click away on /projects.
const HOME_PROJECTS_LIMIT = 5;

const Home = async () => {
  const [allProjects, members] = await Promise.all([getProjects(), getMembers()]);
  const projects = allProjects.slice(0, HOME_PROJECTS_LIMIT);
  return (
    <>
      <Welcome />
      <Services projects={allProjects} />
      {projects.length > 0 && (
        <HomeSection
          id="projects"
          title="Проекты"
          band
          action={
            <Button href="/projects" variant="link">
              Все проекты
            </Button>
          }
        >
          {/* Touch screens get the pinned stack, a mouse the hover list
              (switched in CSS at 1024px). */}
          <ProjectStack projects={projects} />
          <EditorialList projects={projects} />
        </HomeSection>
      )}
      {members.length > 0 && <HomeTeam members={members} />}
      <FinalCall />
    </>
  );
};

export default Home;

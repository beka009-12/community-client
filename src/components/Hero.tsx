import Welcome from "./hero-sections/Welcome";
import HomeSection from "./hero-sections/HomeSection";
import ServiceRows from "./hero-sections/ServiceRows";
import Process from "./hero-sections/Process";
import FinalCall from "./hero-sections/FinalCall";
import EditorialList from "./projects-sections/EditorialList";
import ProjectStack from "./projects-sections/ProjectStack";
import Button from "@/src/ui/Button";
import { getProjects } from "@/src/server/api/projects";
import { getStats } from "@/src/server/api/stats";
import { statsCells } from "@/src/lib/stats-cells";

// The rest of the catalogue is one click away on /projects.
const HOME_PROJECTS_LIMIT = 5;

const Home = async () => {
  const [stats, allProjects] = await Promise.all([getStats(), getProjects()]);
  const projects = allProjects.slice(0, HOME_PROJECTS_LIMIT);
  return (
    <>
      <Welcome stats={statsCells(stats)} />
      {projects.length > 0 && (
        <HomeSection
          eyebrow="01 / Портфолио"
          title="Проекты"
          action={
            <Button href="/projects" variant="outline" arrow>
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
      <ServiceRows />
      <Process />
      <FinalCall eyebrow="04 / Старт" />
    </>
  );
};

export default Home;

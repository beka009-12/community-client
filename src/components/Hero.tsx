import Welcome from "./hero-sections/Welcome";
import HomeSection from "./hero-sections/HomeSection";
import ServiceRows from "./hero-sections/ServiceRows";
import Process from "./hero-sections/Process";
import FinalCall from "./hero-sections/FinalCall";
import ProjectListing from "./projects-sections/ProjectListing";
import Button from "@/src/ui/Button";
import { getProjects } from "@/src/server/api/projects";
import { getStats } from "@/src/server/api/stats";
import { statsCells } from "@/src/lib/stats-cells";

// The rest of the catalogue is one click away on /projects.
const HOME_PROJECTS_LIMIT = 6;

const Home = async () => {
  const [stats, projects] = await Promise.all([getStats(), getProjects()]);
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
          <ProjectListing projects={projects.slice(0, HOME_PROJECTS_LIMIT)} />
        </HomeSection>
      )}
      <ServiceRows />
      <Process />
      <FinalCall />
    </>
  );
};

export default Home;

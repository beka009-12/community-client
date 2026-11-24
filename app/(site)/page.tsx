import Home from "@/src/components/Hero";
import { statCardsFromApi } from "@/src/components/home-sections/HomeStats";
import { homeProjectsFromApi } from "@/src/components/home-sections/HomeProjects";
import { peopleFromApi } from "@/src/components/home-sections/HomeTeam";
import { getStats } from "@/src/server/api/stats";
import { getProjects } from "@/src/server/api/projects";
import { getMembers } from "@/src/server/api/members";

// Home stays up when the API can't answer: a section without data is left out.
const orEmpty = async <T,>(load: Promise<T[]>, what: string): Promise<T[]> => {
  try {
    return await load;
  } catch (error) {
    console.error(`home: ${what} failed`, error);
    return [];
  }
};

const page = async () => {
  const [stats, projects, members] = await Promise.all([
    getStats(),
    orEmpty(getProjects(), "projects"),
    orEmpty(getMembers(), "members"),
  ]);
  return (
    <Home
      stats={statCardsFromApi(stats)}
      projects={homeProjectsFromApi(projects)}
      people={peopleFromApi(members)}
    />
  );
};

export default page;

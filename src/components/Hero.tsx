import { FC, Fragment, ReactNode } from "react";
import HomeHero from "./home-sections/HomeHero";
import HomeStats from "./home-sections/HomeStats";
import WhoWeAre from "./home-sections/WhoWeAre";
import Academy from "./home-sections/Academy";
import ServicesList from "./home-sections/ServicesList";
import HomeProjects from "./home-sections/HomeProjects";
import HomeTeam from "./home-sections/HomeTeam";
import Process from "./home-sections/Process";
import ClosingCall from "./home-sections/ClosingCall";
import { MOCK_PEOPLE, MOCK_PROJECTS, MOCK_STATS } from "@/src/data/home-mock";

interface IHomeBlock {
  key: string;
  render: (index: number) => ReactNode;
}

// TODO: home runs on mock content for now (see src/data/home-mock.ts). To go
// live: await getStats/getProjects/getMembers and pass them through
// statCardsFromApi, projectFromApi (first 4) and peopleFromApi.
const Home: FC = () => {
  const stats = MOCK_STATS;
  const projects = MOCK_PROJECTS;
  const people = MOCK_PEOPLE;

  // Sections without data are left out, and the rest are numbered in order.
  const blocks: IHomeBlock[] = [
    { key: "who-we-are", render: (index) => <WhoWeAre index={index} /> },
    { key: "academy", render: (index) => <Academy index={index} /> },
    { key: "services", render: (index) => <ServicesList index={index} /> },
    ...(projects.length > 0
      ? [{ key: "projects", render: (index: number) => <HomeProjects index={index} projects={projects} /> }]
      : []),
    ...(people.length > 0
      ? [{ key: "team", render: (index: number) => <HomeTeam index={index} people={people} /> }]
      : []),
    { key: "process", render: (index) => <Process index={index} /> },
  ];

  return (
    <>
      <HomeHero />
      <HomeStats cards={stats} />
      {blocks.map((block, i) => (
        <Fragment key={block.key}>{block.render(i + 1)}</Fragment>
      ))}
      <ClosingCall />
    </>
  );
};

export default Home;

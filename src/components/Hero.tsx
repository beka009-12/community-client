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
import type { HomePerson, HomeProject, StatCard } from "@/src/data/home";

interface IHomeBlock {
  key: string;
  render: (index: number) => ReactNode;
}

interface IHomeProps {
  stats: StatCard[];
  projects: HomeProject[];
  people: HomePerson[];
}

const Home: FC<IHomeProps> = ({ stats, projects, people }) => {
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

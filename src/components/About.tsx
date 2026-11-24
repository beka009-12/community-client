import { FC } from "react";
import PageIntro from "@/src/ui/PageIntro";
import Story from "./about-sections/Story";
import Activities from "./about-sections/Activities";
import Experience from "./about-sections/Experience";
import AcademyInfo from "./about-sections/AcademyInfo";
import Values from "./about-sections/Values";
import ClosingCall from "./home-sections/ClosingCall";

const About: FC = () => (
  <>
    <PageIntro
      crumb="О нас"
      title={"Растим разработчиков\nи делаем продукты."}
      lead="Motion Community — проектная команда при IT-академии MotionWeb. Собираем выпускников и менторов, чтобы делать цифровые продукты для бизнеса."
    />
    <Story />
    <Activities />
    <Experience />
    <AcademyInfo />
    <Values />
    <ClosingCall />
  </>
);

export default About;

import { FC } from "react";
import PageIntro from "@/src/ui/PageIntro";
import { CLUB_FACTS } from "@/src/data/about";
import MemberPath from "./about-sections/MemberPath";
import AcademyInfo from "./about-sections/AcademyInfo";
import History from "./about-sections/History";
import Values from "./about-sections/Values";
import ClosingCall from "./home-sections/ClosingCall";

const About: FC = () => (
  <>
    <PageIntro
      crumb="О нас"
      title={"Растим разработчиков\nи делаем продукты."}
      lead="Motion Community — проектная команда при IT-академии MotionWeb. Собираем выпускников и менторов, чтобы делать цифровые продукты для бизнеса."
      facts={CLUB_FACTS}
    />
    <MemberPath />
    <AcademyInfo />
    <History />
    <Values />
    <ClosingCall />
  </>
);

export default About;

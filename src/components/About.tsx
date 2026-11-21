import { FC } from "react";
import PageIntro from "@/src/ui/PageIntro";
import History from "./about-sections/History";
import Values from "./about-sections/Values";

const About: FC = () => (
  <>
    <PageIntro
      title="О нас"
      lead="Motion Community — проектная команда при IT-академии MotionWeb. Мы собираем выпускников и менторов, чтобы делать цифровые продукты для бизнеса."
    />
    <History />
    <Values />
  </>
);

export default About;

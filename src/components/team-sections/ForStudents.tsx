import { FC } from "react";
import Button from "@/src/ui/Button";
import { ACADEMY_URL } from "@/src/data/academy";
import { typograph } from "@/src/lib/typograph";
import scss from "./ForStudents.module.scss";

// For a student who came to see the team: the way in is the academy.
const ForStudents: FC = () => (
  <section className={scss.band} aria-labelledby="for-students-title">
    <div className={`container ${scss.inner}`}>
      <div className={scss.text}>
        <h2 id="for-students-title" className={scss.title}>
          Учитесь в MotionWeb?
        </h2>
        <p className={scss.lead}>
          {typograph(
            "Лучших студентов академия приглашает в IT Клуб — на стажировку в одной из проектных команд.",
          )}
        </p>
      </div>
      <Button href={ACADEMY_URL} variant="link" external className={scss.link}>
        Сайт академии — motion.kg
      </Button>
    </div>
  </section>
);

export default ForStudents;

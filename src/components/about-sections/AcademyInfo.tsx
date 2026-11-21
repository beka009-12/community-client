import { FC } from "react";
import Button from "@/src/ui/Button";
import EmployerMarquee from "@/src/components/EmployerMarquee";
import {
  ACADEMY_ADDRESS,
  ACADEMY_EXTRA_COURSES,
  ACADEMY_NUMBERS,
  ACADEMY_PHONE,
  ACADEMY_PROGRAMS,
  ACADEMY_URL,
} from "@/src/data/academy";
import { typograph } from "@/src/lib/typograph";
import scss from "./AcademyInfo.module.scss";

interface InfoRow {
  title: string;
  text?: string;
  href?: string;
}

const InfoCard: FC<{ title: string; rows: InfoRow[] }> = ({ title, rows }) => (
  <div className={scss.card}>
    <h3 className={scss.card__title}>{title}</h3>
    <ul className={scss.card__rows}>
      {rows.map((row) => (
        <li key={row.title} className={scss.row}>
          <span className={scss.row__title}>{typograph(row.title)}</span>
          {row.text &&
            (row.href ? (
              <a href={row.href} className={scss.row__text}>
                {row.text}
              </a>
            ) : (
              <span className={scss.row__text}>{typograph(row.text)}</span>
            ))}
        </li>
      ))}
    </ul>
  </div>
);

// The academy the community grew out of, as motion.kg presents it, and
// where its graduates work.
const AcademyInfo: FC = () => {
  const programs = ACADEMY_PROGRAMS.filter((program) => !program.highlight);
  return (
    <section className={scss.academy} aria-labelledby="academy-title">
      <div className="container">
        <div className={scss.top}>
          <div className={scss.top__copy}>
            <h2 id="academy-title" className={scss.title}>
              Академия MotionWeb
            </h2>
            <p className={scss.lead}>
              {typograph(
                "MotionWeb открылась в Бишкеке в 2020 году, чтобы давать качественное образование в IT. Учит программированию с нуля до первой работы, а лучших студентов берёт на стажировку в IT Клуб — так появилась наша команда.",
              )}
            </p>
            <Button href={ACADEMY_URL} variant="link" external>
              Сайт академии — motion.kg
            </Button>
          </div>
          <dl className={scss.numbers}>
            {ACADEMY_NUMBERS.map((item) => (
              <div key={item.label} className={scss.number}>
                <dt className={scss.number__label}>{typograph(item.label)}</dt>
                <dd className={scss.number__value}>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={scss.cards}>
          <InfoCard
            title="Программы"
            rows={programs.map((program) => ({ title: program.title, text: program.summary ?? program.duration }))}
          />
          <InfoCard title="Дополнительно" rows={ACADEMY_EXTRA_COURSES} />
          <InfoCard
            title="Документы и адрес"
            rows={[
              { title: "Лицензия Министерства образования КР" },
              { title: "Диплом или сертификат", text: "По окончании программы" },
              {
                title: ACADEMY_ADDRESS,
                text: ACADEMY_PHONE,
                href: `tel:${ACADEMY_PHONE.replace(/\s/g, "")}`,
              },
            ]}
          />
        </div>
      </div>

      <div className={scss.alumni}>
        <EmployerMarquee />
      </div>
    </section>
  );
};

export default AcademyInfo;

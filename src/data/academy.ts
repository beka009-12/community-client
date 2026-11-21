// MotionWeb, the IT academy the community belongs to. Facts as published on
// motion.kg (home and /it-club, checked 2026-11-14); course names translated
// from Kyrgyz.

export const ACADEMY_URL = "https://motion.kg/";

export interface AcademyFact {
  label: string;
  value: string;
}

export const ACADEMY_FACTS: AcademyFact[] = [
  { label: "Основана", value: "2020, Бишкек" },
  { label: "Лицензия", value: "Министерство образования КР" },
  { label: "По окончании", value: "Диплом или сертификат" },
  { label: "Сотрудники", value: "15+" },
  { label: "Отзывы студентов", value: "95% положительных" },
  { label: "Адрес", value: "ул. Куренкеева, 138" },
];

export interface AcademyProgram {
  duration: string;
  title: string;
  text: string;
  // Extra line under the text (the IT club's own numbers).
  note?: string;
  // The IT club, which is this community, stands out from the courses.
  highlight?: boolean;
}

export const ACADEMY_PROGRAMS: AcademyProgram[] = [
  {
    duration: "18 мес + 1 мес стажировки",
    title: "JavaScript-инженер",
    text: "HTML · CSS · JavaScript · TypeScript · React · Redux · Git",
  },
  {
    duration: "15 мес + 1 мес стажировки",
    title: "AI-разработка",
    text: "Python · PostgreSQL · Docker · Linux · Nginx",
  },
  {
    duration: "4 месяца",
    title: "IT-шаг для детей",
    text: "HTML · CSS · JavaScript · Python",
  },
  {
    duration: "3–6 месяцев",
    title: "IT Клуб = Motion Community",
    text: "Стажировка на реальных проектах с менторами. Лучших приглашают на работу.",
    note: "100+ трудоустроены · 30+ на менторстве",
    highlight: true,
  },
];

export const ACADEMY_ALUMNI_EMPLOYERS: string[] = [
  "MBank",
  "Айыл Банк",
  "Банк Азии",
  "Кыргыз Алтын",
  "Growave",
  "Remotion",
  "Skynet",
  "TimelySkills",
  "Мэрия Бишкека",
  "Жогорку Кенеш",
];

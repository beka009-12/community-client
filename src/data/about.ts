// TODO: mock copy for /about until the real story is written. Only the
// academy's founding (2020) is a known fact; the other years and events are
// placeholders.

export interface HistoryEvent {
  year: string;
  title: string;
  text: string;
}

export const HISTORY: HistoryEvent[] = [
  {
    year: "2020",
    title: "Открылась академия MotionWeb",
    text: "В Бишкеке появилась IT-академия, которая учит программированию с нуля до первой работы.",
  },
  {
    year: "2021",
    title: "Первые выпускники",
    text: "Студенты первых потоков закончили обучение и пошли работать в IT.",
  },
  {
    year: "2022",
    title: "IT Клуб",
    text: "Академия открыла клуб, где студенты и выпускники решают реальные задачи вместе с менторами.",
  },
  {
    year: "2023",
    title: "Motion Community",
    text: "Клуб вырос в проектную команду — появились первые заказы от компаний.",
  },
  {
    year: "2024",
    title: "Свой процесс",
    text: "Выстроили работу как в студии: бриф, этапы, демо и код-ревью у менторов.",
  },
  {
    year: "2025",
    title: "Продукты для бизнеса",
    text: "Сайты, личные кабинеты, Telegram-боты и AI-интеграции для компаний.",
  },
  {
    year: "Сейчас",
    title: "Открыты к новым задачам",
    text: "Берём проекты под ключ и растим новых разработчиков из академии.",
  },
];

export interface Value {
  title: string;
  text: string;
}

export const VALUES: Value[] = [
  {
    title: "Реальные задачи",
    text: "Растём на проектах для настоящих заказчиков, а не на учебных примерах.",
  },
  {
    title: "Менторы рядом",
    text: "Опытные разработчики ведут каждый проект и проверяют код.",
  },
  {
    title: "Понятный результат",
    text: "Прозрачные этапы, регулярные демо и ответственность за итог.",
  },
];

// TODO: mock content for home, copied from the Figma mockup (frame 2:2),
// until the API has real projects and people. Switch Hero.tsx back to
// getProjects/getMembers with the `…FromApi` mappers next to each section.
import type { StaticImageData } from "next/image";
import systemsPhoto from "@/src/assets/services/systems.jpg";
import webPhoto from "@/src/assets/services/web.jpg";

export interface StatCard {
  value: string;
  label: string;
}

export interface HomeProject {
  key: string;
  title: string;
  description?: string;
  image: StaticImageData | string | null;
  tags: string[];
  teamLabel?: string;
  // Null: a demo case without a page of its own.
  href: string | null;
}

export interface HomePerson {
  key: string;
  name: string;
  position: string;
  focus?: string;
  badge?: { label: string; strong?: boolean };
  photo: string | null;
  href: string | null;
}

export const MOCK_PROJECTS: HomeProject[] = [
  {
    key: "orbit",
    title: "Orbit — платформа для обучения",
    description: "LMS для академии: курсы, задания и прогресс студентов.",
    image: systemsPhoto,
    tags: ["Веб-система", "8 недель"],
    teamLabel: "Команда: 5 человек",
    href: null,
  },
  {
    key: "agrolink",
    title: "AgroLink — от фермы к покупателю",
    description: "Каталог продукции и управление заказами для фермеров.",
    image: webPhoto,
    tags: ["Веб-сервис", "6 недель"],
    teamLabel: "Команда: 4 человека",
    href: null,
  },
];

export const MOCK_PEOPLE: HomePerson[] = [
  {
    key: "aidana",
    name: "Айдана Садыкова",
    position: "Project manager",
    focus: "Планирование и коммуникация",
    badge: { label: "Участник" },
    photo: null,
    href: null,
  },
  {
    key: "bekbol",
    name: "Бекбол Нурмамитов",
    position: "Fullstack-разработчик",
    focus: "Архитектура и разработка",
    badge: { label: "Участник" },
    photo: null,
    href: null,
  },
  {
    key: "alina",
    name: "Алина Токтосунова",
    position: "UI/UX-дизайнер",
    focus: "Исследования и интерфейсы",
    badge: { label: "Участник" },
    photo: null,
    href: null,
  },
  {
    key: "timur",
    name: "Тимур Асанов",
    position: "Tech lead, ментор",
    focus: "Code review и качество",
    badge: { label: "Ментор академии", strong: true },
    photo: null,
    href: null,
  },
];

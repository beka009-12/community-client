export type ServiceCategory = "web" | "systems" | "bots" | "ai";

export interface Service {
  category: ServiceCategory;
  title: string;
  description: string;
  // Typical stack, shown under the description on home.
  stack: string[];
}

// Single source for the home services and the request form's project types.
export const SERVICES: Service[] = [
  {
    category: "web",
    title: "Сайты и лендинги",
    description: "Корпоративные сайты и лендинги, которые рассказывают о вашем бизнесе.",
    stack: ["Next.js", "React", "SEO"],
  },
  {
    category: "systems",
    title: "Веб-системы",
    description: "Личные кабинеты, CRM и LMS — сложные процессы в простом интерфейсе.",
    stack: ["Python", "Django", "PostgreSQL"],
  },
  {
    category: "bots",
    title: "Telegram-боты",
    description: "Сервисы в привычном мессенджере: от записи на курс до автоматизации заявок.",
    stack: ["Python", "aiogram", "API"],
  },
  {
    category: "ai",
    title: "AI-интеграции",
    description: "Подключаем AI к вашему продукту: ассистенты, поиск и работа с данными.",
    stack: ["LLM", "RAG", "интеграции"],
  },
];

// Request form choices: the API takes any string ≤150 as project_type.
export const PROJECT_TYPES = SERVICES.map((service) => service.title).concat(
  "Другое",
) as [string, ...string[]];

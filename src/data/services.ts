export type ServiceCategory = "web" | "systems" | "bots" | "ai";

export interface Service {
  category: ServiceCategory;
  title: string;
  description: string;
  includes: string[];
  team: string[];
  // A project from the portfolio to show next to the service on home (its
  // id in the API). Null draws a dotted illustration instead.
  projectId: number | null;
}

// Single source for the home services and the request form's project types.
// `category` is the service's own id: API project categories are free text
// and don't map onto services, hence `projectId`.
export const SERVICES: Service[] = [
  {
    category: "web",
    title: "Лендинги и сайты",
    description:
      "Быстрые маркетинговые сайты и корпоративные страницы на React и Next.js.",
    includes: [
      "Структура и тексты страниц",
      "Дизайн по брендбуку или с нуля",
      "Адаптивная вёрстка на Next.js",
      "Базовое SEO и подключение аналитики",
    ],
    team: ["UI/UX-дизайнер", "Frontend-разработчик"],
    projectId: null,
  },
  {
    category: "systems",
    title: "Веб-системы",
    description:
      "CRM, LMS и панели управления — сложная бизнес-логика в понятном интерфейсе.",
    includes: [
      "Проектирование ролей и бизнес-процессов",
      "API и база данных",
      "Интерфейс и админ-панель",
      "Тестирование перед релизом",
    ],
    team: ["Тимлид", "Backend-разработчик", "Frontend-разработчик", "QA-инженер"],
    projectId: null,
  },
  {
    category: "bots",
    title: "Telegram-боты",
    description:
      "Автоматизация процессов и коммуникации прямо в мессенджере клиента.",
    includes: [
      "Сценарии диалогов",
      "Интеграция с CRM или таблицами",
      "Админ-панель для управления",
      "Деплой и сопровождение",
    ],
    team: ["Backend-разработчик", "Frontend-разработчик"],
    projectId: null,
  },
  {
    category: "ai",
    title: "AI-интеграции",
    description:
      "Чат-боты, компьютерное зрение и аналитика поверх готовых моделей.",
    includes: [
      "Подбор модели под задачу",
      "Интеграция LLM или компьютерного зрения",
      "API для вашего продукта",
      "Проверка качества на ваших данных",
    ],
    team: ["AI/ML-инженер", "Backend-разработчик"],
    projectId: null,
  },
];

// Request form choices: the API takes any string ≤150 as project_type.
export const PROJECT_TYPES = SERVICES.map((service) => service.title).concat(
  "Другое",
) as [string, ...string[]];

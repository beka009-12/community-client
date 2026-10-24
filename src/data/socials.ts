export interface SocialLink {
  href: string;
  label: string;
}

// TODO: fill in the community's real links. An empty href hides the link
// everywhere (footer, contact page, the students line on the home page).
export const SOCIAL_LINKS: SocialLink[] = [
  { href: "", label: "Telegram" },
  { href: "", label: "WhatsApp" },
  { href: "", label: "Instagram" },
  { href: "", label: "LinkedIn" },
];

// Students apply through Telegram.
export const TELEGRAM_URL =
  SOCIAL_LINKS.find((link) => link.label === "Telegram")?.href ?? "";

export const visibleSocials = (): SocialLink[] =>
  SOCIAL_LINKS.filter((link) => link.href !== "");

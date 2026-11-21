export interface SocialLink {
  href: string;
  label: string;
}

// TODO: fill in the community's real links. An empty href hides the link on
// the contact page and the students line; the footer still shows the
// Instagram, Telegram and LinkedIn pills, just not as links.
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

// The networks the footer always shows, in this order.
export const FOOTER_SOCIALS = ["Instagram", "Telegram", "LinkedIn"] as const;

export const socialHref = (label: string): string =>
  SOCIAL_LINKS.find((link) => link.label === label)?.href ?? "";

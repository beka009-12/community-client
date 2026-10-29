import type { Metadata } from "next";
import { Unbounded, Onest, JetBrains_Mono } from "next/font/google";
import "./globals.scss";

const displayFont = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "700", "800"],
});

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "Motion Community",
  description:
    "Сообщество разработчиков Motion из Бишкека: сайты, веб-системы, Telegram-боты и AI-интеграции под ваш проект.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${displayFont.variable} ${onest.variable} ${mono.variable}`}
    >
      <body cz-shortcut-listen="true">{children}</body>
    </html>
  );
}

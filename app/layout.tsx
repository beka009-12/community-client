import type { Metadata } from "next";
import { Onest, Montserrat } from "next/font/google";
import "./globals.scss";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
});

// Only the logo lockup's «COMMUNITY» uses it.
const wordmark = Montserrat({
  variable: "--font-wordmark",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Motion Community",
  description:
    "Motion Community — проектная команда при IT-академии MotionWeb, Бишкек: сайты, веб-системы, Telegram-боты и AI-интеграции под ваш проект.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${onest.variable} ${wordmark.variable}`}
    >
      <body cz-shortcut-listen="true">{children}</body>
    </html>
  );
}

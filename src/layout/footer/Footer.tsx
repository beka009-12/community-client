import { FC } from "react";
import Image from "next/image";
import { cacheLife } from "next/cache";
import Link from "next/link";
import Button from "@/src/ui/Button";
import { visibleSocials } from "@/src/data/socials";
import scss from "./Footer.module.scss";

const NAV_LINKS = [
  { href: "/projects", label: "Проекты" },
  { href: "/team", label: "Команда" },
  { href: "/contact", label: "Контакты" },
];

// cacheComponents won't prerender a bare `new Date()`; the year goes into
// the cached shell and is refreshed daily.
async function currentYear(): Promise<number> {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

interface FooterProps {
  loginHref: string;
}

const Footer: FC<FooterProps> = async ({ loginHref }) => {
  const year = await currentYear();
  const socials = visibleSocials();

  return (
    <footer className={`container ${scss.footer}`}>
      <div className={scss.footer__top}>
        <div className={scss.footer__brand}>
          <Image
            src="/brand/motion-logo.svg"
            alt="Motion Community"
            width={253}
            height={134}
            className={scss.logo}
          />
          <p className={scss.muted}>Сообщество разработчиков, Бишкек</p>
        </div>

        <div className={scss.footer__columns}>
          <nav aria-label="Навигация в подвале" className={scss.column}>
            <span className={scss.column__label}>Навигация</span>
            <ul className={scss.links}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {socials.length > 0 && (
            <div className={scss.column}>
              <span className={scss.column__label}>Соцсети</span>
              <ul className={scss.links}>
                {socials.map((social) => (
                  <li key={social.label}>
                    <a href={social.href} target="_blank" rel="noreferrer">
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className={scss.column}>
            <span className={scss.column__label}>Для участников</span>
            <Button href={loginHref} variant="outline" arrow>
              Войти в портал
            </Button>
          </div>
        </div>
      </div>

      <div className={scss.footer__bottom}>
        <span>© {year} Motion Community</span>
        <span>Бишкек, Кыргызстан</span>
      </div>

      <div className={scss.wordmark} aria-hidden="true">
        COMMUNITY
      </div>
    </footer>
  );
};

export default Footer;

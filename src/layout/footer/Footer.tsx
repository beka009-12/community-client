import { FC } from "react";
import Image from "next/image";
import { cacheLife } from "next/cache";
import Link from "next/link";
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
    <footer className={scss.footer}>
      <div className={`container ${scss.footer__inner}`}>
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

        <ul className={scss.footer__list}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
          <li>
            <a href={loginHref} className={scss.muted}>
              Войти для участников
            </a>
          </li>
        </ul>

        {socials.length > 0 && (
          <ul className={scss.footer__list}>
            {socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noreferrer">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={`container ${scss.footer__bottom}`}>© {year} Motion Community</div>
    </footer>
  );
};

export default Footer;

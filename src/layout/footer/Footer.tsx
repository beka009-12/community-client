import { FC } from "react";
import { cacheLife } from "next/cache";
import Link from "next/link";
import Button from "@/src/ui/Button";
import LogoLockup from "@/src/ui/LogoLockup";
import SocialIcon from "@/src/ui/SocialIcon";
import { FOOTER_SOCIALS, socialHref } from "@/src/data/socials";
import { ACADEMY_URL } from "@/src/data/academy";
import { typograph } from "@/src/lib/typograph";
import { glowStyle } from "@/src/layout/backdrop/glow";
import { FOOTER_HAZE } from "@/src/layout/backdrop/nebula-data";
import scss from "./Footer.module.scss";

const HAZE_STYLE = glowStyle(FOOTER_HAZE);

const NAV_LINKS = [
  { href: "/", label: "Главная" },
  { href: "/about", label: "О нас" },
  { href: "/projects", label: "Проекты" },
  { href: "/team", label: "Участники" },
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

// An inset glass panel, like the closing call above it, over a low blue haze.
const Footer: FC<FooterProps> = async ({ loginHref }) => {
  const year = await currentYear();

  return (
    <footer className={scss.footer}>
      <div className={scss.footer__haze} aria-hidden="true">
        <span style={HAZE_STYLE} />
      </div>
      <div className={scss.panel}>
        <div className="container">
          <div className={scss.footer__top}>
            <div className={scss.footer__brand}>
              <Link href="/" className={scss.logo} aria-label="Motion Community — на главную">
                <LogoLockup size="lg" />
              </Link>
              <p className={scss.muted}>
                {typograph(
                  "Проектная команда при IT-академии MotionWeb. Делаем сайты, веб-системы, Telegram-ботов и AI-интеграции.",
                )}
              </p>
              <ul className={scss.socials} aria-label="Мы в соцсетях">
                {FOOTER_SOCIALS.map((network) => {
                  const href = socialHref(network);
                  const content = (
                    <>
                      <SocialIcon network={network} className={scss.social__icon} />
                      {network}
                    </>
                  );
                  return (
                    <li key={network}>
                      {href ? (
                        <a href={href} target="_blank" rel="noreferrer" className={scss.social}>
                          {content}
                        </a>
                      ) : (
                        <span className={scss.social}>{content}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className={scss.footer__columns}>
              <nav aria-label="Навигация в подвале" className={scss.column}>
                <span className={scss.column__label}>Сайт</span>
                <ul className={scss.links}>
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className={scss.column}>
                <span className={scss.column__label}>Связаться</span>
                <ul className={scss.links}>
                  <li>
                    <Link href="/contact" className={scss.links__accent}>
                      Обсудить проект
                    </Link>
                  </li>
                  <li className={scss.links__text}>Бишкек, Кыргызстан</li>
                  <li className={scss.links__text}>Работаем онлайн</li>
                </ul>
              </div>

              <div className={scss.column}>
                <span className={scss.column__label}>Участникам</span>
                <Button href={loginHref} variant="outline">
                  Войти в портал
                </Button>
                <ul className={scss.links}>
                  <li>
                    <a href={ACADEMY_URL} target="_blank" rel="noreferrer">
                      Академия MotionWeb ↗
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className={scss.footer__bottom}>
            <span>© {year} Motion Community</span>
            <span>Часть IT-академии MotionWeb</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

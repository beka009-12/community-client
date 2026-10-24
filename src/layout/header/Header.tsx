"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Button from "@/src/ui/Button";
import { motionTokens } from "@/src/lib/motion-tokens";
import scss from "./Header.module.scss";

const NAV_LINKS = [
  { href: "/projects", label: "Проекты" },
  { href: "/team", label: "Команда" },
  { href: "/contact", label: "Контакты" },
];

// A section link stays active on its nested pages (/projects/12).
const isActive = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

const Header: FC = () => {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  // The menu belongs to the page it was opened on, so navigating closes it.
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const menuOpen = menuPath === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuPath(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuPath(null);

  return (
    <header
      className={`${scss.header} ${scrolled || menuOpen ? scss["header--solid"] : ""}`}
    >
      <div className={`container ${scss.header__inner}`}>
        <Link href="/" className={scss.logo} aria-label="Motion Community — на главную">
          <Image
            src="/brand/motion-logo.svg"
            alt="Motion Community"
            width={253}
            height={134}
            className={scss.logo__image}
            priority
          />
        </Link>

        <nav className={scss.nav} aria-label="Основная навигация">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${scss.nav__link} ${active ? scss["nav__link--active"] : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
          <Button href="/contact" className={scss.nav__cta}>
            Обсудить проект
          </Button>
        </nav>

        <button
          type="button"
          className={scss.burger}
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuPath(menuOpen ? null : pathname)}
        >
          <span className={menuOpen ? scss["burger__line--open1"] : ""} />
          <span className={menuOpen ? scss["burger__line--open2"] : ""} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            key="mobile-menu"
            id="mobile-menu"
            className={scss.menu}
            aria-label="Мобильная навигация"
            initial={{ opacity: 0, y: reduce ? 0 : -motionTokens.distance.sm }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -motionTokens.distance.sm }}
            transition={{
              duration: reduce ? motionTokens.duration.instant : motionTokens.duration.fast,
              ease: motionTokens.easing.smooth,
            }}
          >
            <div className={`container ${scss.menu__inner}`}>
              {NAV_LINKS.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`${scss.menu__link} ${active ? scss["menu__link--active"] : ""}`}
                    aria-current={active ? "page" : undefined}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Button href="/contact" className={scss.menu__cta}>
                Обсудить проект
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

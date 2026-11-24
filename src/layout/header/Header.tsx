"use client";

import { FC, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Button from "@/src/ui/Button";
import LogoLockup from "@/src/ui/LogoLockup";
import { motionTokens } from "@/src/lib/motion-tokens";
import scss from "./Header.module.scss";

const NAV_LINKS = [
  { href: "/", label: "Главная" },
  { href: "/about", label: "О нас" },
  { href: "/projects", label: "Проекты" },
  { href: "/team", label: "Команда" },
  { href: "/contact", label: "Контакты" },
];

// A section link stays active on its nested pages (/projects/12); home only
// on itself.
const isActive = (pathname: string, href: string) =>
  pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

// Translucent black over the page's nebula: the logo on the left, the menu
// in a glass pill in the middle, the main action on the right.
const Header: FC = () => {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  // The menu belongs to the page it was opened on, so navigating closes it.
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const menuOpen = menuPath === pathname;
  const burgerRef = useRef<HTMLButtonElement>(null);
  // Hidden on /contact, the page it leads to.
  const ctaHidden = pathname === "/contact";

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuPath(null);
      // Focus may be on a menu link that is about to unmount.
      burgerRef.current?.focus();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuPath(null);

  return (
    <header className={scss.header}>
      <div className={`container ${scss.header__inner}`}>
        <Link href="/" className={scss.logo} aria-label="Motion Community — на главную">
          <LogoLockup />
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
        </nav>

        <div className={scss.actions}>
          {!ctaHidden && (
            <Button href="/contact" arrow className={scss.actions__cta}>
              Обсудить проект
            </Button>
          )}
          <button
            ref={burgerRef}
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
              {!ctaHidden && (
                <Button href="/contact" arrow className={scss.menu__cta}>
                  Обсудить проект
                </Button>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

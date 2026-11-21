"use client";

import { FC, useEffect, useRef } from "react";
import HeroLogoParticles from "@/src/animation/HeroLogoParticles";
import Button from "@/src/ui/Button";
import { useMediaQuery } from "@/src/hooks/useMediaQuery";
import { heroTheme } from "@/src/lib/hero-theme";
import { typograph } from "@/src/lib/typograph";
import scss from "./HomeHero.module.scss";

const TITLE_LINES = ["Из академии —", "в команду.", "Из идеи — в продукт."];

// Dark first screen, the full height of the window: the pitch on the left,
// the particle logo on the right.
const HomeHero: FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  // Stacked on tablets and phones, where the logo is left out.
  const isCompact = useMediaQuery("(max-width: 1024px)");

  // The header stays dark while the hero is behind it.
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const headerHeight =
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || 80;
    const update = () => heroTheme.set(hero.getBoundingClientRect().bottom > headerHeight);

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      // The next visit to home starts on the dark hero again.
      heroTheme.set(true);
    };
  }, []);

  return (
    <section ref={heroRef} className={`theme-dark ${scss.hero}`} aria-labelledby="home-title">
      {!isCompact && <HeroLogoParticles markRef={markRef} className={scss.canvas} />}
      <div className={`container ${scss.inner}`}>
        <div className={scss.copy}>
          <p className={scss.badge}>MotionWeb / Community</p>
          <h1 id="home-title" className={scss.title}>
            {TITLE_LINES.map((line) => (
              <span key={line} className={scss.title__line}>
                {typograph(line)}{" "}
              </span>
            ))}
          </h1>
          <p className={scss.lead}>
            {typograph(
              "Мы — проектное сообщество при MotionWeb. Объединяем выпускников и менторов, чтобы создавать цифровые продукты для бизнеса.",
            )}
          </p>
          <div className={scss.actions}>
            <Button href="/contact" size="lg">
              Обсудить проект
            </Button>
            <Button href="/projects" variant="secondary" size="lg">
              Наши проекты
            </Button>
          </div>
        </div>

        <div ref={markRef} className={scss.mark} aria-hidden="true" />

        <p className={scss.place}>Бишкек, Кыргызстан · Работаем онлайн</p>
      </div>
    </section>
  );
};

export default HomeHero;

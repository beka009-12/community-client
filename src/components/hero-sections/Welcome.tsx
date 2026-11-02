"use client";

import { FC, useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import HeroLogoParticles from "@/src/animation/HeroLogoParticles";
import { clamp01, edgeCover, heroScroll } from "@/src/animation/hero-wipe";
import Button from "@/src/ui/Button";
import { useMediaQuery } from "@/src/hooks/useMediaQuery";
import { heroTheme } from "@/src/lib/hero-theme";
import scss from "./Welcome.module.scss";

// Dark first screen. It stays pinned while its logo scatters into dots and
// the next section, pulled up over it, slides in with a dotted top edge.
const Welcome: FC = () => {
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  // ≤1024px the hero stacks and a CSS dotted logo stands in for the particles.
  const isCompact = useMediaQuery("(max-width: 1024px)");
  const reduce = useReducedMotion();

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const content = contentRef.current;
    if (!track || !stage || !content) return;
    const headerHeight =
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || 80;

    const update = () => {
      if (reduce) {
        heroTheme.set(track.getBoundingClientRect().bottom > headerHeight);
        return;
      }
      const scroll = heroScroll(track, stage);
      // The header turns light once the dotted edge is thick behind it.
      heroTheme.set(edgeCover(headerHeight / 2, scroll) < 0.3);
      // The copy leaves with the logo, before the light edge reaches it.
      content.style.opacity = String(clamp01(1 - scroll.scatter * 1.25));
      content.style.transform = `translateY(${-scroll.scatter * 40}px)`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      // The next visit to home starts on the dark hero again.
      heroTheme.set(true);
    };
  }, [reduce]);

  return (
    <section ref={trackRef} className={scss.hero}>
      <div ref={stageRef} className={`theme-dark ${scss.stage}`}>
        <HeroLogoParticles
          trackRef={trackRef}
          stageRef={stageRef}
          markRef={markRef}
          showLogo={!isCompact}
          className={scss.canvas}
        />
        <div ref={contentRef} className={`container ${scss.content}`}>
          <div className={scss.copy}>
            <h1 className={scss.title}>Соберём команду разработчиков под ваш проект</h1>
            <p className={scss.lead}>
              Сообщество разработчиков из Бишкека. Делаем сайты, веб-системы, Telegram-боты и
              AI-интеграции: от идеи до запуска и поддержки.
            </p>
            <div className={scss.actions}>
              <Button href="/contact" size="lg">
                Обсудить проект
              </Button>
              <Button href="/projects" variant="outline" size="lg">
                Смотреть проекты
              </Button>
            </div>
          </div>

          <div className={scss.mark} aria-hidden="true">
            <span className={scss.mark__ring} />
            <span className={`${scss.mark__ring} ${scss["mark__ring--outer"]}`} />
            <div ref={markRef} className={scss.mark__logo}>
              {isCompact && <span className={scss.mark__dots} />}
            </div>
          </div>
        </div>
      </div>
      {/* The scroll the stage stays pinned for while the wipe runs. */}
      <div className={scss.runway} aria-hidden="true" />
    </section>
  );
};

export default Welcome;

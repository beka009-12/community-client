"use client";

import { FC } from "react";
import HeroLogoParticles from "@/src/animation/HeroLogoParticles";
import Badge from "@/src/ui/Badge";
import Button from "@/src/ui/Button";
import { useMediaQuery } from "@/src/hooks/useMediaQuery";
import type { StatCell } from "@/src/lib/stats-cells";
import scss from "./Welcome.module.scss";

const Welcome: FC<{ stats: StatCell[] }> = ({ stats }) => {
  // ≤1024px the hero stacks; a CSS dotted logo stands in for the particle
  // canvas so phones don't run the animation.
  const isCompact = useMediaQuery("(max-width: 1024px)");

  return (
    <section className={scss.hero}>
      <div className={`container ${scss.hero__grid}`}>
        <div className={scss.copy}>
          <Badge>Сообщество разработчиков Motion, Бишкек</Badge>
          <h1 className={scss.title}>
            Соберём <span className={scss.title__accent}>команду</span> разработчиков под
            ваш проект
          </h1>
          <p className={scss.lead}>
            Сайты, веб-системы, Telegram-боты и AI-интеграции — от идеи до запуска и
            поддержки.
          </p>
          <div className={scss.actions}>
            <Button href="/contact" size="lg" arrow>
              Обсудить проект
            </Button>
            <Button href="/projects" variant="outline" size="lg">
              Наши проекты
            </Button>
          </div>
        </div>

        <div className={scss.mark} aria-hidden="true">
          <span className={scss.mark__ring} />
          <span className={`${scss.mark__ring} ${scss["mark__ring--outer"]}`} />
          {isCompact ? (
            <span className={scss.mark__dots} />
          ) : (
            <HeroLogoParticles className={scss.mark__canvas} ariaLabel="Motion Community" />
          )}
        </div>
      </div>

      {stats.length > 0 && (
        <div className={`container ${scss.stats__wrap}`}>
          <dl className={scss.stats}>
            {stats.map((cell, index) => (
              <div key={cell.label.join(" ")} className={scss.stat}>
                <dt className={scss.stat__label}>
                  {cell.label[0]}
                  <br />
                  {cell.label[1]}
                </dt>
                <dd
                  className={`${scss.stat__value} ${index === 0 ? scss["stat__value--accent"] : ""}`}
                >
                  {cell.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
};

export default Welcome;

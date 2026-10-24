"use client";

import { FC } from "react";
import Image from "next/image";
import HeroLogoParticles from "@/src/animation/HeroLogoParticles";
import Button from "@/src/ui/Button";
import { useMediaQuery } from "@/src/hooks/useMediaQuery";
import scss from "./Welcome.module.scss";

// `stats` is the ready sentence; empty when there is nothing to count yet.
const Welcome: FC<{ stats: string }> = ({ stats }) => {
  // ≤1024px the particle canvas has no room next to the headline, so a
  // static, blurred logo sits behind the text instead.
  const isCompact = useMediaQuery("(max-width: 1024px)");

  return (
    <section className={scss.hero}>
      <div className={`container ${scss.hero__grid}`}>
        <div className={scss.copy}>
          {isCompact && (
            <Image
              src="/brand/motion-logo-particles.png"
              alt=""
              aria-hidden="true"
              width={85}
              height={57}
              className={scss.glyph}
            />
          )}

          <h1 className={`page-title ${scss.title}`}>
            Соберём команду разработчиков под ваш проект
          </h1>
          <p className={scss.lead}>
            Сайты, веб-системы, Telegram-боты и AI-интеграции. Сообщество
            разработчиков Motion, Бишкек.
          </p>
          <div className={scss.actions}>
            <Button href="/contact">Обсудить проект</Button>
            <Button href="/projects" variant="link">
              Наши проекты
            </Button>
          </div>
          {stats && <p className={scss.stats}>{stats}</p>}
        </div>

        {!isCompact && (
          <div className={scss.stage}>
            <HeroLogoParticles className={scss.stage__marks} ariaLabel="Motion Community" />
          </div>
        )}
      </div>
    </section>
  );
};

export default Welcome;

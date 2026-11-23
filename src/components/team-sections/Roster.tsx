"use client";

import { FC, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { motionTokens, springs } from "@/src/lib/motion-tokens";
import Avatar from "@/src/ui/Avatar";
import Button from "@/src/ui/Button";
import { POSITIONS, type Position } from "@/src/lib/api-enums";
import { POSITION_SHORT_LABELS, positionsLabel } from "@/src/lib/api-labels";
import { fullName } from "@/src/lib/people";
import type { MemberListItem } from "@/src/server/api/schemas";
import scss from "./Roster.module.scss";

type FilterKey = "all" | Position;

// Two rows of six; the rest behind «Показать всех участников».
const FIRST_ROWS = 12;

// «Участники»: the title with the direction filters on its line, then a
// grid of square portraits. Hover lights the portrait up in the accent.
const Roster: FC<{ members: MemberListItem[] }> = ({ members }) => {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<FilterKey>("all");
  const [showAll, setShowAll] = useState(false);
  const gridRef = useRef<HTMLUListElement>(null);

  const filters = useMemo(() => {
    const present = POSITIONS.map((position) => ({
      key: position as FilterKey,
      label: POSITION_SHORT_LABELS[position],
      count: members.filter((member) => member.positions.includes(position)).length,
    })).filter((item) => item.count > 0);
    return [{ key: "all" as FilterKey, label: "Все", count: members.length }, ...present];
  }, [members]);

  const visible =
    filter === "all" ? members : members.filter((member) => member.positions.includes(filter));
  const shown = showAll ? visible : visible.slice(0, FIRST_ROWS);

  // The first newly shown person takes the focus, not a button that is gone.
  const revealAll = () => {
    setShowAll(true);
    requestAnimationFrame(() => {
      gridRef.current?.querySelectorAll<HTMLAnchorElement>("a")[FIRST_ROWS]?.focus();
    });
  };

  return (
    <section className={scss.roster} aria-labelledby="roster-title">
      <div className="container">
        <div className={scss.head}>
          <h2 id="roster-title" className={scss.title}>
            Участники
          </h2>
          {filters.length > 2 && (
            <div className={scss.filters} role="group" aria-label="Фильтр по направлению">
              {filters.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  className={scss.filter}
                  aria-pressed={filter === item.key}
                  onClick={() => setFilter(item.key)}
                >
                  {item.label}
                  <span className={scss.filter__count}>{item.count}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <ul ref={gridRef} className={scss.grid}>
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((member) => {
              const name = fullName(member);
              const position = positionsLabel(member.positions, POSITION_SHORT_LABELS) ?? "Участник";
              return (
                <motion.li
                  key={member.id}
                  layout={!reduce}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: motionTokens.duration.fast } }}
                  transition={springs.gentle}
                >
                  <Link href={`/team/${member.id}`} className={scss.card}>
                    <span className={scss.card__photo}>
                      <Avatar
                        src={member.avatar}
                        name={name}
                        sizes="(max-width: 479px) 50vw, (max-width: 767px) 33vw, (max-width: 1100px) 25vw, 240px"
                        imageClassName={scss.card__img}
                        fallbackClassName={scss.card__initials}
                      />
                    </span>
                    <span className={scss.card__name}>{name}</span>
                    <span className={scss.card__position}>{position}</span>
                  </Link>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>

        {!showAll && visible.length > FIRST_ROWS && (
          <div className={scss.more}>
            <Button variant="secondary" onClick={revealAll}>
              Показать всех участников
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Roster;

"use client";

import { FC, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { motionTokens, springs } from "@/src/lib/motion-tokens";
import Avatar from "@/src/ui/Avatar";
import { POSITIONS, type Position } from "@/src/lib/api-enums";
import { POSITION_LABELS, positionLabel } from "@/src/lib/api-labels";
import { fullName } from "@/src/lib/people";
import type { MemberListItem } from "@/src/server/api/schemas";
import scss from "./Roster.module.scss";

type FilterKey = "all" | Position;

// Portrait cards: greyscale photos turn colour on hover/focus. Filters list
// only the directions someone actually has, with a count each.
const Roster: FC<{ members: MemberListItem[] }> = ({ members }) => {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<FilterKey>("all");

  const filters = useMemo(() => {
    const present = POSITIONS.map((position) => ({
      key: position as FilterKey,
      label: POSITION_LABELS[position],
      count: members.filter((member) => member.position === position).length,
    })).filter((item) => item.count > 0);
    return [{ key: "all" as FilterKey, label: "Все", count: members.length }, ...present];
  }, [members]);

  const visible =
    filter === "all" ? members : members.filter((member) => member.position === filter);

  return (
    <section className={`container ${scss.roster}`}>
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

      <ul className={scss.grid}>
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((member) => {
            const name = fullName(member);
            const position = positionLabel(member.position) ?? "Участник";
            return (
              <motion.li
                key={member.id}
                layout={!reduce}
                initial={{ opacity: 0, y: reduce ? 0 : motionTokens.distance.sm }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: motionTokens.duration.fast } }}
                transition={springs.gentle}
              >
                <Link href={`/team/${member.id}`} className={scss.card}>
                  <span className={scss.card__photo}>
                    <Avatar src={member.avatar} name={name} imageClassName={scss.card__img} />
                  </span>
                  <span className={scss.card__body}>
                    <span className={scss.card__text}>
                      <span className={scss.card__name}>{name}</span>
                      <span className={scss.card__position}>{position}</span>
                    </span>
                    <span className={scss.card__arrow} aria-hidden="true">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 17 17 7M8 7h9v9" />
                      </svg>
                    </span>
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </section>
  );
};

export default Roster;

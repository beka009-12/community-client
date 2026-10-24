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

// Contact sheet: one grid of hairlines, a square portrait per person with the
// name and position always visible. Hover lights the portrait up (a photo
// goes from greyscale to colour). Filters list only directions someone has.
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

      <ul className={scss.sheet}>
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((member) => {
            const name = fullName(member);
            const position = positionLabel(member.position) ?? "Участник";
            return (
              <motion.li
                key={member.id}
                layout={!reduce}
                className={scss.cell}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: motionTokens.duration.fast } }}
                transition={springs.gentle}
              >
                <Link href={`/team/${member.id}`} className={scss.cell__link}>
                  <span className={scss.cell__portrait}>
                    <Avatar
                      src={member.avatar}
                      name={name}
                      imageClassName={scss.cell__img}
                      fallbackClassName={scss.cell__initials}
                    />
                  </span>
                  <span className={scss.cell__meta}>
                    <span className={scss.cell__text}>
                      <span className={scss.cell__name}>{name}</span>
                      <span className={scss.cell__position}>{position}</span>
                    </span>
                    <span className={scss.cell__arrow} aria-hidden="true">
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

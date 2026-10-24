"use client";

import { FC } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { motionTokens, springs } from "@/src/lib/motion-tokens";
import ProjectCover from "@/src/ui/ProjectCover";
import StatusPill from "@/src/ui/StatusPill";
import type { ProjectListItem } from "@/src/server/api/schemas";
import scss from "./Grid.module.scss";

// Cards render in place on load (AnimatePresence initial={false}), so the
// server HTML is the final state; only filter changes animate.
const Grid: FC<{ projects: ProjectListItem[] }> = ({ projects }) => {
  const reduce = useReducedMotion();
  const offset = reduce ? 0 : motionTokens.distance.sm;

  if (projects.length === 0) {
    return (
      <div className={scss.gridWrap}>
        <p className={scss.empty}>
          Под этот фильтр пока ничего не попадает — попробуйте другое
          сочетание.
        </p>
      </div>
    );
  }

  return (
    <div className={scss.gridWrap}>
      <div className={scss.grid}>
        <AnimatePresence mode="popLayout" initial={false}>
          {projects.map((project) => (
            <motion.div
              key={project.id}
              layout={!reduce}
              initial={{ opacity: 0, y: offset }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: motionTokens.duration.fast } }}
              transition={springs.gentle}
              className={scss.card}
            >
              <Link href={`/projects/${project.id}`} className={scss.card__link}>
                <div className={scss.card__photo}>
                  <ProjectCover
                    src={project.image}
                    name={project.name}
                    imageClassName={scss.card__image}
                  />
                </div>
                <div className={scss.card__body}>
                  <h3 className={scss.card__name}>{project.name}</h3>
                  <div className={scss.card__meta}>
                    <StatusPill status={project.status} />
                    <span>{project.category}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Grid;

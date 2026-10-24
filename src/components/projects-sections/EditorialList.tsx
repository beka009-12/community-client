"use client";

import { FC, useState } from "react";
import type { MouseEvent } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import ProjectCover from "@/src/ui/ProjectCover";
import StatusPill from "@/src/ui/StatusPill";
import type { ProjectListItem } from "@/src/server/api/schemas";
import scss from "./EditorialList.module.scss";

// Desktop-only (≥1024px, toggled in CSS). Touch screens keep the card grid:
// a cursor-follow preview has no touch equivalent.
const EditorialList: FC<{ projects: ProjectListItem[] }> = ({ projects }) => {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);

  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const springX = useSpring(mvX, { stiffness: 300, damping: 30, mass: 0.5 });
  const springY = useSpring(mvY, { stiffness: 300, damping: 30, mass: 0.5 });

  const handleMouseMove = (event: MouseEvent<HTMLUListElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    // Offset up-and-right so the preview never sits under the pointer.
    mvX.set(event.clientX - rect.left + 28);
    mvY.set(event.clientY - rect.top - 150);
  };

  const hoveredProject = projects.find((project) => project.id === hovered);

  if (projects.length === 0) {
    return (
      <div className={scss.listWrap}>
        <p className={scss.empty}>
          Под этот фильтр пока ничего не попадает — попробуйте другое
          сочетание.
        </p>
      </div>
    );
  }

  return (
    <div className={scss.listWrap}>
      <ul
        className={scss.list}
        onMouseMove={reduce ? undefined : handleMouseMove}
        onMouseLeave={() => setHovered(null)}
      >
        {projects.map((project, index) => (
          <li key={project.id}>
            <Link
              href={`/projects/${project.id}`}
              className={scss.row}
              data-active={hovered === project.id}
              onMouseEnter={() => setHovered(project.id)}
            >
              <span className={scss.row__index}>{String(index + 1).padStart(2, "0")}</span>
              <span className={scss.row__name}>{project.name}</span>
              <StatusPill status={project.status} />
              <span className={scss.row__category}>{project.category}</span>
              <span className={scss.row__arrow} aria-hidden="true">
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
            </Link>
          </li>
        ))}

        {!reduce && (
          <AnimatePresence>
            {hoveredProject && (
              <motion.li
                key={hoveredProject.id}
                aria-hidden="true"
                className={scss.preview}
                style={{ x: springX, y: springY, rotate: -4 }}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.2 }}
              >
                <ProjectCover
                  src={hoveredProject.image}
                  name={hoveredProject.name}
                  imageClassName={scss.preview__image}
                />
              </motion.li>
            )}
          </AnimatePresence>
        )}
      </ul>
    </div>
  );
};

export default EditorialList;

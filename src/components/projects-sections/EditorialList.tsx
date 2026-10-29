"use client";

import { FC, useState } from "react";
import type { MouseEvent } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import ProjectCover from "@/src/ui/ProjectCover";
import StatusPill from "@/src/ui/StatusPill";
import type { ProjectListItem } from "@/src/server/api/schemas";
import scss from "./EditorialList.module.scss";

// .preview's width in the SCSS, and its gap from the pointer.
const PREVIEW_WIDTH = 300;
const PREVIEW_GAP = 28;

// Desktop-only (≥1024px, toggled in CSS). Touch screens keep the card grid:
// a cursor-follow preview has no touch equivalent.
const EditorialList: FC<{ projects: ProjectListItem[] }> = ({ projects }) => {
  const reduce = useReducedMotion();
  // The preview stays mounted and only fades: a spring-driven element that
  // mounts mid-animation stops receiving that spring's frames (Motion 13),
  // which left it pinned to the top of the list.
  const [previewId, setPreviewId] = useState<number | null>(null);
  const [previewVisible, setPreviewVisible] = useState(false);

  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const springX = useSpring(mvX, { stiffness: 300, damping: 30, mass: 0.5 });
  const springY = useSpring(mvY, { stiffness: 300, damping: 30, mass: 0.5 });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    // Up and to the right so the preview never sits under the pointer. Near
    // the list's right edge it flips to the left of the pointer: sticking
    // out, it widened the page and scrolled it sideways.
    const right = x + PREVIEW_GAP;
    mvX.set(right + PREVIEW_WIDTH <= rect.width ? right : x - PREVIEW_GAP - PREVIEW_WIDTH);
    mvY.set(event.clientY - rect.top - 150);
  };

  const previewProject = projects.find((project) => project.id === previewId);

  return (
    <div
      className={scss.listWrap}
      onMouseMove={reduce ? undefined : handleMouseMove}
      onMouseLeave={() => setPreviewVisible(false)}
    >
      <ul className={scss.list}>
        {projects.map((project, index) => (
          <li key={project.id}>
            <Link
              href={`/projects/${project.id}`}
              className={scss.row}
              data-active={previewVisible && previewId === project.id}
              onMouseEnter={() => {
                setPreviewId(project.id);
                setPreviewVisible(true);
              }}
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
      </ul>

      {!reduce && (
        <motion.div
          aria-hidden="true"
          className={scss.preview}
          style={{ x: springX, y: springY }}
          initial={false}
          animate={{ opacity: previewVisible ? 1 : 0, scale: previewVisible ? 1 : 0.92 }}
          transition={{ duration: 0.2 }}
        >
          {previewProject && (
            <ProjectCover
              src={previewProject.image}
              name={previewProject.name}
              imageClassName={scss.preview__image}
            />
          )}
        </motion.div>
      )}
    </div>
  );
};

export default EditorialList;

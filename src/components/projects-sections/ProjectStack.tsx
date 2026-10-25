"use client";

import { FC, useRef, type CSSProperties } from "react";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import ProjectCover from "@/src/ui/ProjectCover";
import StatusPill from "@/src/ui/StatusPill";
import type { ProjectListItem } from "@/src/server/api/schemas";
import scss from "./ProjectStack.module.scss";

type Range = [number, number];

// How far a covered plate shrinks, darkens and lifts so its top edge peeks
// out above the plate that covers it. Darkening is an overlay, not opacity:
// a translucent plate would let the plates stacked under it show through.
const COVERED = { scale: 0.94, dim: 0.5, lift: -28 };

// One segment of scroll progress per transition, `steps` = plates - 1.
// Motion runs scroll-linked transforms as native animations, which reject
// offsets outside 0–1, so a plate with no segment on one side gets null.
const segment = (index: number, steps: number): Range | null =>
  index >= 0 && index < steps ? [index / steps, (index + 1) / steps] : null;

// Hooks can't be skipped, so a plate without a range maps the whole
// progress onto one constant value.
const STILL: Range = [0, 1];

const pad = (value: number) => String(value).padStart(2, "0");

interface PlateProps {
  project: ProjectListItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  onFocus: (index: number) => void;
}

const Plate: FC<PlateProps> = ({ project, index, total, progress, onFocus }) => {
  const steps = total - 1;
  const enter = segment(index - 1, steps);
  const cover = segment(index, steps);

  const y = useTransform(progress, enter ?? STILL, enter ? ["100%", "0%"] : ["0%", "0%"]);
  const scale = useTransform(progress, cover ?? STILL, cover ? [1, COVERED.scale] : [1, 1]);
  const dim = useTransform(progress, cover ?? STILL, cover ? [0, COVERED.dim] : [0, 0]);
  const lift = useTransform(progress, cover ?? STILL, cover ? [0, COVERED.lift] : [0, 0]);
  // A waiting plate sits just under the deck's clipped edge, but its shadow
  // reaches above it and darkened the name of the plate on top; it fades in
  // as the plate slides up instead.
  const shade = useTransform(progress, enter ?? STILL, enter ? [0, 0.45] : [0.45, 0.45]);
  const boxShadow = useMotionTemplate`0 -24px 48px rgba(0, 0, 0, ${shade})`;

  return (
    <motion.li className={scss.plate} style={{ y, zIndex: index + 1 }}>
      <motion.div className={scss.plate__body} style={{ scale, y: lift, boxShadow }}>
        <Link
          href={`/projects/${project.id}`}
          className={scss.plate__link}
          // Mouse presses focus links too; only keyboard focus should scroll.
          onFocus={(event) => {
            if (event.currentTarget.matches(":focus-visible")) onFocus(index);
          }}
        >
          <ProjectCover src={project.image} name={project.name} />
          <span className={scss.plate__shade} aria-hidden="true" />

          <span className={scss.plate__top}>
            <span className={scss.plate__status}>
              <StatusPill status={project.status} />
            </span>
            <span className={scss.plate__arrow} aria-hidden="true">
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

          <span className={scss.plate__bottom}>
            <span className={scss.plate__meta}>
              {pad(index + 1)} / {pad(total)}
              {project.category && ` · ${project.category}`}
            </span>
            <span className={scss.plate__name}>{project.name}</span>
          </span>
        </Link>
        <motion.span className={scss.plate__dim} style={{ opacity: dim }} aria-hidden="true" />
      </motion.div>
    </motion.li>
  );
};

// Touch screens (below 1024px, toggled in CSS; EditorialList takes over with
// a mouse): the stage stays pinned while the page scrolls past it and each
// project slides up over the previous one — the old desktop showcase.
const ProjectStack: FC<{ projects: ProjectListItem[] }> = ({ projects }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const steps = projects.length - 1;
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Tabbing onto a plate that hasn't slid in yet scrolls to the point where
  // it sits on top.
  const revealPlate = (index: number) => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage || steps === 0) return;
    if (getComputedStyle(stage).position !== "sticky") return;
    const top = track.getBoundingClientRect().top + window.scrollY;
    const distance = track.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (distance * index) / steps });
  };

  return (
    <div
      ref={trackRef}
      className={`${scss.track} ${steps === 0 ? scss["track--static"] : ""}`}
      style={{ "--steps": steps } as CSSProperties}
    >
      <div ref={stageRef} className={scss.stage}>
        <ul className={scss.deck}>
          {projects.map((project, index) => (
            <Plate
              key={project.id}
              project={project}
              index={index}
              total={projects.length}
              progress={scrollYProgress}
              onFocus={revealPlate}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectStack;

import { FC } from "react";
import scss from "./ProjectCover.module.scss";

interface ProjectCoverProps {
  src: string | null;
  name: string;
  imageClassName?: string;
}

// Fills its positioned parent. Without an image a plain gradient stands
// in; every caller already shows the project name next to it.
const ProjectCover: FC<ProjectCoverProps> = ({ src, name, imageClassName }) =>
  src ? (
    <img
      src={src}
      alt={`${name} — превью`}
      loading="lazy"
      className={`${scss.image} ${imageClassName ?? ""}`}
    />
  ) : (
    <span className={scss.fallback} role="img" aria-label={`${name} — превью`} />
  );

export default ProjectCover;

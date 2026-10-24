import { FC } from "react";
import scss from "./ProjectCover.module.scss";

interface ProjectCoverProps {
  src: string | null;
  name: string;
  imageClassName?: string;
}

// Fills its positioned parent. Without an image the frame stays, empty.
const ProjectCover: FC<ProjectCoverProps> = ({ src, name, imageClassName }) =>
  src ? (
    <img
      src={src}
      alt={`${name} — превью`}
      loading="lazy"
      className={`${scss.image} ${imageClassName ?? ""}`}
    />
  ) : (
    <span className={scss.empty} aria-hidden="true" />
  );

export default ProjectCover;

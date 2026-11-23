import { FC } from "react";
import Image from "next/image";
import scss from "./ProjectCover.module.scss";

interface ProjectCoverProps {
  src: string | null;
  name: string;
  // How wide the frame is drawn at each breakpoint. Covers are uploaded as
  // multi-megabyte PNGs: without this the browser would take a full-width copy.
  sizes: string;
  imageClassName?: string;
  // The cover at the top of a project's page.
  eager?: boolean;
}

// Fills its positioned parent. Without an image the frame stays, empty.
const ProjectCover: FC<ProjectCoverProps> = ({ src, name, sizes, imageClassName, eager }) =>
  src ? (
    <Image
      src={src}
      alt={`${name} — превью`}
      fill
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      className={`${scss.image} ${imageClassName ?? ""}`}
    />
  ) : (
    <span className={scss.empty} aria-hidden="true" />
  );

export default ProjectCover;

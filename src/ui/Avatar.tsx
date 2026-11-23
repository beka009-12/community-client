import { FC } from "react";
import Image from "next/image";
import { initials } from "@/src/lib/people";
import scss from "./Avatar.module.scss";

interface AvatarProps {
  src: string | null;
  name: string;
  // How wide the box is drawn at each breakpoint: the browser picks the
  // smallest resized copy that covers it, never the original upload.
  sizes: string;
  imageClassName?: string;
  fallbackClassName?: string;
  // Above-the-fold portraits load right away.
  eager?: boolean;
}

// Fills its positioned parent: the API photo when there is one, otherwise
// the person's initials, scaled to the box. Photos go through next/image,
// resized and re-encoded (next.config.ts), from our /media proxy.
const Avatar: FC<AvatarProps> = ({ src, name, sizes, imageClassName, fallbackClassName, eager }) =>
  src ? (
    <Image
      src={src}
      alt=""
      fill
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      className={`${scss.image} ${imageClassName ?? ""}`}
    />
  ) : (
    <span className={`${scss.fallback} ${fallbackClassName ?? ""}`} aria-hidden="true">
      <span className={scss.fallback__text}>{initials(name)}</span>
    </span>
  );

export default Avatar;

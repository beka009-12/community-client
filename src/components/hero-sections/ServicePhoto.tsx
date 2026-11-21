import { FC } from "react";
import Image, { type StaticImageData } from "next/image";
import type { ServiceCategory } from "@/src/data/services";
import web from "@/src/assets/services/web.jpg";
import systems from "@/src/assets/services/systems.jpg";
import bots from "@/src/assets/services/bots.jpg";
import ai from "@/src/assets/services/ai.jpg";
import scss from "./ServicePhoto.module.scss";

// Unsplash License stock (images.unsplash.com ids: web 1581291518857,
// systems 1531403009284, bots 1512428559087, ai 1531746790731), graded to
// one saturation. Hands at work, never faces: the real team is shown
// further down, so stock people would pass for it.
const PHOTOS: Record<ServiceCategory, StaticImageData> = { web, systems, bots, ai };

interface ServicePhotoProps {
  category: ServiceCategory;
  className?: string;
}

const ServicePhoto: FC<ServicePhotoProps> = ({ category, className }) => (
  <div className={`${scss.photo} ${className ?? ""}`}>
    <Image
      src={PHOTOS[category]}
      alt=""
      fill
      sizes="(max-width: 900px) calc(100vw - 40px), 680px"
      placeholder="blur"
      className={scss.photo__img}
    />
  </div>
);

export default ServicePhoto;

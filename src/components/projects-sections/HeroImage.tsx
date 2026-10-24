import { FC } from "react";
import ProjectCover from "@/src/ui/ProjectCover";
import scss from "./HeroImage.module.scss";

const HeroImage: FC<{ src: string | null; name: string }> = ({ src, name }) => (
  <div className={scss.frame}>
    <ProjectCover src={src} name={name} />
  </div>
);

export default HeroImage;

import { FC, ReactNode } from "react";
import scss from "./Tag.module.scss";

// The mockup's «Метка»: a small uppercase label on a photo, a card or the
// dark intro. «neutral» is grey on light pages and graphite on dark ones.
export type TagTone = "neutral" | "raised" | "accent" | "outline";

interface TagProps {
  tone?: TagTone;
  className?: string;
  children: ReactNode;
}

const Tag: FC<TagProps> = ({ tone = "neutral", className = "", children }) => (
  <span className={`${scss.tag} ${scss[`tag--${tone}`]} ${className}`}>{children}</span>
);

export default Tag;

import { FC, ReactNode } from "react";
import scss from "./Badge.module.scss";

// A pill with a pulsing accent dot: the line above a page's title.
const Badge: FC<{ children: ReactNode }> = ({ children }) => (
  <span className={scss.badge}>
    <span className={scss.badge__dot} aria-hidden="true" />
    {children}
  </span>
);

export default Badge;

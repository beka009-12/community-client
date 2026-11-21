import { FC } from "react";
import scss from "./LogoLockup.module.scss";

interface LogoLockupProps {
  // Width of the M mark; the wordmark scales with it.
  size?: "sm" | "lg";
  className?: string;
}

// The community lockup: the M mark over «COMMUNITY», flat colours with no
// gradient or glow. Decorative here, the link around it carries the name.
const LogoLockup: FC<LogoLockupProps> = ({ size = "sm", className = "" }) => (
  <span className={`${scss.lockup} ${scss[`lockup--${size}`]} ${className}`} aria-hidden="true">
    <svg className={scss.mark} viewBox="0 10 243 124" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="41.5" width="32" height="92" />
      <path d="M104.958 100.545L104.888 78.0596C104.825 57.9459 88.5024 41.674 68.3887 41.6738H33.5029L33.6797 10.5H95.8359L118.088 37.6475L118.094 37.6543L118.1 37.6602L137.5 59.6875V133.5H104.958V100.545Z" />
      <path d="M209.958 100.545L209.888 78.0596C209.825 57.9459 193.502 41.674 173.389 41.6738H138.503L138.68 10.5H200.836L223.088 37.6475L223.094 37.6543L223.1 37.6602L242.5 59.6875V133.5H209.958V100.545Z" />
    </svg>
    <span className={scss.wordmark}>COMMUNITY</span>
  </span>
);

export default LogoLockup;

import { ButtonHTMLAttributes, FC } from "react";
import Link from "next/link";
import scss from "./Button.module.scss";

type Variant = "primary" | "secondary" | "outline" | "link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "md" | "lg";
  href?: string;
  // Opens in a new tab.
  external?: boolean;
  // The mockup's «Стрелка ↗». On by default for external links (unless
  // e.g. a PDF), off for internal ones unless asked for.
  arrow?: boolean;
}

const Arrow: FC = () => (
  <svg
    className={scss.button__arrow}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const Button: FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  type = "button",
  href,
  external = false,
  arrow = external,
  ...rest
}) => {
  const combinedClassName = [scss.button, scss[`button--${variant}`], scss[`button--${size}`], className].join(
    " ",
  );
  const content = (
    <>
      {children}
      {arrow && <Arrow />}
    </>
  );

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={combinedClassName}>
        {content}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={combinedClassName} {...rest}>
      {content}
    </button>
  );
};

export default Button;

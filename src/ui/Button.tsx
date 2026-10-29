import { ButtonHTMLAttributes, FC } from "react";
import Link from "next/link";
import scss from "./Button.module.scss";

type Variant = "primary" | "outline" | "dark" | "link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "md" | "lg";
  // Filled buttons get an arrow in a circle, outlined ones a small ↗.
  arrow?: boolean;
  href?: string;
  external?: boolean;
}

const ARROW_PATH: Record<Variant, string> = {
  primary: "M5 12h14M13 6l6 6-6 6",
  dark: "M5 12h14M13 6l6 6-6 6",
  outline: "M7 17 17 7M8 7h9v9",
  link: "M7 17 17 7M8 7h9v9",
};

const Button: FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
  children,
  type = "button",
  href,
  external = false,
  ...rest
}) => {
  const combinedClassName = [
    scss.button,
    scss[`button--${variant}`],
    scss[`button--${size}`],
    arrow ? scss["button--arrow"] : "",
    className,
  ].join(" ");

  const content = (
    <>
      {children}
      {arrow && (
        <span className={scss.button__arrow} aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={ARROW_PATH[variant]} />
          </svg>
        </span>
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noreferrer" className={combinedClassName}>
          {content}
        </a>
      );
    }
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

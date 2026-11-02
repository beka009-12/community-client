import { ButtonHTMLAttributes, FC } from "react";
import Link from "next/link";
import scss from "./Button.module.scss";

type Variant = "primary" | "outline" | "link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "md" | "lg";
  href?: string;
  // Opens in a new tab and says so with a ↗.
  external?: boolean;
}

const Button: FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  type = "button",
  href,
  external = false,
  ...rest
}) => {
  const combinedClassName = [scss.button, scss[`button--${variant}`], scss[`button--${size}`], className].join(
    " ",
  );

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={combinedClassName}>
        {children}
        <svg
          className={scss.button__external}
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
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={combinedClassName} {...rest}>
      {children}
    </button>
  );
};

export default Button;

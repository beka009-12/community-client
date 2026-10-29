"use client";

import { FC } from "react";
import Button from "@/src/ui/Button";
import scss from "./LoadError.module.scss";

interface LoadErrorProps {
  title: string;
  retry: () => void;
}

const LoadError: FC<LoadErrorProps> = ({ title, retry }) => (
  <div className={`container ${scss.error}`} role="alert">
    <h1 className="page-title">{title}</h1>
    <p className={scss.error__text}>
      Сервер не отвечает. Попробуйте ещё раз через минуту.
    </p>
    <Button onClick={retry} className={scss.error__button}>
      Попробовать снова
    </Button>
  </div>
);

export default LoadError;

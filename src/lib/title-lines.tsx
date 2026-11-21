import { Fragment, ReactNode } from "react";
import { typograph } from "./typograph";

// «\n» in a title breaks the line where the mockup breaks it.
export const titleLines = (title: string): ReactNode =>
  title.split("\n").map((line, index) => (
    <Fragment key={index}>
      {index > 0 && <br />}
      {typograph(line)}
    </Fragment>
  ));

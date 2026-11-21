"use client";

import { FC, ReactNode, useRef } from "react";
import { useDarkTop } from "@/src/hooks/useDarkTop";

interface DarkBandProps {
  className?: string;
  children: ReactNode;
}

// A dark block at the top of a page: switches the header to dark while it
// is behind it.
const DarkBand: FC<DarkBandProps> = ({ className = "", children }) => {
  const ref = useRef<HTMLDivElement>(null);
  useDarkTop(ref);
  return (
    <div ref={ref} className={`theme-dark ${className}`}>
      {children}
    </div>
  );
};

export default DarkBand;

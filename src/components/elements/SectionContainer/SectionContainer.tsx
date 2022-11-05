import type { ReactNode } from "react";
import React from "react";

export type SectionContainerProps = {
  className?: string;
  children?: ReactNode;
};

export const SectionContainer = ({
  className,
  children,
}: SectionContainerProps) => {
  return (
    <section>
      <div className={`p-5 md:py-10 lg:py-14 xl:py-20 xl:px-0 ${className}`}>
        {children}
      </div>
    </section>
  );
};

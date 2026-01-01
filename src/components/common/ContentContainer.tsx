import React from "react";
import { twMerge } from "tailwind-merge";

interface ContentContainerProps {
  className?: string;
  children: React.ReactNode;
  bordered?: boolean;
}

export default function ContentContainer({
  className,
  children,
  bordered = true,
}: ContentContainerProps) {
  return (
    <div
      className={twMerge(
        `mx-auto w-[99%] max-w-[1440px] rounded-lg bg-[#FFFBF5] md:w-[95%]`,
        bordered && "border-border-sub shadow-flat border-[3px]",
        className
      )}
    >
      {children}
    </div>
  );
}

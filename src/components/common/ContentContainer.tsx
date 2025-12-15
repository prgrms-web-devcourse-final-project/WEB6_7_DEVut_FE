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
        `mx-auto min-h-[250px] w-[95%] max-w-[1440px] rounded-lg bg-[#FFFBF5] p-3`,
        bordered && "border-border-sub shadow-flat border-[3px]",
        className
      )}
    >
      {children}
    </div>
  );
}

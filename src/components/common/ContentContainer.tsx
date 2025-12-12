import React from "react";
import { twMerge } from "tailwind-merge";

interface ContentContainerProps {
  className?: string;
  children: React.ReactNode;
}

export default function ContentContainer({ className, children }: ContentContainerProps) {
  return (
    <div
      className={twMerge(
        `border-border-sub shadow-flat mx-auto min-h-[250px] w-[95%] max-w-[1150px] rounded-lg border-[3px] bg-[#FFFBF5] p-3`,
        className
      )}
    >
      {children}
    </div>
  );
}

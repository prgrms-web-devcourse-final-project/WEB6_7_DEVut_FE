"use client";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function ProductsGrid({ children, className }: Props) {
  return (
    <div
      className={twMerge(
        "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
        className
      )}
    >
      {children}
    </div>
  );
}

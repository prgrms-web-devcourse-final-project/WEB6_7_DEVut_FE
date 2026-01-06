"use clinet";

import { twMerge } from "tailwind-merge";

interface EmptyContainerProps {
  title: string;
  description?: string;
  className?: string;
  action?: React.ReactNode;
}

export default function EmptyContainer({
  title,
  description,
  className,
  action,
}: EmptyContainerProps) {
  return (
    <div
      className={twMerge(
        "border-border-sub col-span-full flex min-h-[220px] flex-col items-center justify-center rounded-md border-2 border-dashed bg-[#FDF6E9] text-center",
        className
      )}
    >
      <p className="text-title-main text-lg font-bold">{title}</p>
      {description && <p className="mt-2 text-sm opacity-70">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

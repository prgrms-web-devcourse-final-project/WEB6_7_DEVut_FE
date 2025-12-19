import { Clock } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface TimeBarProps {
  time: string;
  label?: string;
  variant?: "default" | "warning";
  className?: string;
}

const variantStyle: Record<NonNullable<TimeBarProps["variant"]>, string> = {
  default: "bg-custom-brown text-[#4F382A]",
  warning: "bg-custom-orange text-[#4F382A]",
};

export function TimeBar({ time, label, variant = "default", className }: TimeBarProps) {
  return (
    <div
      className={twMerge(
        "flex h-[33.53px] w-full items-center justify-center gap-1 rounded-[3px] border-2 border-[#4F382A] text-[13px]",
        variantStyle[variant],
        className
      )}
    >
      <Clock size={16} />
      <span>
        {label && <span className="mr-1">{label}</span>}
        {time}
      </span>
    </div>
  );
}

import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import tape from "@/assets/notify/tape.svg";
import Image from "next/image";

export default function NotifyItem({
  icon,
  children,
  className,
}: {
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        `border-border-main bg-btn-default text-custom-dark-brown relative mb-6 ml-14 flex min-h-[52px] items-center gap-3 rounded-lg border-2 px-4 py-3 shadow-[3px_3px_0_#A1887F]`,
        className
      )}
    >
      <Image src={tape} alt="`tape" className="absolute -left-5 -rotate-3" />
      <span className="text-xl">{icon}</span>
      <p className="text-sm">{children}</p>
    </div>
  );
}

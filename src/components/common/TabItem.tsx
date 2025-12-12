import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface TabItemProps {
  label: string;
  path: string;
  isActive: boolean;
}

export default function TabItem({ label, path, isActive }: TabItemProps) {
  return (
    <Link
      href={path}
      className={twMerge(
        "bg-btn-default border-title-main text-title-main min-h-[25px] w-fit rounded-t-2xl border-[3px] px-7.5 py-1.5 text-center shadow-[1px_0_0_#A1887F] transition-all active:py-1",
        isActive && "bg-btn-active text-white"
      )}
    >
      {label}
    </Link>
  );
}

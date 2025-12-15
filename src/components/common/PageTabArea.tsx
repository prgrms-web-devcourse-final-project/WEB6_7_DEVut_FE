"use client";
import { usePathname } from "next/navigation";
import TabItem from "./TabItem";

interface PageTabAreaProps {
  items: { label: string; path: string }[];
}

export default function PageTabArea({ items }: PageTabAreaProps) {
  const pathname = usePathname();
  const isActive = items
    .filter(tab => pathname === tab.path || pathname.startsWith(tab.path + "/"))
    .sort((a, b) => b.path.length - a.path.length)[0]?.path;
  return (
    <div className="relative mx-auto flex min-h-[65px] w-[95%] max-w-[1440px] items-end">
      <div className="bg-border-sub absolute right-0 bottom-0 left-0 h-[3px] rounded-full" />

      <div className="flex flex-nowrap items-end justify-start gap-2 overflow-x-auto pl-2 text-sm font-bold whitespace-nowrap sm:gap-2.5 sm:pl-3 sm:text-base md:gap-3 md:text-lg">
        {items?.map(item => (
          <TabItem
            key={item.path}
            label={item.label}
            path={item.path}
            isActive={item.path === isActive}
          />
        ))}
      </div>
    </div>
  );
}

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
    <div className="relative mx-auto flex min-h-[65px] w-[95%] max-w-[1150px] items-end">
      <div className="bg-border-sub absolute right-0 bottom-0 left-0 h-[3px] rounded-full" />
      <div className="flex items-end justify-start gap-2.5 pl-3 font-bold">
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

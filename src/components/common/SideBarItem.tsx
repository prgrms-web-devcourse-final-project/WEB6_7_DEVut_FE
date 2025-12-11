"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface SideBarItemProps {
  src: StaticImport;
  path: string;
  badgeCount?: number;
}

export default function SideBarItem({ src, path, badgeCount }: SideBarItemProps) {
  const pathname = usePathname();
  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";

    return pathname === path || pathname.startsWith(path + "/");
  };
  return (
    <Link href={path}>
      <div
        className={twMerge(
          `border-border-sub2 shadow-flat flex h-[50px] items-center justify-center border-[3px] p-3 transition-all active:translate-y-0.5 active:shadow-none`,
          isActive(path) && `border-custom-red`
        )}
      >
        <Image src={src} alt={path} width={22} height={22} />
      </div>
    </Link>
  );
}

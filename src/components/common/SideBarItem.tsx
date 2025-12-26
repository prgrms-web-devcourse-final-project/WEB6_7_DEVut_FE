"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import TooltipPortal from "./TooltipPortal";

interface SideBarItemProps {
  src: StaticImport;
  path: string;
  badgeCount?: number;
  label: string;
  onClose?: () => void;
}

export default function SideBarItem({ src, path, badgeCount, label, onClose }: SideBarItemProps) {
  const pathname = usePathname();
  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";

    return pathname === path || pathname.startsWith(path + "/");
  };
  const tooltipId = `sidebar-tooltip-${path}`;
  return (
    <>
      <Link href={path} onClick={onClose}>
        <div
          data-tooltip-id={tooltipId}
          data-tooltip-content={label}
          className={twMerge(
            `border-border-sub2 relative flex h-[50px] items-center justify-center border-[3px] p-3 shadow-[2px_2px_0_rgba(0,0,0,0.25)] transition-all active:translate-y-0.5 active:shadow-none`,
            isActive(path) &&
              `bg-content-area translate-y-0 shadow-[inset_2px_2px_0_rgba(0,0,0,0.25)]`
          )}
        >
          <Image src={src} alt={path} width={22} height={22} />
          {typeof badgeCount === "number" && badgeCount > 0 && (
            <span className="bg-custom-red absolute -top-2 -right-2 flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-xs leading-none font-bold text-white">
              {badgeCount > 99 ? "99+" : badgeCount}
            </span>
          )}
        </div>
      </Link>

      <TooltipPortal
        id={tooltipId}
        className="bg-content-area! text-title-main-dark! p-4 py-2! text-lg!"
      />
    </>
  );
}

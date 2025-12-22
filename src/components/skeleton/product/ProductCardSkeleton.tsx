"use client";

import Skeleton from "react-loading-skeleton";
import { twMerge } from "tailwind-merge";

export default function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={twMerge("relative", className)}>
      <div className="absolute top-5 left-5 z-20">
        <Skeleton circle width={20} height={20} />
      </div>

      <div className="flex h-full w-full flex-col rounded-md border-2 border-[#4F382A] bg-[#FDF6E9] shadow-[1.5px_1.5px_0px_rgba(0,0,0,0.5)]">
        <div className="relative aspect-214/134 w-full overflow-hidden rounded-[3px] p-2">
          <Skeleton className="h-full w-full rounded-[3px]" />
        </div>

        <div className="flex flex-1 flex-col px-2">
          <div className="mt-2 space-y-2">
            <Skeleton width={40} height={12} />
            <Skeleton width={90} height={22} />
            <Skeleton width="70%" height={16} />
          </div>

          <div className="mt-auto mb-3 w-[98%] self-center">
            <Skeleton height={32} />
          </div>
        </div>
      </div>
    </div>
  );
}

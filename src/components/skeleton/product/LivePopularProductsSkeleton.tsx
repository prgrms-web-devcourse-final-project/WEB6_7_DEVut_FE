"use client";

import ContentContainer from "@/components/common/ContentContainer";
import Skeleton from "react-loading-skeleton";
import ProductCardSkeleton from "./ProductCardSkeleton";

export default function LivePopularProductsSkeleton() {
  return (
    <div>
      <div className="mb-4 flex items-center">
        <Skeleton width={140} height={28} />
        <div className="ml-auto">
          <Skeleton circle width={40} height={40} />
        </div>
      </div>

      <ContentContainer className="border-border-sub/50 shadow-flat-light m-0 w-full overflow-x-hidden border px-3 py-4 md:w-full">
        <div className="w-full overflow-hidden py-2">
          <div className="flex gap-4 px-4">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="w-[40%] min-w-[220px] shrink-0 sm:w-[48%] lg:w-[23%]">
                <ProductCardSkeleton />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2 flex justify-center gap-2">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={idx} width={8} height={8} circle />
          ))}
        </div>
      </ContentContainer>
    </div>
  );
}

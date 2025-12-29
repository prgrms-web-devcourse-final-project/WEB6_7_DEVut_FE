import Skeleton from "react-loading-skeleton";

export default function HomeBannerSkeleton() {
  return (
    <Skeleton className="bg-content-area relative mb-5 h-[220px] w-full overflow-hidden rounded-sm sm:h-[240px] md:h-[300px] lg:h-[360px] xl:h-[420px]" />
  );
}

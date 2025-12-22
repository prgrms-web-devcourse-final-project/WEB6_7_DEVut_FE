import Skeleton from "react-loading-skeleton";

export default function ProductImageCarouselSkeleton() {
  return (
    <div className="w-full">
      <div className="aspect-square w-full md:max-h-[520px]">
        <Skeleton className="block h-full w-full rounded-xl" />
      </div>
    </div>
  );
}

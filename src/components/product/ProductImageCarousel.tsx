"use client";

import useEmblaCarousel from "embla-carousel-react";
import { twMerge } from "tailwind-merge";
import { useCallback, useEffect, useState } from "react";
import test from "@/assets/vintage.png";
import WrapperImage from "../common/WrapperImage";
import { getDelayStatus, getLiveStatus } from "@/utils/auction";

interface ProductImageCarouselProps {
  images?: string[];
  className?: string;
  type: string;
  auctionStatus: AuctionStatus;
}

export default function ProductImageCarousel({
  images,
  className,
  type,
  auctionStatus,
}: ProductImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const isClose =
    type === "LIVE"
      ? getLiveStatus(auctionStatus) === "CLOSE"
      : getDelayStatus(auctionStatus) === "CLOSE";

  const handleSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", handleSelect);
    emblaApi.on("reInit", handleSelect);

    return () => {
      emblaApi.off("select", handleSelect);
      emblaApi.off("reInit", handleSelect);
    };
  }, [emblaApi, handleSelect]);

  return (
    <div className={twMerge("w-full", className)}>
      <div className="relative">
        <div
          ref={emblaRef}
          className={twMerge("overflow-hidden transition-opacity", isClose && "opacity-40")}
        >
          <div className="flex">
            {images?.map((image, idx) => (
              <div key={idx} className="min-w-0 flex-[0_0_100%]">
                <WrapperImage
                  src={image ?? test}
                  alt={`product image ${idx + 1}`}
                  className="aspect-square w-full md:max-h-[520px]"
                />
              </div>
            ))}
          </div>
        </div>

        {isClose && (
          <div className="absolute inset-0 flex items-center justify-center text-2xl">마감</div>
        )}
      </div>

      <div className="mt-3 flex justify-center gap-2">
        {images?.map((_, idx) => (
          <button
            key={idx}
            onClick={() => emblaApi?.scrollTo(idx)}
            disabled={isClose}
            className={twMerge(
              "h-2 w-2 rounded-full transition-colors",
              selectedIndex === idx ? "bg-title-main-dark" : "bg-border-sub/60",
              isClose && "cursor-not-allowed"
            )}
            aria-label={`Go to image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

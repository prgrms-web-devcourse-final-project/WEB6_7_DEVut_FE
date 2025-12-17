"use client";

import useEmblaCarousel from "embla-carousel-react";
import { twMerge } from "tailwind-merge";
import { useCallback, useEffect, useState } from "react";
import test from "@/assets/vintage.png";
import WrapperImage from "../common/WrapperImage";

interface Props {
  images?: string[];
  className?: string;
}

export default function ProductImageCarousel({ images, className }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });

  const dummyImages = Array.from({ length: 6 });
  const [selectedIndex, setSelectedIndex] = useState(0);

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
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {dummyImages.map((_, idx) => (
            <div key={idx} className="min-w-0 flex-[0_0_100%]">
              <WrapperImage
                src={test}
                alt={`product image ${idx + 1}`}
                className="aspect-square w-full md:max-h-[520px]"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex justify-center gap-2">
        {dummyImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => emblaApi?.scrollTo(idx)}
            className={twMerge(
              "h-2 w-2 rounded-full transition-colors",
              selectedIndex === idx ? "bg-title-main-dark" : "bg-border-sub/60"
            )}
            aria-label={`Go to image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

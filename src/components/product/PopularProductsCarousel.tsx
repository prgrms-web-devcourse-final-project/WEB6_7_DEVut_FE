"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useMemo, useState } from "react";
import ContentContainer from "@/components/common/ContentContainer";
import ProductCard from "@/components/common/ProductCard";

interface PopularProductsCarouselProps {
  products: ProductCardType[];
  autoplayDelay?: number;
}

export default function PopularProductsCarousel({
  products,
  autoplayDelay = 4000,
}: PopularProductsCarouselProps) {
  const isCarousel = products.length > 3;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: isCarousel,
      align: "start",
    },
    isCarousel
      ? [
          Autoplay({
            delay: autoplayDelay,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]
      : []
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const dotCount = useMemo(() => products.length, [products.length]);

  useEffect(() => {
    if (!emblaApi || !isCarousel) return;

    setSelectedIndex(emblaApi.selectedScrollSnap());

    emblaApi.on("select", () => {
      setSelectedIndex(emblaApi.selectedScrollSnap() % products.length);
    });
  }, [emblaApi, isCarousel, products.length]);

  return (
    <div>
      <ContentContainer className="border-border-sub/50 shadow-flat-light w-full min-w-full overflow-hidden border px-3 py-4">
        {isCarousel ? (
          <div ref={emblaRef} className="w-full overflow-hidden py-2">
            <div className="flex gap-4 px-4">
              {products.map(product => (
                <div
                  key={product.id}
                  className="w-[40%] min-w-[220px] shrink-0 sm:w-[48%] lg:w-[23%]"
                >
                  <ProductCard context="CARD" product={product} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 px-4 sm:grid-cols-3">
            {products.map(product => (
              <ProductCard key={product.id} context="CARD" product={product} />
            ))}
          </div>
        )}

        {isCarousel && (
          <div className="mt-2 flex justify-center gap-2">
            {Array.from({ length: dotCount }).map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === selectedIndex ? "bg-custom-orange-dark w-4" : "bg-border-sub opacity-40"
                }`}
              />
            ))}
          </div>
        )}
      </ContentContainer>
    </div>
  );
}

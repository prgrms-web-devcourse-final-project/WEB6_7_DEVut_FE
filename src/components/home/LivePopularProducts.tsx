"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Title from "../common/Title";
import ContentContainer from "../common/ContentContainer";
import ProductCard from "../common/ProductCard";
import { useEffect, useState } from "react";
import Image from "next/image";
import write from "@/assets/home/write.svg";
import { useRouter } from "next/navigation";

export default function LivePopularProducts({ products }: { products: ProductCardType[] }) {
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, [
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    setSelectedIndex(emblaApi.selectedScrollSnap());

    emblaApi.on("select", () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  return (
    <>
      <div className="flex items-center">
        <Title size="lg">라이브 인기 상품</Title>
        <button
          className="bg-btn-default shadow-flat border-border-main mr-1 mb-4 ml-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-3 transition-all outline-none hover:scale-105 active:scale-95"
          onClick={() => router.push("/write")}
        >
          <Image src={write} alt="글 작성" width={20} height={20} />
        </button>
      </div>

      <ContentContainer className="border-border-sub/50 shadow-flat-light w-full overflow-x-hidden border px-3 py-4 md:w-full">
        <div ref={emblaRef} className="w-full overflow-hidden py-2">
          <div className="flex gap-4 px-4">
            {products.map(product => (
              <div
                key={product.id}
                className="w-[40%] min-w-[220px] shrink-0 sm:w-[48%] lg:w-[23%]"
              >
                <ProductCard context="CARD" key={product.id} product={product} />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-2 flex justify-center gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === selectedIndex ? "bg-custom-orange-dark w-4" : "bg-border-sub opacity-40"
              } `}
            />
          ))}
        </div>
      </ContentContainer>
    </>
  );
}

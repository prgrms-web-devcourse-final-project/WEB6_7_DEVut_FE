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

export default function LivePopularProducts() {
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
          className="bg-btn-default shadow-flat border-border-main mb-4 ml-auto flex h-12 w-12 cursor-pointer items-center justify-center rounded-[9999] border-3 transition-all outline-none hover:scale-105 active:scale-95"
          onClick={() => router.push("/write")}
        >
          <Image src={write} alt="글 작성" width={25} height={25} />
        </button>
      </div>

      <ContentContainer className="border-border-sub/50 shadow-flat-light w-full overflow-x-hidden border py-4">
        <div ref={emblaRef} className="w-full overflow-hidden py-2">
          <div className="flex gap-4 px-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-[40%] min-w-[220px] shrink-0 sm:w-[48%] lg:w-[23%]">
                <ProductCard money={5000000} title={"진짜 비싼거"} type="onLive" />
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

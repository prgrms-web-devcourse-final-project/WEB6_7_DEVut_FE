"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import RoomProductCard from "./RoomProductCard";

import ticket1 from "@/assets/images/auction/ticket1.svg";
import ticket2 from "@/assets/images/auction/ticket2.svg";
import ticket3 from "@/assets/images/auction/ticket3.svg";
import ticket4 from "@/assets/images/auction/ticket4.svg";
import ticket5 from "@/assets/images/auction/ticket5.svg";
import ticket6 from "@/assets/images/auction/ticket6.svg";
import Image from "next/image";

export default function RoomProducts() {
  const tickets = [ticket1, ticket2, ticket3, ticket4, ticket5, ticket6];
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "center" }, [
    Autoplay({
      delay: 2000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ]);

  return (
    <div className="border-border-sub h-[200px] w-full overflow-hidden border-t py-2 sm:h-[220px]">
      <div className="h-full px-3">
        <div ref={emblaRef} className="h-full w-full overflow-hidden">
          <div className="flex h-full">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="relative h-full flex-[0_0_50%] overflow-visible px-1.5 sm:flex-[0_0_33.333%] md:flex-[0_0_25%] lg:flex-[0_0_20%] xl:flex-[0_0_16.666%]"
              >
                <div className="absolute -top-2 -left-2 z-20 h-15 w-15 -rotate-45">
                  <Image src={tickets[i]} alt={`ticket-${i + 1}`} fill />
                </div>

                <RoomProductCard />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

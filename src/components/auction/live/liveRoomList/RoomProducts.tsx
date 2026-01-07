"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import RoomProductCard from "./RoomProductCard";

import Image from "next/image";

interface RoomProductsProps {
  viewType?: "carousel" | "list";
  room?: LiveRoom | null;
}

interface LiveRoomItemUI {
  id: number;
  title: string;
  amount: number;
  image: string;
  isWish: boolean;
}

export default function RoomProducts({ viewType = "carousel", room }: RoomProductsProps) {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "center" }, [
    Autoplay({
      delay: 2000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ]);

  const uiItems: LiveRoomItemUI[] | undefined = room?.items.map(item => ({
    ...item,
    isWish: item.isLiked,
  }));

  if (viewType === "list") {
    return (
      <div className="bg-content-area flex w-full flex-col gap-4 p-4">
        {uiItems?.map(item => (
          <div key={item.id} className="flex items-center gap-4 rounded-lg p-4">
            <div className="flex-1">
              <RoomProductCard product={item} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // if (!room) {
  //   return (
  //     <div className="h-[200px] w-full overflow-hidden border-t bg-[#432818] py-2 sm:h-[220px]">
  //       <div className="h-full px-3">
  //         <div className="flex h-full items-center justify-center rounded-xl border-2 border-white text-white">
  //           <p className="text-center">경매방을 선택해주세요</p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="h-[200px] w-full overflow-hidden border-t bg-[#432818] py-2 sm:h-[220px]">
      <div className="h-full px-3">
        <div ref={emblaRef} className="h-full w-full">
          <div className="flex h-full">
            {room &&
              uiItems?.map(item => (
                <div
                  key={item.id}
                  className="relative h-full flex-[0_0_20%] overflow-visible px-1.5 sm:flex-[0_0_33.333%] md:flex-[0_0_25%] lg:flex-[0_0_20%] xl:flex-[0_0_16.666%]"
                >
                  <RoomProductCard product={item} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

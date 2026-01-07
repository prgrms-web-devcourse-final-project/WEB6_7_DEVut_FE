"use client";

import { ChevronLeft, ChevronRight, RadioIcon } from "lucide-react";
import Image from "next/image";
import test from "@/assets/images/auction/auctioneer.svg";
import Button from "@/components/common/Button";
import ticket1 from "@/assets/images/auction/ticket1.svg";
import ticket2 from "@/assets/images/auction/ticket2.svg";
import ticket3 from "@/assets/images/auction/ticket3.svg";
import ticket4 from "@/assets/images/auction/ticket4.svg";
import ticket5 from "@/assets/images/auction/ticket5.svg";
import { useMemo } from "react";
import { useLiveRoomStore } from "@/features/auction/store/useLiveRoomStore";
import { useRouter } from "next/navigation";

interface LiveRoomCarouselProps {
  rooms: LiveRoom[];
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
  onRoomClick?: (room: LiveRoom) => void;
  onSelect?: (room: LiveRoom) => void;
  isMobile: boolean;
  startAt?: string | null;
}

export default function LiveRoomCarousel({
  rooms,
  focusedIndex,
  setFocusedIndex,
  onRoomClick,
  onSelect,
  isMobile,
  startAt,
}: LiveRoomCarouselProps) {
  const roomStatus = useMemo(() => {
    return rooms[focusedIndex]?.status;
  }, [rooms, focusedIndex]);
  const route = useRouter();
  const tickets = [ticket1, ticket2, ticket3, ticket4, ticket5];
  const total = rooms.length;
  let visible: number[] = [];
  if (total === 1) {
    visible = [focusedIndex];
  } else if (total === 2) {
    const other = (focusedIndex + 1) % total;
    visible = [other, focusedIndex, other];
  } else {
    const prevIndex = (focusedIndex - 1 + total) % total;
    const nextIndex = (focusedIndex + 1) % total;
    visible = [prevIndex, focusedIndex, nextIndex];
  }

  const { addSubscribedAuctionId, setActiveAuctionId } = useLiveRoomStore(state => state);

  const handleMainButtonClick = () => {
    const currentRoom = rooms[focusedIndex];
    if (onSelect) {
      if (currentRoom) {
        onSelect(currentRoom);
      }
    }
    addSubscribedAuctionId(currentRoom.roomId);
    setActiveAuctionId(currentRoom.roomId);
    route.push("/auction/liveRoom");
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
      <div className="relative flex w-full max-w-[calc(100vw-32px)] items-center justify-center md:max-w-none md:justify-center">
        {total > 1 && (
          <button
            onClick={() => setFocusedIndex((focusedIndex - 1 + total) % total)}
            className="border-border-main bg-content-area shadow-flat-dark absolute left-0 z-50 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 transition hover:scale-105 active:scale-95 md:left-6 md:h-12 md:w-12"
          >
            <ChevronLeft className="text-title-main-dark h-5 w-5 md:h-6 md:w-6" />
          </button>
        )}
        <div className="flex w-full items-center justify-center md:w-auto md:gap-8">
          {visible.map((index, i) => {
            const room = rooms[index];
            if (!room) return null;
            const item = room.items[0];
            const isCenter = index === focusedIndex;
            let transformClass = "";
            let zIndexClass = "";
            let opacityClass = "";

            if (isCenter) {
              transformClass = "z-30 scale-100 translate-x-0 md:scale-105";
              opacityClass = "opacity-100";
            } else {
              // Neighbor logic
              zIndexClass = "z-10";
              opacityClass = "opacity-40 blur-[1px]";
              const isPrev = i === 0;

              if (isPrev) {
                transformClass = "translate-x-[30%] scale-90 md:translate-x-0 md:scale-80";
              } else {
                transformClass = "-translate-x-[30%] scale-90 md:translate-x-0 md:scale-80";
              }
            }

            return (
              <div
                key={`${room.roomId} - ${i}`}
                onClick={() => {
                  setFocusedIndex(index);
                  if (isMobile && isCenter && onRoomClick) {
                    onRoomClick(room);
                  }
                }}
                className={`transition-all duration-100 ease-out ${transformClass} ${zIndexClass} ${opacityClass} ${
                  isCenter
                    ? "hover:border-custom-orange hover:shadow-flat-dark cursor-pointer hover:rounded-2xl hover:border-3 md:cursor-default md:hover:border-none"
                    : "cursor-pointer"
                }`}
              >
                <div className="bg-content-area shadow-flat-dark h-[180px] w-[60vw] max-w-[280px] rounded-xl border-2 sm:h-[220px] sm:w-[320px] md:h-[260px] md:w-[420px]">
                  <Image
                    src={item?.image || test}
                    alt={item?.title || "테스트 Auction Item"}
                    className="h-full w-full rounded-lg"
                    width={280}
                    height={260}
                  />
                  <div className="absolute -top-2 -left-2 z-20 h-15 w-15 -rotate-45">
                    <Image
                      src={tickets[room.roomIndex - 1]}
                      alt={`ticket-${room.roomIndex}`}
                      fill
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {total > 1 && (
          <button
            onClick={() => setFocusedIndex((focusedIndex + 1) % total)}
            className="border-border-main bg-content-area shadow-flat-dark absolute right-0 z-50 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 transition hover:scale-105 active:scale-95 md:right-6 md:h-12 md:w-12"
          >
            <ChevronRight className="text-title-main-dark h-5 w-5 md:h-6 md:w-6" />
          </button>
        )}
      </div>
      <Button
        onClick={handleMainButtonClick}
        className="bg-custom-orange-dark shadow-flat mt-8 px-15 text-white hover:brightness-105 disabled:cursor-not-allowed disabled:bg-gray-400"
        leftIcon={
          onSelect || roomStatus === "LIVE" ? <RadioIcon className="text-custom-red" /> : undefined
        }
        disabled={!onSelect && roomStatus !== "LIVE"}
      >
        {onSelect
          ? "스케줄 선택하기"
          : roomStatus == "ENDED"
            ? "이미 종료된 라이브예요"
            : roomStatus == "SCHEDULED"
              ? "아직 입장할 수 없어요"
              : "라이브 입장하기"}
      </Button>
    </div>
  );
}

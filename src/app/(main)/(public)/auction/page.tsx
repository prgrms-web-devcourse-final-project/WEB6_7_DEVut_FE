"use client";

import StageBarBackground from "@/components/auction/live/liveRoom/stage/StageBarBackground";
import LiveRoomList from "@/components/auction/live/liveRoomList/LiveRoomList";
import RoomProducts from "@/components/auction/live/liveRoomList/RoomProducts";
import Modal from "@/components/common/Modal";
import PageTabArea from "@/components/common/PageTabArea";
import { auctionItems } from "@/constants/route/auction";
import ContentContainer from "@/components/common/ContentContainer";
import { useEffect, useState } from "react";
import useNow from "@/components/schedule/UpdateNow";
import { formatYmd, getAuctionTimeKey, getNextAuctionSlot } from "@/utils/date";
import { getLiveRooms } from "@/features/auction/api/liveAuction.api";
import LiveRoomListWriteMode from "@/components/auction/live/liveRoomList/LiveRoomListWriteMode";

type AuctionPageProps = {
  startAt?: string | null; // yyyy-MM-ddThh:mm:ss
  writeMode?: boolean;
  onRoomSelect?: (roomIndex: number) => void;
};
export default function AuctionPage({
  startAt,
  writeMode = false,
  onRoomSelect,
}: AuctionPageProps) {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const now = useNow();
  const dateFn = () =>
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(now);
  const [nowDate, setNowDate] = useState(dateFn());
  const [realMinute, setRealMinute] = useState(now.getMinutes());
  const [nowTime, setNowTime] = useState(getAuctionTimeKey(now));
  const [rooms, setRooms] = useState<LiveRoom[]>([]);
  const [focusedRoom, setFocusedRoom] = useState<LiveRoom | null>(null);

  const [isRunning, setIsRunning] = useState(false); // 운영시간
  const [hour, minute] = nowTime.split(":").map(Number);

  const runningTime = (hour: number, minute: number) => {
    // 일단 시간으로...
    if (hour >= 9 && hour <= 21) {
      setIsRunning(true);
    } else setIsRunning(false);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setNowDate(dateFn());
      setNowTime(getAuctionTimeKey(now));
      setRealMinute(now.getMinutes());
    }, 60 * 1000); // 1분
    runningTime(hour, minute);
    return () => clearInterval(interval);
  }, [now]);

  useEffect(() => {
    const fetchRooms = async () => {
      const [slotDate, slotTime] = startAt?.split("T") || [];
      const d = startAt ? slotDate : nowDate;
      const t = startAt ? slotTime : nowTime;

      try {
        const currentData = await getLiveRooms(d, t);
        let combinedRooms = currentData?.rooms || [];

        // 10분 전(20~29분, 50~59분)이면 다음 타임 경매방도 미리 불러옴
        if ((20 <= realMinute && realMinute <= 29) || (50 <= realMinute && realMinute <= 59)) {
          console.log(`[AuctionPage] 다음 타임 경매 미리 로딩 (현재 ${realMinute}분)`);
          const { nextDate, nextTime } = getNextAuctionSlot(d, t);
          const nextData = await getLiveRooms(nextDate, nextTime);

          if (nextData?.rooms) {
            combinedRooms = [...combinedRooms, ...nextData.rooms];
          }
        }

        setRooms(combinedRooms);
      } catch (error) {
        console.error("live rooms fetch 실패:", error);
      }
    };

    fetchRooms();
  }, [startAt, nowDate, now]);

  return (
    <>
      <PageTabArea items={auctionItems} isUnderline={false} />
      <ContentContainer
        bordered={false}
        className="flex h-full min-h-[calc(100vh-75px)] flex-col overflow-hidden"
      >
        <div className="mx-auto h-30 w-full">
          <StageBarBackground className="h-full text-white">
            <div className="flex w-full flex-col text-center text-4xl font-bold">
              {startAt ? (
                <>
                  <p className="px-4 py-2">
                    {formatYmd(startAt)} {getAuctionTimeKey(startAt)}
                  </p>
                </>
              ) : isRunning ? (
                <p className="px-4 py-2">
                  {nowDate} {nowTime}
                </p>
              ) : (
                <p className="px-4 py-2">운영시간이 아닙니다</p>
              )}
            </div>
          </StageBarBackground>
        </div>
        <div className="flex flex-1 justify-center bg-[#F5EFE1]">
          <div className="w-full">
            {writeMode ? (
              <LiveRoomListWriteMode
                existingRooms={rooms}
                onSelect={room => {
                  if (onRoomSelect) {
                    onRoomSelect(room.roomIndex);
                    console.log("Selected room:", room);
                    alert(`Room ${room.roomIndex} selected!`);
                  }
                }}
                onRoomClick={room => {
                  if (room && room.roomId >= 0) {
                    setIsProductModalOpen(true);
                  }
                }}
                onFocusedRoomChange={setFocusedRoom}
              />
            ) : (
              <LiveRoomList
                rooms={rooms}
                onRoomClick={room => {
                  if (room) {
                    setIsProductModalOpen(true);
                  }
                }}
                onFocusedRoomChange={setFocusedRoom}
                startAt={startAt || null}
              />
            )}
          </div>
        </div>
        {/* Desktop */}
        <div className="hidden md:block">
          <RoomProducts viewType="carousel" room={focusedRoom} />
        </div>

        {/* Mobile Modal */}
        <Modal
          isOpen={isProductModalOpen}
          onClose={() => setIsProductModalOpen(false)}
          className="max-h-[80vh] w-full max-w-md bg-[#432818] p-0 text-white"
        >
          <div className="p-4">
            <span className="mr-2 mb-4 text-xl font-bold">경매 물품 목록</span>
            <span className="mb-2 text-[10px]">경매 진행 순서는 변경될 수 있습니다.</span>
            <RoomProducts viewType="list" room={focusedRoom} />
          </div>
        </Modal>
      </ContentContainer>
    </>
  );
}

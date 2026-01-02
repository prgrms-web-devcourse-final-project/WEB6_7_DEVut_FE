"use client";
import AuctionPage from "@/app/(main)/(public)/auction/page";
import ContentContainer from "../common/ContentContainer";
import Modal from "../common/Modal";
import useNow from "./UpdateNow";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { getSchedule } from "@/features/schedule/api/schedule.api";
import { getAuctionTimeKey, getScheduleByWeek, getWeekDates, isNowCell } from "@/utils/date";
import { useEffect } from "react";

interface WeeklyScheduleProps {
  isWriteMode?: boolean;
  onRoomSelect?: (roomIndex: number, startAt: string) => void;
}

export default function WeeklySchedule({ isWriteMode = false, onRoomSelect }: WeeklyScheduleProps) {
  const [isLiveRoomListModalOpen, setIsLiveRoomListModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);

  useEffect(() => {
    const { fromDate, toDate } = getScheduleByWeek(currentDate);
    getSchedule(fromDate, toDate).then(setScheduleData).catch(console.error);
  }, [currentDate]);

  const handlePrevWeek = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 7);
      return newDate;
    });
  };

  const handleNextWeek = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 7);
      return newDate;
    });
  };

  const map = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  const parsedDays = scheduleData?.days.map(day => {
    const d = new Date(day.date);
    const key = map[d.getDay()]; // 0=sun, 1=mon...

    // Format date MM.DD
    const dateStr = `${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`; // MM.DD

    const labels: Record<string, string> = {
      mon: "월",
      tue: "화",
      wed: "수",
      thu: "목",
      fri: "금",
      sat: "토",
      sun: "일",
    };

    return {
      key,
      label: labels[key],
      date: dateStr,
      fullDate: day.date,
      slots: day.slots,
    };
  });

  const weekDates = getWeekDates(currentDate);
  const DISPLAY_DAYS = weekDates.map(d => {
    const map = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const key = map[d.getDay()]; // 0=sun...
    const labels: Record<string, string> = {
      mon: "월",
      tue: "화",
      wed: "수",
      thu: "목",
      fri: "금",
      sat: "토",
      sun: "일",
    };

    return {
      key,
      label: labels[key],
      dateObj: d,
      dateStr: `${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`,
      fullDateStr: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
    };
  });

  type Slot = "x" | "r" | "o" | "g" | "selected";

  const TIMES = Array.from({ length: 25 }, (_, i) => {
    const minutes = 9 * 60 + i * 30;
    const hh = String(Math.floor(minutes / 60)).padStart(2, "0");
    const mm = String(minutes % 60).padStart(2, "0");
    return `${hh}:${mm}`;
  });

  const Dot = ({ kind }: { kind: Exclude<Slot, "x"> }) => {
    const base =
      "size-4 rounded-full border-2 border-black/60 shadow-[2px_2px_0_rgba(0_0_0_/0.3),inset_2px_2px_1px_rgba(255_255_255)]/0.8";
    if (kind === "r") return <span className={`${base} bg-red-700`} />;
    if (kind === "g") return <span className={`${base} bg-green-700`} />;
    if (kind === "o") return <span className={`${base} bg-amber-500`} />;

    return <span className={`${base} bg-amber-400`} />;
  };

  const getSlotKind = (fullDateStr: string, time: string): Slot => {
    if (!scheduleData || !parsedDays) return "x";

    const day = parsedDays.find(d => d.fullDate === fullDateStr);
    if (!day) return "x";

    const slot = day.slots.find(s => s.startAt.includes(time));
    if (!slot) return "x";

    const count = slot.roomCount;
    if (count === 1) return "g";
    if (count >= 2 && count <= 3) return "o";
    if (count >= 4) return "r";
    return "x";
  };

  const clickSlot = (startAt: string) => {
    setSelectedSlot(startAt);
    setIsLiveRoomListModalOpen(true);
  };

  const dayKeyFromDate = (d: Date) => {
    const map = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    return map[d.getDay()];
  };
  const now = useNow();
  const nowDayKey = dayKeyFromDate(now);
  const nowTimeKey = getAuctionTimeKey(now);

  return (
    <>
      <ContentContainer bordered={false} className="p-12">
        <div className="border-border-sub2 shadow-flat-heavy flex items-center justify-center gap-6 rounded-2xl border-3 p-6">
          <div
            onClick={handlePrevWeek}
            className="border-border-sub2 shadow-flat-dark flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-[3.5px] bg-black/5 text-lg transition-all hover:bg-black/10 active:scale-95"
          >
            <span className="-translate-x-[0.7px]">{"<"}</span>
          </div>
          <div className="grid gap-2">
            <p className="text-title-main text-5xl">주간 경매 시간표</p>
            <p className="text-title-sub2 flex justify-center text-lg">
              {scheduleData ? `${scheduleData.fromDate} ~ ${scheduleData.toDate}` : "Loading..."}
            </p>
          </div>
          <div
            onClick={handleNextWeek}
            className="border-border-sub2 shadow-flat-dark flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-[3.5px] bg-black/5 text-lg transition-all hover:bg-black/10 active:scale-95"
          >
            <span className="translate-x-[0.7px]">{">"}</span>
          </div>
        </div>
        <div className="border-title-sub mt-8 overflow-scroll rounded-2xl border-4">
          {/* 요일 헤더 */}
          <div className="grid grid-cols-[88px_repeat(7,1fr)]">
            <div className="border-title-sub/40 border-b" />

            {DISPLAY_DAYS.map(d => {
              const isSat = d.key === "sat";
              const isSun = d.key === "sun";
              return (
                <div
                  key={d.key}
                  className="border-title-sub/40 flex flex-col items-center justify-center gap-1 border-b border-l p-2"
                >
                  <div
                    className={[
                      "w-[68px] rounded-md py-2 text-center",
                      isSat ? "bg-title-main/20" : "",
                      isSun ? "bg-custom-red/20" : "bg-black/5",
                    ].join(" ")}
                  >
                    <p
                      className={
                        isSun ? "text-custom-red font-extrabold" : "text-title-main font-bold"
                      }
                    >
                      {d.label}
                    </p>
                    <p className={isSun ? "text-custom-red text-sm" : "text-title-sub2 text-sm"}>
                      {d.dateStr}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 바디 */}
          <div className="grid grid-cols-[88px_repeat(7,1fr)]">
            {TIMES.map(time => (
              <div key={time} className="contents">
                <div className="text-title-sub2 border-title-sub/40 border-t p-3 text-sm">
                  <span className="flex justify-center">{time}</span>
                </div>
                {DISPLAY_DAYS.map((d, idx) => {
                  const slot = getSlotKind(d.fullDateStr, time);

                  // Construct slot start Date
                  const [h, m] = time.split(":").map(Number);
                  const slotStart = new Date(d.dateObj);
                  slotStart.setHours(h, m, 0, 0);

                  const slotEnd = new Date(slotStart);
                  slotEnd.setMinutes(slotEnd.getMinutes() + 30);

                  const isCurrent = now >= slotStart && now < slotEnd;
                  const isPast = now >= slotEnd;

                  return (
                    <div
                      key={`${time}-${d.key}`}
                      onClick={() => {
                        if (isWriteMode && isPast) return;
                        const dateTime = `${d.fullDateStr}T${time}:00`;
                        clickSlot(dateTime);
                      }}
                      className={twMerge(
                        "border-title-sub/40 hover:bg-border-sub/80 flex h-12 items-center justify-center border-t border-l p-3 hover:cursor-pointer",
                        isCurrent && "animate-ringPulse bg-white/70",
                        isPast && "bg-black/20 opacity-30",
                        isWriteMode && isPast && "hover:cursor-not-allowed hover:bg-black/20"
                      )}
                    >
                      {slot === "x" ? (
                        <span className="text-title-sub/15">x</span>
                      ) : (
                        <Dot kind={slot as Exclude<Slot, "x">} />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <Modal
          isOpen={isLiveRoomListModalOpen}
          onClose={() => setIsLiveRoomListModalOpen(false)}
          className="max-w-[1200px]"
        >
          <AuctionPage
            startAt={selectedSlot || ""}
            writeMode={isWriteMode}
            onRoomSelect={roomIndex => {
              if (onRoomSelect && selectedSlot) {
                onRoomSelect(roomIndex, selectedSlot);
              }
            }}
          />
        </Modal>
      </ContentContainer>
    </>
  );
}

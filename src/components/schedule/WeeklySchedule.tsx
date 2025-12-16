"use client";
import ContentContainer from "../common/ContentContainer";
import useNow from "./UpdateNow";
import { twMerge } from "tailwind-merge";

export default function WeeklySchedule() {
  const DAYS = [
    { key: "mon", label: "월", date: "12.08" },
    { key: "tue", label: "화", date: "12.09" },
    { key: "wed", label: "수", date: "12.10" },
    { key: "thu", label: "목", date: "12.11" },
    { key: "fri", label: "금", date: "12.12" },
    { key: "sat", label: "토", date: "12.13" },
    { key: "sun", label: "일", date: "12.14" },
  ] as const;

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

  // Demo data (퍼블리싱용
  const SLOTS: Record<string, Slot[]> = {
    "09:00": ["x", "x", "o", "r", "r", "g", "r"],
    "09:30": ["g", "x", "g", "g", "x", "o", "x"],
    "10:00": ["o", "r", "x", "x", "g", "x", "x"],
    "10:30": ["o", "o", "o", "x", "o", "o", "x"],
    "11:00": ["x", "o", "x", "x", "x", "x", "x"],
    "11:30": ["r", "r", "x", "x", "x", "o", "g"],
    "12:00": ["x", "g", "o", "x", "x", "g", "x"],
    "12:30": ["r", "x", "o", "x", "x", "o", "r"],
    "13:00": ["x", "r", "x", "o", "o", "o", "g"],
    "13:30": ["o", "x", "o", "x", "o", "g", "o"],
    "14:00": ["x", "r", "o", "r", "x", "r", "x"],
    "14:30": ["x", "g", "g", "x", "r", "r", "g"],
    "15:00": ["g", "x", "x", "x", "o", "o", "x"],
    "15:30": ["r", "r", "r", "g", "g", "r", "x"],
    "16:00": ["o", "x", "r", "x", "o", "r", "r"],
    "16:30": ["x", "x", "x", "o", "g", "x", "o"],
    "17:00": ["x", "g", "g", "x", "x", "x", "x"],
    "17:30": ["x", "o", "x", "x", "x", "o", "r"],
    "18:00": ["x", "g", "g", "x", "x", "o", "r"],
    "18:30": ["x", "r", "x", "x", "o", "o", "o"],
    "19:00": ["x", "o", "x", "g", "x", "o", "x"],
    "19:30": ["r", "x", "x", "x", "x", "o", "x"],
    "20:00": ["r", "x", "o", "x", "o", "x", "g"],
    "20:30": ["r", "x", "x", "x", "r", "g", "o"],
    "21:00": ["x", "r", "o", "r", "x", "o", "x"],
  };

  const dayKeyFromDate = (d: Date) => {
    const map = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    return map[d.getDay()];
  };
  const timeKeyFromDate = (d: Date) => {
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = d.getMinutes() < 30 ? "00" : "30";
    return `${hh}:${mm}`;
  };
  const now = useNow();
  const nowDayKey = dayKeyFromDate(now);
  const nowTimeKey = timeKeyFromDate(now);

  return (
    <>
      <ContentContainer className="border-0 p-12">
        <div className="border-border-sub2 shadow-flat-heavy flex items-center justify-center gap-6 rounded-2xl border-3 p-6">
          <div className="border-border-sub2 shadow-flat-dark flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-[3.5px] bg-black/5 text-lg">
            <span className="-translate-x-[0.7px]">{"<"}</span>
          </div>
          <div className="grid gap-2">
            <p className="text-title-main text-5xl">주간 경매 시간표</p>
            <p className="text-title-sub2 flex justify-center text-lg">2025.12.08 ~ 2025.12.14</p>
          </div>
          <div className="border-border-sub2 shadow-flat-dark flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-[3.5px] bg-black/5 text-lg">
            <span className="translate-x-[0.7px]">{">"}</span>
          </div>
        </div>
        <div className="border-title-sub mt-8 overflow-scroll rounded-2xl border-4">
          {/* 요일 헤더 */}
          <div className="grid grid-cols-[88px_repeat(7,1fr)]">
            <div className="border-title-sub/40 border-b" />
            {DAYS.map(d => {
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
                      {d.date}
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
                {DAYS.map((d, idx) => {
                  const isNowCell =
                    nowDayKey === d.key && nowTimeKey === time && TIMES.includes(nowTimeKey);
                  const slot = (SLOTS[time] ?? Array(7).fill("x"))[idx] as Slot;
                  return (
                    <div
                      key={`${time}-${d.key}`}
                      className={twMerge(
                        "border-title-sub/40 flex h-12 items-center justify-center border-t border-l p-3",
                        isNowCell && "ring-custom-orange animate-ringPulse bg-white/70 ring-5"
                      )}
                    >
                      {
                        slot === "x" ? (
                          <span className="text-title-sub/15">×</span>
                        ) : (
                          <Dot kind={slot as Exclude<Slot, "x">} />
                        )

                        // isSelected ? (
                        //   <div className="border-title-sub/60 flex h-full w-full items-center justify-center rounded-md border bg-white/50">
                        //     <Dot kind="selected" />
                        //   </div>
                        // ) : (
                        // )
                      }
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </ContentContainer>
    </>
  );
}

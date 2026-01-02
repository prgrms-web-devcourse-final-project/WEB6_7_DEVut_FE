import { format } from "date-fns";
import { ko } from "date-fns/locale";

export const formatYmd = (d: Date | string) => {
  const date = typeof d === "string" ? new Date(d) : d;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  const minute = date.getMinutes();

  if (minute === 0) {
    return format(date, "yyyy-MM-dd a h시", { locale: ko });
  }

  return format(date, "yyyy-MM-dd a h시 m분", { locale: ko });
};

export const formatIsoDateTime = (date: Date, time: string) => {
  const [hour, minute] = time.split(":").map(Number);

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");

  const h = String(hour).padStart(2, "0");
  const min = String(minute).padStart(2, "0");

  return `${y}-${m}-${d}T${h}:${min}:00`;
};

export const getMinEndDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 4);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const getAuctionTimeKey = (d: Date | string) => {
  const date = typeof d === "string" ? new Date(d) : d;
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = date.getMinutes() < 30 ? "00" : "30";
  return `${hh}:${mm}`;
};

export const getScheduleByWeek = (date: Date) => {
  const base = new Date(date); // 원본 보호

  const day = base.getDay(); // 0(일) ~ 6(토)

  // 월요일 기준 offset 계산
  const diffToMonday = day === 0 ? -6 : 1 - day;

  const monday = new Date(base);
  monday.setDate(base.getDate() + diffToMonday);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return {
    fromDate: formatYmd(monday),
    toDate: formatYmd(sunday),
  };
};

export const getWeekDates = (date: Date) => {
  const base = new Date(date);
  const day = base.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;

  const monday = new Date(base);
  monday.setDate(base.getDate() + diffToMonday);

  const weekDates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    weekDates.push(d);
  }
  return weekDates;
};

export function isNowCell(day: Date): boolean {
  const now = getAuctionTimeKey(new Date());
  const end = getAuctionTimeKey(day);
  return now === end;
}

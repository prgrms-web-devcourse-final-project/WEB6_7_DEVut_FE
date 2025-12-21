import { format } from "date-fns";
import { ko } from "date-fns/locale";

export const formatYmd = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
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

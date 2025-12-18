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

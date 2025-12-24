import { format } from "date-fns";

export function formatPaymentDate(dateString: string) {
  return format(new Date(dateString), "yyyy.MM.dd HH:mm");
}

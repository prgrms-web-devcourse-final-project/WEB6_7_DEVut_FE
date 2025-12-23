import { useQuery } from "@tanstack/react-query";
import { historyPayments } from "../api/Payments.api";

export function useHistoryPayments() {
  return useQuery({
    queryKey: ["history-payments"],
    queryFn: historyPayments,
  });
}

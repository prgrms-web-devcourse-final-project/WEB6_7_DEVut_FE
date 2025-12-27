import { useQuery } from "@tanstack/react-query";
import { historyWithdrawals } from "../api/withdrawal.api";

export function useHistoryWithdrawals() {
  return useQuery({
    queryKey: ["history-withdrawals"],
    queryFn: historyWithdrawals,
  });
}

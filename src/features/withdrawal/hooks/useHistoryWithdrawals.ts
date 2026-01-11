import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { historyWithdrawals } from "../api/withdrawal.api";

export function useHistoryWithdrawals({ page }: { page: number }) {
  return useQuery({
    queryKey: ["history-withdrawals", page], // ✅ page 포함
    queryFn: () => historyWithdrawals({ page }),
    placeholderData: keepPreviousData,
  });
}

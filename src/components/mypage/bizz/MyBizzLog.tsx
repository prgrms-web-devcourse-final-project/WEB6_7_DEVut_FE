"use client";

import OptionDropdown from "@/components/common/OptionDropdown";
import BizzLogCard from "./BizzLogCard";
import { useState } from "react";
import { useHistoryPayments } from "@/features/payments/hooks/useHistoryPayments";
import { useHistoryWithdrawals } from "@/features/withdrawal/hooks/useHistoryWithdrawals";
import { mapPaymentsToBizzLog, mapWithdrawalsToBizzLog } from "@/utils/myBizzLogMapping";

export default function MyBizzLog({ simple = false }: { simple?: boolean }) {
  const { data: paymentsHistory } = useHistoryPayments();
  const { data: withdrawalsHistory } = useHistoryWithdrawals();
  const [status, setStatus] = useState("전체");

  const logs: BizzLogItem[] = [
    ...mapPaymentsToBizzLog(paymentsHistory?.payments),
    ...mapWithdrawalsToBizzLog(withdrawalsHistory?.withdrawals),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return (
    <div className="mx-auto w-full max-w-[1440px]">
      {!simple && (
        <OptionDropdown label={status}>
          <OptionDropdown.Item onClick={() => setStatus("전체")}>전체</OptionDropdown.Item>
          <OptionDropdown.Item onClick={() => setStatus("충전")}>충전</OptionDropdown.Item>
          <OptionDropdown.Item onClick={() => setStatus("출금")}>출금</OptionDropdown.Item>
        </OptionDropdown>
      )}
      <div className="border-border-sub2 text-border-sub2 bg-content-gray mt-3 grid grid-cols-[1fr_1fr_1fr_1fr] rounded-lg border-2 px-4 py-2 text-center font-bold">
        <div>구분</div>
        <div>일시</div>
        <div>금액</div>
        <div>잔액</div>
      </div>
      <div className="mt-1 flex flex-col gap-3">
        {logs.map(log => (
          <BizzLogCard key={log.id} log={log} />
        ))}
      </div>
    </div>
  );
}

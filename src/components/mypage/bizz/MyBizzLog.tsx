"use client";

import OptionDropdown from "@/components/common/OptionDropdown";
import BizzLogCard from "./BizzLogCard";
import { useState } from "react";
import { useHistoryWithdrawals } from "@/features/withdrawal/hooks/useHistoryWithdrawals";

export default function MyBizzLog({ simple = false }: { simple?: boolean }) {
  const { data } = useHistoryWithdrawals();
  const [status, setStatus] = useState("전체");
  console.log("walletHistories:", data);
  const isEmpty = !data?.walletHistories || data.walletHistories.length === 0;
  const historyData = data?.walletHistories || [];
  const mylogs = historyData.sort(
    (a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime()
  );
  const logs = mylogs.map((log, index) => {
    const newLog = { ...log, index };
    return newLog;
  });
  console.log("logs:", logs);
  return (
    <div className="mx-auto w-full max-w-[1440px]">
      {!simple && (
        <OptionDropdown label={status} className="cursor-pointer">
          <OptionDropdown.Item onClick={() => setStatus("전체")}>전체</OptionDropdown.Item>
          <OptionDropdown.Item onClick={() => setStatus("충전")}>충전</OptionDropdown.Item>
          <OptionDropdown.Item onClick={() => setStatus("출금")}>출금</OptionDropdown.Item>
          <OptionDropdown.Item onClick={() => setStatus("구매")}>구매</OptionDropdown.Item>
          <OptionDropdown.Item onClick={() => setStatus("판매")}>판매</OptionDropdown.Item>
          <OptionDropdown.Item onClick={() => setStatus("입찰")}>입찰</OptionDropdown.Item>
          <OptionDropdown.Item onClick={() => setStatus("환불")}>환불</OptionDropdown.Item>
        </OptionDropdown>
      )}
      <div className="border-border-sub2 text-border-sub2 bg-content-gray mt-3 grid grid-cols-[1fr_1fr_1fr_1fr] rounded-lg border-2 px-4 py-2 text-center font-bold">
        <div>구분</div>
        <div>일시</div>
        <div>금액</div>
        <div>잔액</div>
      </div>
      <div className="mt-1 flex flex-col gap-3">
        {isEmpty ? (
          <div className="border-border-sub col-span-full mt-3 flex min-h-[350px] flex-col items-center justify-center rounded-md border-2 border-dashed bg-[#FDF6E9] text-center">
            <p className="text-title-main text-lg font-bold">기록이 없습니다</p>
          </div>
        ) : status === "전체" ? (
          logs.map(log => <BizzLogCard key={log.index} log={log} />)
        ) : status === "충전" ? (
          logs
            .filter(log => log.transactionType === "CHARGE")
            .map(log => <BizzLogCard key={log.index} log={log} />)
        ) : status === "출금" ? (
          logs
            .filter(log => log.transactionType === "WITHDRAW")
            .map(log => <BizzLogCard key={log.index} log={log} />)
        ) : status === "판매" ? (
          logs
            .filter(
              log =>
                log.transactionType === "RECEIVE_FROM_USER" ||
                log.transactionType === "DEAL_SETTLEMENT"
            )
            .map(log => <BizzLogCard key={log.index} log={log} />)
        ) : status === "입찰" ? (
          logs
            .filter(log => log.transactionType === "BID")
            .map(log => <BizzLogCard key={log.index} log={log} />)
        ) : status === "환불" ? (
          logs
            .filter(log => log.transactionType === "BID_REFUND" || log.transactionType === "REFUND")
            .map(log => <BizzLogCard key={log.index} log={log} />)
        ) : (
          logs
            .filter(log => log.transactionType === "PAY_TO_USER")
            .map(log => <BizzLogCard key={log.index} log={log} />)
        )}
      </div>
    </div>
  );
}

"use client";

import OptionDropdown from "@/components/common/OptionDropdown";
import BizzLogCard from "./BizzLogCard";
import { useState } from "react";
import { useHistoryWithdrawals } from "@/features/withdrawal/hooks/useHistoryWithdrawals";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/common/Pagenation";

export default function MyBizzLog({ simple = false }: { simple?: boolean }) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);

  const { data } = useHistoryWithdrawals({ page });
  const [status, setStatus] = useState("전체");

  const histories = data?.walletHistories ?? [];
  const totalPages = data?.totalPages ?? 1;

  const sortedLogs = [...histories].sort(
    (a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime()
  );

  const filteredLogs =
    status === "전체"
      ? sortedLogs
      : status === "충전"
        ? sortedLogs.filter(l => l.transactionType === "CHARGE")
        : status === "출금"
          ? sortedLogs.filter(l => l.transactionType === "WITHDRAW")
          : status === "판매"
            ? sortedLogs.filter(
                l =>
                  l.transactionType === "RECEIVE_FROM_USER" ||
                  l.transactionType === "DEAL_SETTLEMENT"
              )
            : status === "입찰"
              ? sortedLogs.filter(l => l.transactionType === "BID")
              : status === "환불"
                ? sortedLogs.filter(
                    l => l.transactionType === "BID_REFUND" || l.transactionType === "REFUND"
                  )
                : sortedLogs.filter(l => l.transactionType === "PAY_TO_USER");

  const isEmpty = filteredLogs.length === 0;

  return (
    <div className="mx-auto w-full max-w-[1440px]">
      {!simple && (
        <OptionDropdown label={status}>
          {["전체", "충전", "출금", "구매", "판매", "입찰", "환불"].map(v => (
            <OptionDropdown.Item key={v} onClick={() => setStatus(v)}>
              {v}
            </OptionDropdown.Item>
          ))}
        </OptionDropdown>
      )}

      <div className="border-border-sub2 text-border-sub2 bg-content-gray mt-3 grid grid-cols-4 rounded-lg border-2 px-4 py-2 text-center font-bold">
        <div>구분</div>
        <div>일시</div>
        <div>금액</div>
        <div>잔액</div>
      </div>

      <div className="mt-1 flex flex-col gap-3">
        {isEmpty ? (
          <div className="border-border-sub mt-3 flex min-h-[350px] items-center justify-center rounded-md border-2 border-dashed bg-[#FDF6E9]">
            <p className="text-title-main text-lg font-bold">기록이 없습니다</p>
          </div>
        ) : (
          filteredLogs.map((log, idx) => (
            <BizzLogCard
              key={`${log.transactionDate}-${idx}`} // 서버 id 없을 때 안전
              log={log}
            />
          ))
        )}
      </div>

      <Pagination totalPages={totalPages} />
    </div>
  );
}

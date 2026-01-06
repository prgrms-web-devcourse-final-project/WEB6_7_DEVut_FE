import { formatPaymentDate } from "@/utils/formatDate";

export default function BizzLogCard({ log }: { log: BizzLogItem }) {
  const isWithdraw = log.transactionType === "WITHDRAW";
  return (
    <div className="text-border-sub2 shadow-flat-light grid grid-cols-[1fr_1fr_1fr_1fr] rounded-lg bg-white px-4 py-2 text-center">
      <div className={isWithdraw ? "text-red-500" : "text-green-600"}>
        {log.transactionType === "CHARGE" ? "충전" : "출금"}
      </div>

      <div>{formatPaymentDate(log.transactionDate)}</div>

      <div className={isWithdraw ? "text-red-500" : "text-green-600"}>
        {log.amount.toLocaleString("ko-KR")} Bizz
      </div>

      <div>{log.bizzBalanceAfter.toLocaleString("ko-KR")} Bizz</div>
    </div>
  );
}

import { formatPaymentDate } from "@/utils/formatDate";

export default function BizzLogCard({ log }: { log: BizzLogItem }) {
  const isWithdraw = log.transactionType === "WITHDRAW";
  const isCharge = log.transactionType === "CHARGE";
  const isPayToUser = log.transactionType === "PAY_TO_USER";
  const isBid = log.transactionType === "BID";
  const isRefund = log.transactionType === "REFUND" || log.transactionType === "BID_REFUND";
  return (
    <div className="text-border-sub2 shadow-flat-light grid grid-cols-[1fr_1fr_1fr_1fr] rounded-lg bg-white px-4 py-2 text-center">
      <div
        className={
          isWithdraw
            ? "text-red-500"
            : isCharge
              ? "text-custom-blue"
              : isPayToUser
                ? "text-orange-500"
                : isBid
                  ? "text-yellow-500"
                  : isRefund
                    ? "text-purple-700"
                    : "text-green-600"
        }
      >
        {isCharge
          ? "충전"
          : isBid
            ? "입찰"
            : isPayToUser
              ? "구매"
              : log.transactionType === "RECEIVE_FROM_USER" ||
                  log.transactionType === "DEAL_SETTLEMENT"
                ? "판매"
                : isRefund
                  ? "환불"
                  : "출금"}
      </div>

      <div>{formatPaymentDate(log.transactionDate)}</div>

      <div
        className={
          isWithdraw
            ? "text-red-500"
            : isCharge
              ? "text-custom-blue"
              : isPayToUser
                ? "text-orange-500"
                : isBid
                  ? "text-yellow-500"
                  : isRefund
                    ? "text-purple-700"
                    : "text-green-600"
        }
      >
        {log.amount.toLocaleString("ko-KR")} Bizz
      </div>

      <div>{log.bizzBalanceAfter.toLocaleString("ko-KR")} Bizz</div>
    </div>
  );
}

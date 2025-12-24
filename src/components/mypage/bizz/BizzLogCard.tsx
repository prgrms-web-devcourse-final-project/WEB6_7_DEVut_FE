import { formatPaymentDate } from "@/utils/formatDate";

export default function BizzLogCard({ log }: { log: History }) {
  return (
    <div className="text-border-sub2 shadow-flat-light grid grid-cols-[1fr_1fr_1fr_1fr] rounded-lg bg-white px-4 py-2 text-center">
      <div>구매</div>
      <div>{formatPaymentDate(log.PaymentDate)}</div>
      <div>{log.amount.toLocaleString("ko-KR")} Bizz</div>
      <div>잔액</div>
    </div>
  );
}

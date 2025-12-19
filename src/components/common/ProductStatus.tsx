
import StatusBar from "./StatusBar";
import { TimeBar } from "./TimeBar";

interface ProductStatusProps {
  context: ProductContext;
  status: ProductStatusData;
}

export default function ProductStatus({ context, status }: ProductStatusProps) {
  if (status.kind === "time") {
    return <TimeBar time={status.time} label={status.label ?? ""} variant="warning" />;
  }

  return (
    <StatusBar
      status={status.status ?? "BEFORE_BIDDING"}
      label={getStatusLabel(context, status.status)}
    />
  );
}

function getStatusLabel(context: ProductContext, status: AuctionStatus): string {
  if (context === "CARD") {
    if (status === "IN_PROGRESS") return "라이브 진행 중";
    return "라이브 종료";
  }

  if (context === "MY_SELLING") {
    return {
      BEFORE_BIDDING: "입찰 전",
      IN_PROGRESS: "입찰 중",
      PAYMENT_PENDING: "잔금 대기",
      IN_DEAL: "거래 중",
      PURCHASE_CONFIRMED: "판매 완료",
      FAILED: "유찰",
    }[status];
  }

  return {
    BEFORE_BIDDING: "입찰 전",
    IN_PROGRESS: "입찰 중",
    PAYMENT_PENDING: "결제 대기",
    IN_DEAL: "거래 중",
    PURCHASE_CONFIRMED: "구매 확정",
    FAILED: "경매 종료",
  }[status];
}

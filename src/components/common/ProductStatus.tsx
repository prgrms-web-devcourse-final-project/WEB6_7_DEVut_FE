import StatusBar from "./StatusBar";
import { TimeBar } from "./TimeBar";

interface ProductStatusProps {
  context: ProductContext;
  status: ProductStatusData;
  auctionType: AuctionType;
}

function getStatusLabel(
  context: ProductContext,
  status: AuctionStatus,
  auctionType?: AuctionType
): string {
  if (context === "CARD") {
    const isLive = auctionType === "LIVE";

    if (isLive) {
      if (status === "BEFORE_BIDDING") return "라이브 예정";
      if (status === "IN_PROGRESS") return "라이브 진행 중";
      return "라이브 종료";
    }

    if (status === "IN_PROGRESS") return "경매 진행 중";
    return "경매 종료";
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

export default function ProductStatus({ context, status, auctionType }: ProductStatusProps) {
  if (status.kind === "time" && auctionType === "DELAYED") {
    return (
      <TimeBar
        context={context}
        auctionType={auctionType}
        time={status.time}
        label={status.label}
      />
    );
  }

  // 그 외는 전부 StatusBar
  const auctionStatus = status.kind === "status" ? status.status : "BEFORE_BIDDING";

  const label = getStatusLabel(context, auctionStatus, auctionType);

  return (
    <StatusBar context={context} auctionType={auctionType} status={auctionStatus} label={label} />
  );
}

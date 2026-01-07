export type UIStatus = "pending" | "processing" | "done" | "confirmed";

export const tradeStatusToUIStatus: Record<DealStatus, UIStatus> = {
  PENDING: "pending", // 잔금 대기
  PAID: "processing", // 결제 완료 → 거래 중
  SHIPPING: "processing", // 배송 중 → 거래 중
  COMPLETED: "confirmed", // 거래 최종 완료 → 구매 확정

  // 아래는 뱃지로 표현 안 하거나, done으로 묶을 수도 있음
  CANCELLED: "done",
  REFUND_REQUESTED: "done",
  REFUNDED: "done",
};

type MilestoneStep = {
  key: "PENDING" | "PAID" | "SHIPPING_PREPARE" | "SHIPPING_IN_PROGRESS" | "COMPLETED";
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  active: boolean;
  done: boolean;
};

export function buildMilestones({
  role,
  status,
  hasTracking,
  onPayClick,
  onConfirmClick,
}: {
  role: "BUYER" | "SELLER";
  status: DealStatus;
  hasTracking: boolean;
  onPayClick: () => void;
  onConfirmClick: () => void;
}): MilestoneStep[] {
  const isBuyer = role === "BUYER";

  const allSteps: MilestoneStep[] = [
    {
      key: "PENDING",
      title: "잔금 대기",
      description: isBuyer ? "상품의 결제를 대기 중입니다." : "구매자의 결제를 기다리고 있습니다.",
      action:
        isBuyer && status === "PENDING" ? { label: "결제하기", onClick: onPayClick } : undefined,
      active: status === "PENDING",
      done: status !== "PENDING",
    },

    {
      key: "PAID",
      title: "결제 완료",
      description: "결제가 완료되었습니다.",
      active: status === "PAID",
      done: ["SHIPPING", "COMPLETED"].includes(status),
    },

    {
      key: "SHIPPING_PREPARE",
      title: "거래 중",
      description: isBuyer ? "판매자가 발송 준비 중입니다." : "송장 정보를 입력해주세요.",
      active: status === "PAID",
      done: ["SHIPPING", "COMPLETED"].includes(status),
    },

    {
      key: "SHIPPING_IN_PROGRESS",
      title: "거래 완료",
      description: isBuyer ? "구매 확정을 기다리고 있습니다." : "판매가 완료되었습니다.",
      action:
        isBuyer && status === "SHIPPING"
          ? { label: "구매 확정", onClick: onConfirmClick }
          : undefined,
      active: status === "SHIPPING",
      done: status === "COMPLETED",
    },
  ];

  return allSteps.filter(step => {
    if (status === "PENDING") {
      return step.key === "PENDING";
    }

    if (status === "PAID") {
      return ["PENDING", "PAID", "SHIPPING_PREPARE"].includes(step.key);
    }

    if (status === "SHIPPING") {
      return ["PENDING", "PAID", "SHIPPING_PREPARE", "SHIPPING_IN_PROGRESS"].includes(step.key);
    }

    return true; // COMPLETED
  });
}

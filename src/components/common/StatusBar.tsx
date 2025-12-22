import { cva } from "class-variance-authority";
import { CirclePlay, Hourglass, RefreshCcw, Stamp, XCircle } from "lucide-react";

const cardStatusBarCva = cva(
  "text-title-main-dark flex h-[33.53px] w-full items-center justify-center gap-1 rounded-[3px] border-2 border-[#4F382A] text-[13px]",
  {
    variants: {
      auctionType: {
        LIVE: "bg-custom-orange",
        DELAYED: "bg-custom-brown",
        ALL: "bg-custom-brown",
      },
    },
    defaultVariants: {
      auctionType: "DELAYED",
    },
  }
);

const tradeStatusBarCva = cva(
  "flex h-[33.53px] w-full items-center justify-center gap-1 rounded-[3px] border-2 border-[#4F382A] text-[13px] text-white",
  {
    variants: {
      status: {
        BEFORE_BIDDING: "bg-custom-red",
        IN_PROGRESS: "bg-custom-orange",
        PAYMENT_PENDING: "bg-custom-red",
        IN_DEAL: "bg-custom-orange",
        PURCHASE_CONFIRMED: "bg-custom-violet",
        FAILED: "bg-border-sub",
      },
    },
  }
);

const iconMap = {
  BEFORE_BIDDING: <Hourglass size={16} strokeWidth={2.5} />,
  IN_PROGRESS: <CirclePlay className="text-custom-red" size={15} strokeWidth={3} />,
  PAYMENT_PENDING: <Hourglass size={16} strokeWidth={2.5} />,
  IN_DEAL: <RefreshCcw size={15} strokeWidth={3} />,
  PURCHASE_CONFIRMED: <Stamp size={16} strokeWidth={2.5} />,
  FAILED: <XCircle size={16} strokeWidth={2.5} />,
} as const;

interface StatusBarProps {
  context: ProductContext;
  auctionType: AuctionType;
  status: AuctionStatus;
  label: string;
}

export default function StatusBar({ context, auctionType, status, label }: StatusBarProps) {
  const className =
    context === "CARD" ? cardStatusBarCva({ auctionType }) : tradeStatusBarCva({ status });

  return (
    <div className={className}>
      <span className="text-[#4F382A]">{iconMap[status]}</span>
      {label}
    </div>
  );
}

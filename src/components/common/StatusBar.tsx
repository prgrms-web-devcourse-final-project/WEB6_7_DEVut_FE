import { Hourglass, RefreshCcw, Stamp, XCircle } from "lucide-react";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface StatusBarProps {
  status: AuctionStatus;
  label: string;
  className?: string;
}

const statusStyle: Record<AuctionStatus, string> = {
  BEFORE_BIDDING: "bg-custom-red",
  IN_PROGRESS: "bg-custom-orange",
  PAYMENT_PENDING: "bg-custom-red",
  IN_DEAL: "bg-custom-orange",
  PURCHASE_CONFIRMED: "bg-custom-violet",
  FAILED: "bg-border-sub",
};

const iconMap: Record<AuctionStatus, ReactNode> = {
  BEFORE_BIDDING: <Hourglass size={16} strokeWidth={2.5} />,
  IN_PROGRESS: <RefreshCcw size={15} strokeWidth={3} />,
  PAYMENT_PENDING: <Hourglass size={16} strokeWidth={2.5} />,
  IN_DEAL: <RefreshCcw size={15} strokeWidth={3} />,
  PURCHASE_CONFIRMED: <Stamp size={16} strokeWidth={2.5} />,
  FAILED: <XCircle size={16} strokeWidth={2.5} />,
};

export default function StatusBar({ status, label, className }: StatusBarProps) {
  return (
    <div
      className={twMerge(
        "flex h-[33.53px] w-full items-center justify-center gap-1 rounded-[3px] border-2 border-[#4F382A] text-[13px] text-white",
        statusStyle[status],
        className
      )}
    >
      <span className="text-[#4F382A]">{iconMap[status]}</span>
      {label}
    </div>
  );
}

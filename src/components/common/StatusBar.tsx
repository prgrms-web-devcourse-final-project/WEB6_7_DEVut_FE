import { CircleCheckBig, Clock, Hourglass, RefreshCcw, Stamp } from "lucide-react";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import offLive from "@/assets/offLive.svg";
import onLive from "@/assets/onLive.svg";
import Image from "next/image";

type Status = "pending" | "processing" | "done" | "confirmed";

const statusStyle: Record<Status, string> = {
  pending: "bg-custom-red",
  processing: "bg-custom-orange",
  done: "bg-custom-green",
  confirmed: "bg-custom-violet",
};

const iconMap: Record<Status, ReactNode> = {
  pending: <Hourglass size={16} strokeWidth={2.5} />,
  processing: <RefreshCcw size={15} strokeWidth={3} />,
  done: <CircleCheckBig size={16} strokeWidth={2.5} />,
  confirmed: <Stamp size={16} strokeWidth={2.5} />,
};

const textMap: Record<Status, string> = {
  pending: "잔금 대기",
  processing: "거래 중",
  done: "결제 완료",
  confirmed: "구매 확정",
};

export default function StatusBar({ status, className }: { status: Status; className?: string }) {
  return (
    <div
      className={twMerge(
        "flex h-[33.53px] w-full items-center justify-center gap-1 rounded-[3px] border-2 border-[#4F382A] text-[13px] text-white",
        statusStyle[status],
        className
      )}
    >
      <span className="text-[#4F382A]">{iconMap[status]}</span>
      {textMap[status]}
    </div>
  );
}

type Time = "delay" | "offLive" | "onLive";

const timeStyle: Record<Time, string> = {
  delay: "bg-custom-brown",
  offLive: "bg-custom-orange",
  onLive: "bg-custom-orange",
};

const timeIconMap: Record<Time, ReactNode> = {
  delay: <Clock size={18} />,
  offLive: <Image src={offLive} alt="라이브아님" />,
  onLive: <Image src={onLive} alt="라이브임" />,
};

export function TimeBar({
  type,
  label,
  className,
}: {
  type: Time;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        "flex h-[33.53px] w-full items-center justify-center gap-1 rounded-[3px] border-2 border-[#4F382A] text-[13px] text-[#4F382A]",
        timeStyle[type],
        className
      )}
    >
      <span className="text-[#4F382A]">{timeIconMap[type]}</span>
      {label ? label : "라이브 경매 진행 중"}
    </div>
  );
}

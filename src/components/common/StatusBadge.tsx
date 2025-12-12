import { twMerge } from "tailwind-merge";

type Status = "pending" | "processing" | "done" | "confirmed";

const statusStyle: Record<Status, string> = {
  pending: "bg-custom-red",
  processing: "bg-custom-orange",
  done: "bg-custom-green",
  confirmed: "bg-custom-violet",
};

const borderStyle: Record<Status, string> = {
  pending: "border-[#8B2500]",
  processing: "border-[#FCA311]",
  done: "border-[#4AB393]",
  confirmed: "border-[#9D4894]",
};

const textMap: Record<Status, string> = {
  pending: "잔금 대기",
  processing: "거래 중",
  done: "결제 완료",
  confirmed: "구매 확정",
};

export default function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <>
      <div
        className={twMerge(
          "flex h-[25px] w-[62.89px] items-center justify-center rounded-[9999px] border text-[12px] text-white",
          statusStyle[status],
          borderStyle[status],
          className
        )}
      >
        {textMap[status]}
      </div>
    </>
  );
}

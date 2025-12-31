import BizzAmount from "@/components/common/BizzAmount";
import { twMerge } from "tailwind-merge";
import test from "@/assets/images/auction/auctioneer.svg";
import Image from "next/image";

interface ProductItemProps {
  product: LiveAuctionProduct;
}

export default function LiveProductItem({ product }: ProductItemProps) {
  const isOngoing = product.status === "ONGOING";
  const isWaiting = product.status === "WAITING";
  const isDone = product.status === "DONE";
  return (
    <li
      className={twMerge(
        "border-border-sub relative flex items-center gap-3 border-b-[1.5px] p-2 pr-3 transition",
        isOngoing && "border-custom-red bg-content-area border-2",
        isDone && "opacity-40",
        !isDone && "hover:bg-content-gray/10"
      )}
    >
      <div className="border-border-sub2 h-15 w-15 shrink-0 overflow-hidden rounded border-2 bg-white">
        <Image src={test} alt={test} />
      </div>

      <div className="text-title-main-dark flex flex-1 flex-col gap-0.5 text-sm">
        <span className="line-clamp-1">{product.name}</span>

        <span className="text-title-main flex gap-1 text-sm">
          시작가{" "}
          <BizzAmount
            amount={product.startPrice}
            fontSize={"sm"}
            iconSize={"sm"}
            className="text-custom-red"
          />
        </span>
      </div>

      {isOngoing && <span className="text-xs font-semibold text-red-500">진행중</span>}
      {isWaiting && <span className="text-subsub-title text-xs">대기</span>}
      {isDone && <span className="text-subsub-title text-xs">종료</span>}
    </li>
  );
}

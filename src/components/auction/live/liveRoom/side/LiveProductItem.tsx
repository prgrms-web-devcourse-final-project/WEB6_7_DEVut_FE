import BizzAmount from "@/components/common/BizzAmount";
import { twMerge } from "tailwind-merge";
import test from "@/assets/images/auction/auctioneer.svg";
import Image from "next/image";
import { getLiveStatus } from "@/utils/auction";

interface ProductItemProps {
  product: LiveRoomProduct;
}

export default function LiveProductItem({ product }: ProductItemProps) {
  const isReady = getLiveStatus(product.auctionStatus) === "READY";
  const isOngoing = getLiveStatus(product.auctionStatus) === "ONGOING";
  const isClose = getLiveStatus(product.auctionStatus) === "CLOSE";
  return (
    <li
      className={twMerge(
        "border-border-sub relative flex items-center gap-3 border-b-[1.5px] p-2 pr-3 transition",
        isOngoing && "border-custom-red bg-content-area border-2",
        isClose && "opacity-40",
        !isClose && "hover:bg-content-gray/10"
      )}
    >
      <div className="border-border-sub2 h-15 w-15 shrink-0 overflow-hidden rounded border-2 bg-white">
        <Image src={test} alt={test} />
      </div>

      <div className="text-title-main-dark flex flex-1 flex-col gap-0.5 text-sm">
        <span className="line-clamp-1">{product.name}</span>

        <span className="text-title-main flex gap-1 text-sm">
          현재가{" "}
          <BizzAmount
            amount={product.price}
            fontSize={"sm"}
            iconSize={"sm"}
            className="text-custom-red"
          />
        </span>
      </div>

      {isOngoing && <span className="text-xs font-semibold text-red-500">진행중</span>}
      {isReady && <span className="text-subsub-title text-xs">대기</span>}
      {isClose && <span className="text-subsub-title text-xs">종료</span>}
    </li>
  );
}

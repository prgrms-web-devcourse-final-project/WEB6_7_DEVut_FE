import BizzAmount from "@/components/common/BizzAmount";
import { twMerge } from "tailwind-merge";
import test from "@/assets/images/auction/auctioneer.svg";
import Image from "next/image";
import { getLiveStatus } from "@/utils/auction";
import BaseImage from "@/components/common/BaseImage";

interface ProductItemProps {
  product: LiveRoomProduct;
}

export default function LiveProductItem({ product }: ProductItemProps) {
  const liveStatus = getLiveStatus(product.auctionStatus);

  const isReady = liveStatus === "READY";
  const isOngoing = liveStatus === "ONGOING";
  const isClose = liveStatus === "CLOSE";

  const isSuccess =
    product.auctionStatus === "PAYMENT_PENDING" ||
    product.auctionStatus === "IN_DEAL" ||
    product.auctionStatus === "PURCHASE_CONFIRMED";

  const isFailed = product.auctionStatus === "FAILED";
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
        <BaseImage src={product.imageUrls[0] || test} alt={product.name} />
      </div>

      <div className="text-title-main-dark flex flex-1 flex-col gap-0.5 text-sm">
        <span className="line-clamp-1">{product.name}</span>

        <span className="text-title-main flex gap-1 text-sm">
          현재가{" "}
          <BizzAmount
            amount={product.currentPrice}
            fontSize={"sm"}
            iconSize={"sm"}
            className="text-custom-red"
          />
        </span>
      </div>

      {isOngoing && <span className="text-xs font-semibold text-red-500">진행중</span>}
      {isReady && <span className="text-subsub-title text-xs">대기</span>}
      {isClose && isSuccess && <span className="text-xs font-semibold text-green-600">낙찰</span>}
      {isClose && isFailed && <span className="text-xs font-semibold text-gray-500">유찰</span>}
    </li>
  );
}

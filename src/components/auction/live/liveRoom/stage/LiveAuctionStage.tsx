"use client";

import Image from "next/image";
import StageBackground from "./StageBackground";
import auctioneerImg from "@/assets/images/auction/auctioneer.svg";
import AuctionProduct from "./AuctionProduct";
import Input from "@/components/common/Input";
import BizzAmount from "@/components/common/BizzAmount";
import BidButton from "./BidButton";
import { twMerge } from "tailwind-merge";

interface LiveAuctionStageProps {
  currentStageProduct: LiveRoomProduct | undefined;
  allClosed: boolean;
}

export default function LiveAuctionStage({
  currentStageProduct,
  allClosed,
}: LiveAuctionStageProps) {
  return (
    <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
      <div
        className={twMerge(
          "relative aspect-video w-full shrink-0 overflow-hidden border-[3px] bg-black transition-opacity duration-300",
          allClosed && "pointer-events-none opacity-40"
        )}
      >
        <StageBackground />

        {allClosed && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/30 text-3xl text-white">
            모든 경매가 마감되었습니다
          </div>
        )}

        {!allClosed && (
          <>
            <div
              className="absolute z-20"
              style={{
                bottom: "10%",
                left: "clamp(32px, 10vw, 120px)",
              }}
            >
              <Image
                src={auctioneerImg}
                alt="auctioneer"
                className="block h-auto w-[clamp(70px,9vw,120px)] object-contain drop-shadow-[0_12px_18px_rgba(0,0,0,0.6)]"
              />
            </div>

            <AuctionProduct currentStageProduct={currentStageProduct} />
          </>
        )}
      </div>

      {/* <AuctionAudience users={audience.users} /> */}

      <div className="bg-bg-main border-border-sub2 shrink-0 border-t">
        <div className="border-border-sub2 bg-custom-brown/30 text-title-main-dark flex h-12 items-center justify-between border-[3px] px-6 text-sm">
          <span>접속자: 284명</span>
          <span>경과 시간: 47분 13초</span>
        </div>

        <div className="grid grid-cols-1 gap-4 px-4 pt-6 lg:grid-cols-[1.2fr_1fr_1.4fr] lg:items-center">
          <div className="flex justify-center lg:justify-start">
            <div className="border-border-sub2 shadow-flat-light flex w-full items-center rounded-sm border-2 bg-white px-4 py-2 text-sm">
              <span className="text-title-main mr-2">보유 Bizz</span>
              <BizzAmount amount={2300000} />
            </div>
          </div>

          <div className="flex justify-center">
            <BidButton />
          </div>

          <div className="flex flex-col gap-3 lg:items-stretch">
            <div className="grid w-full grid-cols-3 gap-3 lg:justify-end">
              {["+ 1만", "+ 3만", "+ 5만"].map(label => (
                <button
                  key={label}
                  className="border-border-sub2 h-12 w-full cursor-pointer rounded-sm border-[3px] bg-[#8B2500] text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] active:translate-y-px"
                >
                  {label}
                </button>
              ))}
            </div>

            <Input placeholder="입찰 금액" className="w-full rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}

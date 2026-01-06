"use client";

import Image from "next/image";
import StageBackground from "./StageBackground";
import auctioneerImg from "@/assets/images/auction/auctioneer.svg";
import AuctionProduct from "./AuctionProduct";
import BizzAmount from "@/components/common/BizzAmount";
import BidButton from "./BidButton";
import { twMerge } from "tailwind-merge";
import { getBidSteps } from "@/utils/auction";
import { useState } from "react";
import PriceInput from "@/components/common/PriceInput";
import { ConfirmModal } from "@/components/common/ComfirmModal";
import { useLiveBid } from "@/features/auction/hooks/liveAuctionRoom/useLiveAuctionRoom";
import Toast, { ToastType } from "@/components/common/Toast";
import { useQueryClient } from "@tanstack/react-query";
import { formatRemainingTime } from "@/utils/getRemainingTime";

interface LiveAuctionStageProps {
  roomId: number | null;
  currentStageProduct: LiveRoomProduct | undefined;
  roomStatus: "READY" | "ONGOING" | "INTERMISSION" | "CLOSE";
  participants: number;
  remaingMs: number | null | undefined;
}

export default function LiveAuctionStage({
  roomId,
  currentStageProduct,
  roomStatus,
  participants,
  remaingMs,
}: LiveAuctionStageProps) {
  const isIntermission = roomStatus === "INTERMISSION";
  const isClosed = roomStatus === "CLOSE";

  const bidSteps = getBidSteps(currentStageProduct?.currentPrice || 10000);
  const [bidInput, setBidInput] = useState(0);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const notify = (message: string, type: ToastType) => Toast({ message, type });

  const { mutate: bid } = useLiveBid();
  const queryClient = useQueryClient();

  const handleConfirm = () => {
    if (!roomId || !currentStageProduct) return;
    if (isIntermission || isClosed) return;

    bid(
      {
        bidPrice: bidInput,
        auctionId: roomId,
        liveItemId: currentStageProduct.id,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["live-room-products", roomId],
          });
          setIsConfirmOpen(false);
          notify("입찰을 성공하였습니다!", "SUCCESS");
        },
        onError: (error: unknown) => {
          setIsConfirmOpen(false);
          const { msg } = error as ResponseBase;
          notify(msg, "ERROR");
        },
      }
    );
  };

  return (
    <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
      <div className="relative aspect-video w-full shrink-0 overflow-hidden border-[3px] bg-black">
        <StageBackground />

        <div
          className={twMerge(
            "pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-black/40 text-3xl text-white transition-opacity",
            isClosed ? "opacity-100" : "opacity-0"
          )}
        >
          모든 경매가 마감되었습니다
        </div>

        <div
          className={twMerge(
            "pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center gap-2 bg-black/40 text-white transition-opacity",
            isIntermission ? "opacity-100" : "opacity-0"
          )}
        >
          <p className="text-3xl font-bold">다음 상품 준비 중</p>
          <p className="text-sm opacity-80">잠시만 기다려 주세요</p>
          <p className="mt-2 text-base font-semibold">남은 시간 {formatRemainingTime(remaingMs)}</p>
        </div>

        <div
          className={twMerge(
            "transition-opacity duration-300",
            (isClosed || isIntermission) && "opacity-40"
          )}
        >
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
        </div>
      </div>

      <div className="bg-bg-main border-border-sub2 shrink-0 border-t">
        <div className="border-border-sub2 bg-custom-brown/30 text-title-main-dark flex h-12 items-center justify-between border-[3px] px-6 text-sm">
          <span>접속자: {participants}명</span>
          <p className="text-sm">
            잔여 시간:{" "}
            <b>{remaingMs && !isIntermission ? formatRemainingTime(remaingMs) : "--:--"}</b>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 px-4 pt-4 pb-2 lg:grid-cols-[1.2fr_1fr_1.4fr] lg:items-center">
          <div className="flex justify-center lg:justify-start">
            <div className="border-border-sub2 shadow-flat-light flex w-full items-center rounded-sm border-2 bg-white px-4 py-2 text-sm">
              <span className="text-title-main mr-2">보유 Bizz</span>
              <BizzAmount amount={2300000} />
            </div>
          </div>

          <div className="flex justify-center">
            <BidButton
              disabled={isIntermission || isClosed}
              onClick={() => {
                if (isIntermission || isClosed) return;
                setIsConfirmOpen(true);
              }}
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="grid w-full grid-cols-3 gap-3">
              {bidSteps.map(step => (
                <button
                  key={step}
                  disabled={isIntermission || isClosed}
                  className={twMerge(
                    "border-border-sub2 h-12 w-full rounded-sm border-[3px] bg-[#8B2500] text-sm font-semibold text-white",
                    (isIntermission || isClosed) && "pointer-events-none opacity-40"
                  )}
                  onClick={() => setBidInput(prev => prev + step)}
                >
                  + {step.toLocaleString()}원
                </button>
              ))}
            </div>

            <PriceInput
              value={bidInput}
              onChange={setBidInput}
              placeholder={
                isIntermission ? "상품 대기중입니다" : isClosed ? "경매 종료" : "입찰 금액"
              }
            />

            <ConfirmModal
              isOpen={isConfirmOpen}
              title="입찰 확인"
              message={`정말 ${bidInput.toLocaleString()} Bizz으로 입찰하시겠습니까?`}
              confirmText="입찰"
              cancelText="취소"
              onConfirm={handleConfirm}
              onCancel={() => setIsConfirmOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

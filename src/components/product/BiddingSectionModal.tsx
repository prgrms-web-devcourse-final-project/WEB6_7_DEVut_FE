"use client";

import { useState } from "react";
import PriceInput from "../common/PriceInput";
import Button from "../common/Button";
import { ChevronDown } from "lucide-react";
import { ConfirmModal } from "../common/ComfirmModal";
import Toast from "../common/Toast";
import { getBidUnit } from "@/utils/auction";
import { useGetMyBizz } from "@/features/mypage/hooks/useMyBizz";

interface BiddingSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBid: number;
  onConfirmBid: (amount: BidDelayProductRequest) => void;
  isPending: boolean;
}

export const BiddingSectionModal = ({
  isOpen,
  onClose,
  currentBid,
  onConfirmBid,
  isPending,
}: BiddingSectionModalProps) => {
  const unit = getBidUnit(currentBid);
  const minBid = currentBid + unit;
  const [bidPrice, setBidPrice] = useState(minBid);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const notify = (message: string, type: ToastType) => Toast({ message, type });
  const { data: myBizz } = useGetMyBizz();

  const handleConfirm = () => {
    if (bidPrice < minBid) {
      notify(`최소 입찰가는 ${minBid.toLocaleString()}원입니다.`, "ERROR");
      setIsConfirmOpen(false);
      return;
    }

    if ((myBizz || 0) < bidPrice) {
      notify(`보유 Bizz가 부족합니다.`, "ERROR");
      setIsConfirmOpen(false);
      return;
    }

    onConfirmBid({ bidPrice });
    setIsConfirmOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="border-border-sub fixed inset-x-0 bottom-0 z-50 border-t bg-white px-6 pt-2 pb-8 shadow-lg">
      <div className="flex justify-center">
        <button
          className="flex cursor-pointer items-center justify-center text-gray-500 hover:text-gray-700"
          onClick={isPending ? undefined : onClose}
        >
          <ChevronDown size={24} />
        </button>
      </div>

      <div className="mx-auto max-w-[1440px] space-y-5">
        <h2 className="text-title-main text-lg">입찰하기</h2>

        <div className="space-y-1">
          <p className="text-title-sub2 text-sm">현재 최고가: {currentBid.toLocaleString()} Bizz</p>
          <p className="text-title-sub2 text-sm">호가 단위: {unit.toLocaleString()} Bizz</p>
        </div>

        <PriceInput
          placeholder="최고가 이상으로 입찰해주세요."
          onChange={setBidPrice}
          value={bidPrice}
        />

        <Button
          className="bg-custom-orange w-full cursor-pointer rounded py-2 text-white hover:scale-100 disabled:bg-gray-300"
          disabled={bidPrice < minBid || isPending}
          onClick={() => {
            setIsConfirmOpen(true);
          }}
        >
          {isPending ? "입찰 중..." : "입찰 확정"}
        </Button>

        <ConfirmModal
          isOpen={isConfirmOpen}
          title="입찰 확인"
          message={`정말 ${bidPrice.toLocaleString()} Bizz으로 입찰하시겠습니까?`}
          confirmText="입찰"
          cancelText="취소"
          onConfirm={handleConfirm}
          onCancel={() => setIsConfirmOpen(false)}
        />
      </div>
    </div>
  );
};

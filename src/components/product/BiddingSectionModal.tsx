"use client";

import { useState } from "react";
import PriceInput from "../common/PriceInput";
import Button from "../common/Button";
import { ChevronDown } from "lucide-react";
import { ConfirmModal } from "../common/ComfirmModal";

interface BiddingSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBid?: number;
  minBid?: number;
  onConfirmBid: (amount: number) => void;
}

export const BiddingSectionModal = ({
  isOpen,
  onClose,
  currentBid,
  minBid,
  onConfirmBid,
}: BiddingSectionModalProps) => {
  const [bidAmount, setBidAmount] = useState(minBid || 0);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleConfirmClick = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirm = () => {
    if (bidAmount < (minBid ?? 0)) return;
    onConfirmBid(bidAmount);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl bg-white px-6 pt-2 pb-8 shadow-lg">
      <div className="flex justify-center">
        <button
          className="flex cursor-pointer items-center justify-center p-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <ChevronDown size={24} />
        </button>
      </div>

      <div className="mx-auto max-w-[1440px] space-y-4">
        <h2 className="text-lg font-semibold">입찰하기</h2>

        {currentBid !== undefined && (
          <p className="text-sm text-gray-600">현재 최고가: {currentBid.toLocaleString()}원</p>
        )}

        <PriceInput
          placeholder="최고가 이상으로 입찰해주세요."
          onChange={setBidAmount}
          value={bidAmount}
        />

        {/* 갖고 있는 돈 보다 많으면 disable */}
        <Button
          className="bg-custom-orange w-full cursor-pointer rounded py-2 text-white hover:scale-100 disabled:bg-gray-300"
          disabled={bidAmount <= (minBid ?? 0)}
          onClick={handleConfirmClick}
        >
          입찰 확정
        </Button>

        <ConfirmModal
          isOpen={isConfirmOpen}
          title="입찰 확인"
          message={`정말 ${bidAmount} Bizz으로 입찰하시겠습니까?`}
          confirmText="입찰"
          cancelText="취소"
          onConfirm={handleConfirm}
          onCancel={() => setIsConfirmOpen(false)}
        />
      </div>
    </div>
  );
};

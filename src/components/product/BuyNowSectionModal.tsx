"use client";

import { useState } from "react";
import Button from "../common/Button";
import { ChevronDown } from "lucide-react";
import { ConfirmModal } from "../common/ComfirmModal";

interface BuyNowSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  price: number;
  onConfirmBid: () => void;
  isPending: boolean;
}

export const BuyNowSectionModal = ({
  isOpen,
  onClose,
  price,
  onConfirmBid,
  isPending,
}: BuyNowSectionModalProps) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleConfirm = () => {
    setIsConfirmOpen(false);
    onConfirmBid();
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
        <h2 className="text-title-main text-lg">즉시 구매</h2>

        <div className="space-y-1">
          <p className="text-title-sub2">즉시 구매가: {price.toLocaleString()} Bizz</p>
        </div>

        <Button
          className="bg-custom-orange w-full cursor-pointer rounded py-2 text-white hover:scale-100 disabled:bg-gray-300"
          disabled={isPending}
          onClick={() => {
            setIsConfirmOpen(true);
          }}
        >
          {isPending ? "구매 중..." : "구매 하기"}
        </Button>

        <ConfirmModal
          isOpen={isConfirmOpen}
          title="구매 확인"
          message={`정말 구매하시겠습니까?`}
          confirmText="구매"
          cancelText="취소"
          onConfirm={handleConfirm}
          onCancel={() => setIsConfirmOpen(false)}
        />
      </div>
    </div>
  );
};

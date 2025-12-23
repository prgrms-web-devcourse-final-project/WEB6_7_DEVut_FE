import Button from "../common/Button";
import Toast from "../common/Toast";
import { BiddingSectionModal } from "./BiddingSectionModal";

interface DelayedBidSectionProps {
  isOpen: boolean;
  modalToggle: (bool: boolean) => void;
  currentBid: number;
  user: User | null;
  sellerId: number | undefined;
  auctionStatus: AuctionStatus;
}

export default function DelayedBidSection({
  isOpen,
  modalToggle,
  currentBid,
  user,
  sellerId,
  auctionStatus,
}: DelayedBidSectionProps) {
  const onSale = auctionStatus === "BEFORE_BIDDING" || auctionStatus === "IN_PROGRESS";
  const notify = (message: string, type: ToastType) => Toast({ message, type });

  const handleModalOpen = () => {
    if (!onSale) return notify("마감 된 경매 상품 입니다.", "INFO");
    /* 테스트 이후 내 상품 disable 처리 */
    // if (user?.id === sellerId) return notify("내 상품은 입찰 할 수 없습니다.", "INFO");

    modalToggle(true);
  };

  return (
    <>
      <BiddingSectionModal
        isOpen={isOpen}
        onClose={() => modalToggle(false)}
        currentBid={currentBid}
        onConfirmBid={() => {}}
      />

      {/* 테스트 이후 내 상품 disable 처리 */}
      <Button className="bg-custom-brown flex-1 text-white" onClick={handleModalOpen}>
        {user?.id === sellerId ? "내 상품" : onSale ? "입찰하기" : "마감"}
      </Button>
    </>
  );
}

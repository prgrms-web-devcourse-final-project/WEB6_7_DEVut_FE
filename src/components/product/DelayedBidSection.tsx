import { useBidDelayProduct } from "@/features/auction/hooks/useBidDelayProduct";
import Button from "../common/Button";
import Toast from "../common/Toast";
import { BiddingSectionModal } from "./BiddingSectionModal";
import { ApiError } from "next/dist/server/api-utils";

interface DelayedBidSectionProps {
  productId: number;
  isOpen: boolean;
  modalToggle: (bool: boolean) => void;
  currentBid: number;
  user: User | null;
  sellerId: number | undefined;
  auctionStatus: AuctionStatus;
}

export default function DelayedBidSection({
  productId,
  isOpen,
  modalToggle,
  currentBid,
  user,
  sellerId,
  auctionStatus,
}: DelayedBidSectionProps) {
  const onSale = auctionStatus === "BEFORE_BIDDING" || auctionStatus === "IN_PROGRESS";
  const notify = (message: string, type: ToastType) => Toast({ message, type });

  const { mutate: bid, isPending } = useBidDelayProduct(productId);

  const handleConfirmBid = (bidPrice: BidDelayProductRequest) => {
    if (!onSale) return notify("마감 된 경매 상품 입니다.", "INFO");
    if (user?.id === sellerId) return notify("본인의 상품은 입찰 할 수 없습니다.", "INFO");

    bid(bidPrice, {
      onSuccess: () => {
        modalToggle(true);
        notify("입찰을 성공하였습니다!", "SUCCESS");
      },
      onError: error => {
        modalToggle(true);
        // notify(error.msg, "INFO");
      },
    });
  };

  return (
    <>
      <BiddingSectionModal
        isOpen={isOpen}
        onClose={() => modalToggle(false)}
        currentBid={currentBid}
        onConfirmBid={handleConfirmBid}
        isPending={isPending}
      />

      <Button
        className="bg-custom-brown flex-1 text-white"
        onClick={() => modalToggle(true)}
        disabled={isPending}
      >
        {user?.id === sellerId ? "내 상품" : onSale ? "입찰하기" : "마감"}
      </Button>
    </>
  );
}

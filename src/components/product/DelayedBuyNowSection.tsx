import Button from "../common/Button";
import Toast from "../common/Toast";
import { BuyNowSectionModal } from "./BuyNowSectionModal";
import { useBuyNowDelayProduct } from "@/features/auction/hooks/useBuyNowDelayProduct";

interface DelayedBuyNowSectionProps {
  productId: number;
  isOpen: boolean;
  modalToggle: (bool: boolean) => void;
  buyNowPrice: number;
  auctionStatus: AuctionStatus;
}

export default function DelayedBuyNowSection({
  productId,
  isOpen,
  modalToggle,
  buyNowPrice,
  auctionStatus,
}: DelayedBuyNowSectionProps) {
  const onSale = auctionStatus === "BEFORE_BIDDING" || auctionStatus === "IN_PROGRESS";
  const notify = (message: string, type: ToastType) => Toast({ message, type });

  const { mutate: buyNow, isPending } = useBuyNowDelayProduct(productId);

  const handleConfirmBid = () => {
    if (!onSale) return notify("마감 된 경매 상품 입니다.", "INFO");
    buyNow(undefined, {
      onSuccess: () => {
        modalToggle(false);
        notify("구매를 성공하였습니다!", "SUCCESS");
      },
      onError: (error: unknown) => {
        modalToggle(false);
        const { msg } = error as ResponseBase;
        notify(msg, "ERROR");
      },
    });
  };

  return (
    <>
      <BuyNowSectionModal
        isOpen={isOpen}
        onClose={() => modalToggle(false)}
        price={buyNowPrice}
        onConfirmBid={handleConfirmBid}
        isPending={isPending}
      />

      <Button
        className="bg-custom-dark-brown border-border-sub flex-1 text-white"
        onClick={() => modalToggle(true)}
        disabled={isPending}
      >
        {onSale ? "즉시 구매" : "마감"}
      </Button>
    </>
  );
}

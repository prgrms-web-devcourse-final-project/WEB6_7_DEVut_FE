import { useBidDelayProduct } from "@/features/auction/hooks/useBidDelayProduct";
import Button from "../common/Button";
import Toast from "../common/Toast";
import { BiddingSectionModal } from "./BiddingSectionModal";

interface DelayedBidSectionProps {
  me: User | null;
  productId: number;
  isOpen: boolean;
  modalToggle: (bool: boolean) => void;
  currentBid: number;
}

export default function DelayedBidSection({
  me,
  productId,
  isOpen,
  modalToggle,
  currentBid,
}: DelayedBidSectionProps) {
  const notify = (message: string, type: ToastType) => Toast({ message, type });

  const { mutate: bid, isPending } = useBidDelayProduct(productId);

  const handleConfirmBid = (bidPrice: BidDelayProductRequest) => {
    if (!me) {
      notify("로그인을 해주세요!", "ERROR");
      modalToggle(false);
      return;
    }

    bid(bidPrice, {
      onSuccess: () => {
        modalToggle(false);
        notify("입찰을 성공하였습니다!", "SUCCESS");
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
        입찰하기
      </Button>
    </>
  );
}

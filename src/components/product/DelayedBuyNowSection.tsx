import { useGetMyBizz } from "@/features/mypage/hooks/useMyBizz";
import Button from "../common/Button";
import Toast from "../common/Toast";
import { BuyNowSectionModal } from "./BuyNowSectionModal";
import { useBuyNowDelayProduct } from "@/features/auction/hooks/useBuyNowDelayProduct";

interface DelayedBuyNowSectionProps {
  me: User | null;
  productId: number;
  isOpen: boolean;
  modalToggle: (bool: boolean) => void;
  buyNowPrice: number;
}

export default function DelayedBuyNowSection({
  me,
  productId,
  isOpen,
  modalToggle,
  buyNowPrice,
}: DelayedBuyNowSectionProps) {
  const notify = (message: string, type: ToastType) => Toast({ message, type });

  const { mutate: buyNow, isPending } = useBuyNowDelayProduct(productId);
  const { data: myBizz } = useGetMyBizz();

  const handleConfirmBid = () => {
    if (!me) {
      notify("로그인을 해주세요!", "ERROR");
      modalToggle(false);
      return;
    }

    if ((myBizz || 0) < buyNowPrice) {
      notify("보유 Bizz가 부족합니다!", "ERROR");
      modalToggle(false);
      return;
    }

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
        즉시 구매
      </Button>
    </>
  );
}

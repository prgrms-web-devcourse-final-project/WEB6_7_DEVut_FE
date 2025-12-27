import Button from "@/components/common/Button";
import Toast from "@/components/common/Toast";
import { useCreatePayments } from "@/features/payments/hooks/useCreatePayments";

export default function TossPaymentButton({
  amount,
  user,
  onClick,
}: {
  amount: number;
  user: User | null | undefined;
  onClick: () => void;
}) {
  const createPayments = useCreatePayments();

  const notify = (message: string, type: ToastType) => Toast({ message, type });

  const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;

  const requestPayment = async () => {
    const customerKey = `user_${user?.id}`;

    if (!amount || amount <= 0) {
      notify("금액을 입력해 주세요.", "INFO");
      return;
    }

    if (typeof window === "undefined" || !window.TossPayments) {
      notify("결제 모듈이 아직 로드되지 않았어요", "INFO");
      return;
    }

    createPayments.mutate(
      {
        amount,
      },
      {
        onSuccess: async res => {
          const { orderId, orderName, amount } = res;
          const tossPayments = window.TossPayments(clientKey);
          const payment = tossPayments.payment({ customerKey });

          await payment.requestPayment({
            method: "CARD",
            amount: {
              currency: "KRW",
              value: amount,
            },
            orderId,
            orderName,
            successUrl: `${window.location.origin}/payments/success`,
            failUrl: `${window.location.origin}/mypage/bizz`,
            customerEmail: user?.email,
            customerName: user?.nickname,
            card: {
              useEscrow: false,
              flowMode: "DEFAULT",
              useCardPoint: false,
              useAppCardOnly: false,
            },
          });
        },
        onError: () => {
          notify("결제 생성에 실패했습니다.", "ERROR");
        },
      }
    );
  };
  return (
    <>
      <div className="flex flex-row gap-3">
        <Button className="bg-custom-blue h-9 w-full text-white md:w-22" onClick={requestPayment}>
          충전
        </Button>

        <Button className="bg-custom-red h-9 w-full text-white md:w-22" onClick={onClick}>
          출금
        </Button>
      </div>
    </>
  );
}

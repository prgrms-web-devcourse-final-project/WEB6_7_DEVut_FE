"use client";

import BizzAmount from "@/components/common/BizzAmount";
import Button from "@/components/common/Button";
import ContentContainer from "@/components/common/ContentContainer";
import Input from "@/components/common/Input";
import Toast from "@/components/common/Toast";
import { useCreatePayments } from "@/features/payments/hooks/useCreatePayments";
import { useState } from "react";

export default function BizzBalance() {
  const createPayments = useCreatePayments();

  const [chargeBizz, setChargeBizz] = useState<number>(0);

  const notify = (message: string, type: ToastType) => Toast({ message, type });

  const clientKey = "test_ck_AQ92ymxN34P6P4zXmxgp3ajRKXvd";
  const customerKey = "C_Esl7hfoPvxwHUqM4emG";

  const requestPayment = async () => {
    if (chargeBizz <= 0) {
      notify("금액을 입력해 주세요.", "INFO");
      return;
    }

    // ⛔ SDK 로드 안 됐을 때 방어
    if (typeof window === "undefined" || !window.TossPayments) {
      alert("결제 모듈이 아직 로드되지 않았어요");
      return;
    }

    createPayments.mutate(
      {
        amount: chargeBizz,
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
              value: amount, // ✅ 서버 기준
            },
            orderId, // ✅ 서버에서 받은 값
            orderName,
            successUrl: `${window.location.origin}/payments/success`,
            failUrl: `${window.location.origin}/payments/fail`,
            customerEmail: "customer123@gmail.com",
            customerName: "김토스",
            customerMobilePhone: "01012341234",
            // 카드 결제에 필요한 정보
            card: {
              useEscrow: false,
              flowMode: "DEFAULT", // 통합결제창 여는 옵션
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
    <ContentContainer
      bordered={false}
      className="mt-4 flex min-h-[200px] flex-col justify-between gap-5 pt-4"
    >
      {/* 잔액 영역 */}
      <div className="text-title-main flex w-full max-w-[520px] flex-col gap-2">
        <span className="text-2xl font-bold">잔액</span>

        {/* 👇 안쪽 카드 더 줄임 */}
        <ContentContainer className="border-border-sub/20 shadow-flat-light flex min-h-[120px] items-center px-4 py-3">
          <BizzAmount amount={123456789} fontSize="xl" iconSize="xl" />
        </ContentContainer>
      </div>

      {/* 버튼 영역 */}
      <div className="flex w-full max-w-[520px] flex-col justify-end gap-3 md:flex-row md:px-3">
        <Input
          placeholder="충전 또는 출금할 금액 입력"
          value={chargeBizz}
          type="number"
          onChange={e => setChargeBizz(Number(e.target.value))}
          className="h-9 md:w-full"
        ></Input>
        <div className="flex flex-row gap-3">
          <Button className="bg-custom-blue h-9 w-full text-white md:w-22" onClick={requestPayment}>
            충전
          </Button>
          <Button className="bg-custom-red h-9 w-full text-white md:w-22">출금</Button>
        </div>
      </div>
    </ContentContainer>
  );
}

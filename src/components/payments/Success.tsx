"use client";

import { useApprovePayments } from "@/features/payments/hooks/useApprovePayments";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

export default function Success() {
  const params = useSearchParams();
  const router = useRouter();
  const approvePayments = useApprovePayments();

  const paymentKey = params.get("paymentKey");
  const orderId = params.get("orderId");
  const amount = Number(params.get("amount"));

  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    if (!paymentKey || !orderId || !Number.isFinite(amount)) {
      router.push("/mypage/bizz");
      return;
    }

    approvePayments.mutate({ paymentKey, orderId, amount });
  }, [paymentKey, orderId, amount, approvePayments, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-lg font-semibold">결제 승인 처리 중입니다...</p>
    </div>
  );
}

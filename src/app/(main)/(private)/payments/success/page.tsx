import Success from "@/components/payments/Success";
import { Suspense } from "react";

export default function PaymentsSuccessPage() {
  return (
    <>
      <Suspense fallback={null}>
        <Success />
      </Suspense>
    </>
  );
}

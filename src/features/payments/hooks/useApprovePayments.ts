import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approvePayments } from "../api/Payments.api";
import Toast from "@/components/common/Toast";
import { useRouter } from "next/navigation";

export const useApprovePayments = () => {
  const qc = useQueryClient();
  const router = useRouter();
  return useMutation<ApprovePaymentsResponse, Error, ApprovePaymentsRequest>({
    mutationFn: approvePayments,

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["me"] });
      Toast({ message: "결제를 완료하였습니다.", type: "SUCCESS" });

      router.push("/mypage/bizz");
    },
    onError: () => {
      Toast({ message: "결제에 실패하였습니다.", type: "ERROR" });
      window.location.href = "/mypage/bizz";
    },
  });
};

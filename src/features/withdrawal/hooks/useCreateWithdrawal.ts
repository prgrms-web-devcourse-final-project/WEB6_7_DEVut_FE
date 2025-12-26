import { useMutation } from "@tanstack/react-query";
import { createWithdrawal } from "../api/withdrawal.api";

export const useCreateWithdrawal = () => {
  return useMutation<CreateWithdrawalResponse, Error, CreateWithdrawalRequest>({
    mutationFn: createWithdrawal,
  });
};

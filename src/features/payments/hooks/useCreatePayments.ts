import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPayments } from "../api/Payments.api";

export const useCreatePayments = () => {
  const qc = useQueryClient();

  return useMutation<CreatePaymentsResponse, Error, CreatePaymentsRequest>({
    mutationFn: createPayments,
  });
};

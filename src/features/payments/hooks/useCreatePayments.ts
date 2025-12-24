import { useMutation } from "@tanstack/react-query";
import { createPayments } from "../api/Payments.api";

export const useCreatePayments = () => {
  return useMutation<CreatePaymentsResponse, Error, CreatePaymentsRequest>({
    mutationFn: createPayments,
  });
};

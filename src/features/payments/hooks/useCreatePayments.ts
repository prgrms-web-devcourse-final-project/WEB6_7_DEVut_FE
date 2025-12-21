import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPayments } from "../api/createPayments";

export const useCreatePayments = () => {
  const qc = useQueryClient();

  return useMutation<CreatePaymentsResponse, Error, CreatePaymentsRequest>({
    mutationFn: createPayments,
  });
};

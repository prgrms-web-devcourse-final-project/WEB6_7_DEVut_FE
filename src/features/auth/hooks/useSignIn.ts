import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api/login.api";

export function useSignIn() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["me"] });
      await qc.refetchQueries({ queryKey: ["me"] });
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { socialLogin } from "../api/socialLogin.api";

export function useSocialLogin() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: socialLogin,
    onSuccess: async () => {
      qc.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

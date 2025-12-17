import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signout } from "../api/auth.api";

export function useSignOut() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: signout,
    onSuccess: () => {
      // me 캐시를 비워서 즉시 비로그인 상태로
      qc.removeQueries({ queryKey: ["me"] });
    },
  });
}

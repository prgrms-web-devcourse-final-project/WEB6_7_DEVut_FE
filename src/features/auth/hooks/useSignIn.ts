import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signin } from "../api/auth.api";

export function useSignIn() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: signin,
    onSuccess: async () => {
      // 로그인 성공하면 me를 다시 받아오게 해서 화면 갱신
      await qc.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

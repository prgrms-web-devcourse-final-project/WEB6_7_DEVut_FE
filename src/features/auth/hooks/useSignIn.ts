import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signin } from "../api/auth.api";
import { useAuthStore } from "../model/auth.store";

export function useSignIn() {
  const qc = useQueryClient();
  const setUser = useAuthStore(s => s.setUser);
  const setHydrated = useAuthStore(s => s.setHydrated);

  return useMutation({
    mutationFn: signin,
    onSuccess: async res => {
      const user = res.data.userInfo ?? null;
      if (user) setUser(user);

      // 로그인 성공하면 me를 다시 받아오게 해서 화면 갱신
      await qc.invalidateQueries({ queryKey: ["me"] });

      setHydrated(true);
    },
  });
}

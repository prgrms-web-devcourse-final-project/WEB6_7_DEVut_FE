import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api/login.api";
// import { useAuthStore } from "../model/auth.store";
import { getMe } from "../api/auth.api"; // 또는 /me 호출 함수

export function useSignIn() {
  const qc = useQueryClient();
  // const setUser = useAuthStore(s => s.setUser);
  // const setHydrated = useAuthStore(s => s.setHydrated);

  return useMutation({
    mutationFn: login,
    // onSuccess: async () => {
    // const meRes = await qc.fetchQuery({
    //   queryKey: ["me"],
    //   queryFn: getMe,
    // });
    // setUser(meRes);
    // setHydrated(true);
    // },
    // onError: () => {
    // setHydrated(true);
    // },
  });
}

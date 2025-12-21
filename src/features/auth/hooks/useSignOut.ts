import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api/logout.api";

export function useSignOut() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      qc.setQueryData(["me"], null);
    },
  });
}

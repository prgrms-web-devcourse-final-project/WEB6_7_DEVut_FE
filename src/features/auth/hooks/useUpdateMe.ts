import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "../api/auth.api";

export function useUpdateMe() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: updateMe,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

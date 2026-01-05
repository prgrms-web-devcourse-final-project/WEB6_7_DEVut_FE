import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNotify } from "../api/notify.client.api";

export const useDeleteNotify = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteNotify(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });
};

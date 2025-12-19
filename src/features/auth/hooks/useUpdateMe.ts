import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "../api/updateMe.api";
import Toast from "@/components/common/Toast";

export function useUpdateMe() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: updateMe,

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["me"] });
      Toast({ message: "회원정보가 수정되었습니다.", type: "SUCCESS" });
    },
    onError: error => {
      const message = error instanceof Error ? error.message : "서버 오류가 발생했습니다.";
      console.log(message);
      Toast({ message, type: "ERROR" });
    },
  });
}

import { useMutation } from "@tanstack/react-query";
import { updateMe } from "../api/updateMe.api";
import Toast from "@/components/common/Toast";

export function useUpdateMe() {
  return useMutation({
    mutationFn: updateMe,

    onSuccess: res => {
      if (res.resultCode !== "200") {
        Toast({ message: res.msg, type: "ERROR" });
        return;
      }
      Toast({ message: "회원정보가 수정되었습니다.", type: "SUCCESS" });
    },
    onError: () => {
      Toast({ message: "서버 오류가 발생했습니다.", type: "ERROR" });
    },
  });
}

import { useQuery } from "@tanstack/react-query";
import { myWish } from "../api/MyPage.api";

export function useMyWish() {
  return useQuery({
    queryKey: ["my-wish"],
    queryFn: myWish,
  });
}

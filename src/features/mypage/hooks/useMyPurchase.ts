import { useQuery } from "@tanstack/react-query";
import { myPurchase } from "../api/MyPage.api";

export function useMyPurchase() {
  return useQuery({
    queryKey: ["my-purchase"],
    queryFn: myPurchase,
  });
}

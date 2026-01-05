import { useQuery } from "@tanstack/react-query";
import { myPurchase } from "../api/MyPage.client.api";

export function useMyPurchase() {
  return useQuery({
    queryKey: ["my-purchase"],
    queryFn: myPurchase,
  });
}

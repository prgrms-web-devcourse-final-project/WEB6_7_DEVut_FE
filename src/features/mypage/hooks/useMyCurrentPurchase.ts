import { useQuery } from "@tanstack/react-query";
import { myCurrentPurchase } from "../api/MyPage.api";

export function useMyCurrentPurchase(options?: { initialData: ProductCardType[] | undefined }) {
  return useQuery({
    queryKey: ["my-current-purchase"],
    queryFn: myCurrentPurchase,
    initialData: options?.initialData,
  });
}

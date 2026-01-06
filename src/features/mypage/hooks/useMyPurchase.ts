import { useQuery } from "@tanstack/react-query";
import { myPurchase } from "../api/MyPage.api";

export function useMyPurchase(options?: { initialData: ProductCardType[] | undefined }) {
  return useQuery({
    queryKey: ["my-purchase"],
    queryFn: myPurchase,
    initialData: options?.initialData,
  });
}

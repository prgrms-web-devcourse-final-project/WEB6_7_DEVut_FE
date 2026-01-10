import { useQuery } from "@tanstack/react-query";
import { mySell } from "../api/MyPage.client.api";

export function useMySell(options?: { initialData?: ProductCardType[] }) {
  return useQuery<ProductCardType[]>({
    queryKey: ["my-sell"],
    queryFn: mySell,
    initialData: options?.initialData,
  });
}

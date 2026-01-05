import { useQuery } from "@tanstack/react-query";
import { myWish } from "../api/MyPage.client.api";

export function useMyWish(options?: { initialData: ProductCardType[] | undefined }) {
  return useQuery({
    queryKey: ["my-wish"],
    queryFn: myWish,
    initialData: options?.initialData,
  });
}

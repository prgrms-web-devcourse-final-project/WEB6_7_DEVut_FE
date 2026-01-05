import { useMutation, useQueryClient } from "@tanstack/react-query";
import { delayedWishToggle, liveWishToggle } from "../api/wishToggle.api";

type ProductCard = {
  uid: string;
  id: number;
  isWish?: boolean;
};

type ProductsResponse = {
  products: ProductCard[];
  totalCount: number;
};

export const useWishToggle = () => {
  const qc = useQueryClient();

  return useMutation<boolean, Error, { id: number; type: "LIVE" | "DELAYED" }>({
    mutationFn: ({ id, type }) =>
      type === "LIVE" ? liveWishToggle({ id }) : delayedWishToggle({ id }),

    onMutate: async ({ id, type }) => {
      const uid = `${type}-${id}`;

      await qc.cancelQueries();

      qc.setQueriesData(
        {
          predicate: q =>
            Array.isArray(q.queryKey) &&
            ["delayedProducts", "liveProducts", "my-sell", "my-purchase"].includes(
              q.queryKey[0] as string
            ),
        },
        (old: unknown) => {
          // 1️⃣ 배열
          if (Array.isArray(old)) {
            return old.map(item => (item.uid === uid ? { ...item, isWish: !item.isWish } : item));
          }

          // 2️⃣ { items: [] }
          if (old && typeof old === "object" && "items" in old) {
            const list = old as { items: ProductCard[] };
            return {
              ...list,
              items: list.items.map(item =>
                item.uid === uid ? { ...item, isWish: !item.isWish } : item
              ),
            };
          }

          // 3️⃣ 🔥 { products: [] } (지연 경매 / 검색 페이지)
          if (old && typeof old === "object" && "products" in old) {
            const res = old as ProductsResponse;
            return {
              ...res,
              products: res.products.map(item =>
                item.uid === uid ? { ...item, isWish: !item.isWish } : item
              ),
            };
          }

          return old;
        }
      );
    },

    onSuccess: () => {
      // 찜 목록은 서버 기준으로 동기화
      qc.invalidateQueries({ queryKey: ["my-wish"] });
    },
  });
};

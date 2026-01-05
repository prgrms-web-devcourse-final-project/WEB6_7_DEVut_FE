import { useMutation, useQueryClient } from "@tanstack/react-query";
import { delayedWishToggle, liveWishToggle } from "../api/wishToggle.api";

type ProductCard = {
  id: number;
  isWish?: boolean;
};

export const useWishToggle = () => {
  const qc = useQueryClient();

  return useMutation<boolean, Error, { id: number; type: "LIVE" | "DELAYED" }>({
    mutationFn: ({ id, type }) =>
      type === "LIVE" ? liveWishToggle({ id }) : delayedWishToggle({ id }),

    /** 1️⃣ Optimistic update: 일반 리스트 */
    onMutate: async ({ id }) => {
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
          if (!Array.isArray(old)) return old;

          return old.map((item: ProductCard) =>
            item.id === id ? { ...item, isWish: !item.isWish } : item
          );
        }
      );
    },

    /** 2️⃣ 서버 응답 기준으로 확정 + my-wish 처리 */
    onSuccess: (isWish, { id }) => {
      // 일반 리스트는 즉시 반영
      qc.setQueriesData(
        {
          predicate: q =>
            Array.isArray(q.queryKey) &&
            ["delayedProducts", "liveProducts", "my-sell", "my-purchase"].includes(
              q.queryKey[0] as string
            ),
        },
        (old: unknown) => {
          if (!Array.isArray(old)) return old;
          return old.map(item => (item.id === id ? { ...item, isWish } : item));
        }
      );

      // ✅ my-wish는 서버 기준으로 다시 가져오기
      qc.invalidateQueries({ queryKey: ["my-wish"] });
    },
  });
};

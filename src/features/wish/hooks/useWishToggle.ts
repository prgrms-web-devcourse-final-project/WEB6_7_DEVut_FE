import { useMutation, useQueryClient } from "@tanstack/react-query";
import { delayedWishToggle, liveWishToggle } from "../api/wishToggle.api";

type WishableItem = {
  id: number;
  type: "LIVE" | "DELAYED";
  isWish?: boolean;
};

type ProductCard = WishableItem & {
  uid: string;
};

const TARGET_KEYS = ["delayedProducts", "liveProducts", "my-sell", "my-purchase"];

// 🔹 공통 updater
const toggleWishUpdater = (id: number, type: "LIVE" | "DELAYED") => (old: unknown) => {
  const match = (item: WishableItem) => item.id === id && item.type === type;

  if (Array.isArray(old)) {
    return old.map(item => (match(item) ? { ...item, isWish: !item.isWish } : item));
  }

  if (old && typeof old === "object" && "items" in old) {
    const list = old as { items: ProductCard[] };
    return {
      ...list,
      items: list.items.map(item => (match(item) ? { ...item, isWish: !item.isWish } : item)),
    };
  }

  if (old && typeof old === "object" && "products" in old) {
    const res = old as { products: ProductCard[]; totalCount: number };
    return {
      ...res,
      products: res.products.map(item => (match(item) ? { ...item, isWish: !item.isWish } : item)),
    };
  }

  return old;
};

export const useWishToggle = () => {
  const qc = useQueryClient();

  return useMutation<boolean, Error, { id: number; type: "LIVE" | "DELAYED" }>({
    mutationFn: ({ id, type }) =>
      type === "LIVE" ? liveWishToggle({ id }) : delayedWishToggle({ id }),

    onMutate: async ({ id, type }) => {
      await qc.cancelQueries({
        predicate: q => Array.isArray(q.queryKey) && TARGET_KEYS.includes(q.queryKey[0] as string),
      });

      qc.setQueriesData(
        {
          predicate: q =>
            Array.isArray(q.queryKey) && TARGET_KEYS.includes(q.queryKey[0] as string),
        },
        toggleWishUpdater(id, type)
      );
    },

    onSuccess: () => {
      // 찜 목록은 서버 기준으로만 동기화
      qc.invalidateQueries({ queryKey: ["my-wish"] });
    },
  });
};

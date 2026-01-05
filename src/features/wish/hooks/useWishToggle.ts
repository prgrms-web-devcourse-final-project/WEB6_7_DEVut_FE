import { useMutation, useQueryClient } from "@tanstack/react-query";
import { delayedWishToggle, liveWishToggle } from "../api/wishToggle.api";

type WishableItem = {
  id: number;
  isWish?: boolean;
};

type WishableList<T> = {
  items: T[];
};

export const useWishToggle = () => {
  const qc = useQueryClient();

  return useMutation<boolean, Error, { id: number; type: "LIVE" | "DELAYED" }>({
    mutationFn: ({ id, type }) =>
      type === "LIVE" ? liveWishToggle({ id }) : delayedWishToggle({ id }),

    onMutate: async ({ id }) => {
      await qc.cancelQueries();

      qc.setQueriesData(
        {
          predicate: q =>
            Array.isArray(q.queryKey) &&
            ["my-sell", "my-purchase", "my-wish", "delayedProducts", "liveProducts"].includes(
              q.queryKey[0] as string
            ),
        },
        (old: unknown) => {
          if (Array.isArray(old)) {
            return old.map(item => (item.id === id ? { ...item, isWish: !item.isWish } : item));
          }

          if (old && typeof old === "object" && "items" in old) {
            const list = old as WishableList<WishableItem>;
            return {
              ...list,
              items: list.items.map(item =>
                item.id === id ? { ...item, isWish: !item.isWish } : item
              ),
            };
          }

          return old;
        }
      );
    },

    onSuccess: (isWish, { id }) => {
      qc.setQueriesData(
        {
          predicate: q =>
            Array.isArray(q.queryKey) &&
            ["my-sell", "my-purchase", "my-wish", "delayedProducts", "liveProducts"].includes(
              q.queryKey[0] as string
            ),
        },
        (old: unknown) => {
          if (Array.isArray(old)) {
            return old.map(item => (item.id === id ? { ...item, isWish } : item));
          }

          if (old && typeof old === "object" && "items" in old) {
            const list = old as WishableList<WishableItem>;

            return {
              ...list,
              items: list.items.map(item => (item.id === id ? { ...item, isWish } : item)),
            };
          }

          return old;
        }
      );
    },
  });
};

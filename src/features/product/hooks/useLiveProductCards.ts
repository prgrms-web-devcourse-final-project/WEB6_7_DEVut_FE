import { useLiveProducts } from "./useLiveProducts";
import { GetLiveProductsParams } from "../api/liveProduct.api";
import { mapLiveProductToCard } from "../mapper/productCard";

export function useLiveProductCards(params: GetLiveProductsParams) {
  const query = useLiveProducts(params);

  const cards = query.data ? query.data.liveItems.map(mapLiveProductToCard) : [];

  return {
    ...query,
    cards,
  };
}

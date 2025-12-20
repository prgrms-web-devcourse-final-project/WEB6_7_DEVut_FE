import { useQuery } from "@tanstack/react-query";
import { getDelayProduct, getLiveProduct } from "../api/product.client.api";

const useLiveProductDetail = (productId: number, initialData: LiveProductDetail) =>
  useQuery({
    queryKey: ["liveProductDetail", productId],
    queryFn: () => getLiveProduct(productId),
    initialData,
    enabled: !!productId,
  });

const useDelayProductDetail = (productId: number, initialData: DelayProductDetail) =>
  useQuery({
    queryKey: ["delayProductDetail", productId],
    queryFn: () => getDelayProduct(productId),
    initialData,
    enabled: !!productId,
  });

export const useProductDetail = (product: ProductDetail) => {
  const liveQuery = useLiveProductDetail(product.id, product as LiveProductDetail);
  const delayQuery = useDelayProductDetail(product.id, product as DelayProductDetail);

  return product.type === "LIVE" ? liveQuery : delayQuery;
};

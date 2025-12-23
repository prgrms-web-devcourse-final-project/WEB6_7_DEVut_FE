import { useQuery } from "@tanstack/react-query";
import { getDelayProduct, getLiveProduct } from "../api/product.client.api";

const useLiveProductDetail = (productId: number, initialData?: LiveProductDetail, enabled = true) =>
  useQuery({
    queryKey: ["live-product", productId],
    queryFn: () => getLiveProduct(productId),
    initialData,
    enabled,
    staleTime: 0,
    refetchOnMount: true,
  });

const useDelayProductDetail = (
  productId: number,
  initialData?: DelayProductDetail,
  enabled = true
) =>
  useQuery({
    queryKey: ["delay-product", productId],
    queryFn: () => getDelayProduct(productId),
    initialData,
    enabled,
    staleTime: 0,
    refetchOnMount: true,
  });

export const useProductDetail = (initialProduct: ProductDetail) => {
  const isLive = initialProduct.type === "LIVE";

  const liveQuery = useLiveProductDetail(
    initialProduct.id,
    isLive ? (initialProduct as LiveProductDetail) : undefined,
    isLive
  );

  const delayQuery = useDelayProductDetail(
    initialProduct.id,
    !isLive ? (initialProduct as DelayProductDetail) : undefined,
    !isLive
  );

  return isLive ? liveQuery : delayQuery;
};

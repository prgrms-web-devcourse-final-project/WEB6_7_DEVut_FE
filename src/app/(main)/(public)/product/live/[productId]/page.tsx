import ProductInfo from "@/components/product/ProductInfo";
import { getLiveProduct } from "@/features/product/api/product.server.api";

export default async function LiveProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const initialLiveProduct = await getLiveProduct(Number(productId));

  return <ProductInfo initialProduct={initialLiveProduct} />;
}

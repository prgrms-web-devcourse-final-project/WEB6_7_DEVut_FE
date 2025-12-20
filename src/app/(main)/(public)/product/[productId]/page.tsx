import ProductInfo from "@/components/product/ProductInfo";
import { getDelayProduct } from "@/features/product/api/product.server.api";

export default async function DelayProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const initialDelayProduct = await getDelayProduct(Number(productId));

  return <ProductInfo product={initialDelayProduct} />;
}

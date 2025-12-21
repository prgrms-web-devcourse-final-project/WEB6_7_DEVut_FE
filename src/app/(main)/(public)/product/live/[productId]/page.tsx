import ProductInfo from "@/components/product/ProductInfo";
import { getMeServer } from "@/features/auth/api/auth.server.api";
import { getLiveProduct } from "@/features/product/api/product.server.api";

export default async function LiveProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const initialLiveProduct = await getLiveProduct(Number(productId));
  const me = await getMeServer();

  return <ProductInfo initialProduct={initialLiveProduct} me={me} />;
}

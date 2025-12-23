import ProductModifyForm from "@/components/productModify/ProductModifyForm";
import { getDelayProduct } from "@/features/product/api/product.server.api";

export default async function DelayModifyPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const delayProduct = await getDelayProduct(Number(productId));

  return <ProductModifyForm product={delayProduct} />;
}

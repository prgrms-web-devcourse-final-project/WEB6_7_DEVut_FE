import ProductModifyForm from "@/components/productModify/ProductModifyForm";
import { getLiveProduct } from "@/features/product/api/product.server.api";

export default async function LiveModifyPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const liveProduct = await getLiveProduct(Number(productId));
  return <ProductModifyForm product={liveProduct} />;
}

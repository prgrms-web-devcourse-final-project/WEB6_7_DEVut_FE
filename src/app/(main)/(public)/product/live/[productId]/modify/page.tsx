import ProductModifyForm from "@/components/productModify/ProductModifyForm";
import { getLiveProduct } from "@/features/product/api/product.server.api";

export default async function LiveModifyPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const delayProduct = await getLiveProduct(Number(productId));
  return (
    <div className="mx-auto mt-6 h-fit w-[90%]">
      <ProductModifyForm product={delayProduct} />
    </div>
  );
}

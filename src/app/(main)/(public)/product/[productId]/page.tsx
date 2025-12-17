import ProductInfo from "@/components/product/ProductInfo";

export default async function DelayProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  return <ProductInfo productId={productId} />;
}

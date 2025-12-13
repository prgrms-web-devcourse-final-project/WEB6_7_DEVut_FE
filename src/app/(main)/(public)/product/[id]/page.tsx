import ProductInfo from "@/components/product/ProductInfo";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <ProductInfo productId={id} />;
}

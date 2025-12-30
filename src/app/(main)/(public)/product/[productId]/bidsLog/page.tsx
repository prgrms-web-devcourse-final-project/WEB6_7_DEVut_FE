import BidsLog from "@/components/product/BidsLog";
import { getProductBidsLog } from "@/features/product/api/product.server.api";

export default async function BidsPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  const log = await getProductBidsLog(Number(productId));

  return (
    <div className="mx-auto mt-6 h-fit w-[90%]">
      <BidsLog log={log} />
    </div>
  );
}

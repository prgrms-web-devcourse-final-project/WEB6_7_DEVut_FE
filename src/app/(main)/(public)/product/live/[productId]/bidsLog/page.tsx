import BidsLog from "@/components/product/BidsLog";
import { productBidsLogMock } from "@/features/product/mock/product.bidsLog.mock";

export default function BidsPage() {
  return (
    <div className="mx-auto mt-6 h-fit w-[90%]">
      <BidsLog log={productBidsLogMock}/>
    </div>
  );
}

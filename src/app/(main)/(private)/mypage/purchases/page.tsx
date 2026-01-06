import ContentContainer from "@/components/common/ContentContainer";
import BidList from "@/components/mypage/purchases/BidList";
import PurchaseDetail from "@/components/mypage/purchases/PurchaseDetail";
import {
  getCurrentPurchaseProducts,
  getPurchaseProducts,
} from "@/features/mypage/api/myPagePurchase.server.api";

export default async function PurchasesPage() {
  const data = await getPurchaseProducts();
  const currentData = await getCurrentPurchaseProducts();
  console.log("currentData:", currentData);
  return (
    <ContentContainer bordered={false} className="pt-5">
      <BidList initialData={currentData} />
      <PurchaseDetail initialData={data} />
    </ContentContainer>
  );
}

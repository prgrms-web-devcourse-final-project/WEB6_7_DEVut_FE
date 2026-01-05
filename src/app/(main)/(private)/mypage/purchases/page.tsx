import ContentContainer from "@/components/common/ContentContainer";
import BidList from "@/components/mypage/purchases/BidList";
import PurchaseDetail from "@/components/mypage/purchases/PurchaseDetail";
import { getPurchaseProducts } from "@/features/mypage/api/myPagePurchase.server.api";

export default async function PurchasesPage() {
  const data = await getPurchaseProducts();
  console.log("data:", data);
  return (
    <ContentContainer bordered={false} className="pt-5">
      <BidList />
      <PurchaseDetail initialData={data} />
    </ContentContainer>
  );
}

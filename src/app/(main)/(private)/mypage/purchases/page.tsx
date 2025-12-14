import ContentContainer from "@/components/common/ContentContainer";
import BidList from "@/components/mypage/purchases/BidList";
import PurchaseDetail from "@/components/mypage/purchases/PurchaseDetail";

export default function PurchasesPage() {
  return (
    <ContentContainer bordered={false} className="pt-5">
      <BidList />
      <PurchaseDetail />
    </ContentContainer>
  );
}

import ContentContainer from "@/components/common/ContentContainer";
import SaleDetail from "@/components/mypage/sales/SaleDetail";
import SaleList from "@/components/mypage/sales/SaleList";

export default function SalesPage() {
  return (
    <ContentContainer bordered={false} className="pt-5">
      <SaleList />
      <SaleDetail />
    </ContentContainer>
  );
}

import ContentContainer from "@/components/common/ContentContainer";
import SaleDetail from "@/components/mypage/sales/SaleDetail";
import SaleList from "@/components/mypage/sales/SaleList";
import { getSellProducts } from "@/features/mypage/api/myPage.server.api";

export default async function SalesPage() {
  const data = await getSellProducts();
  return (
    <ContentContainer bordered={false} className="pt-5">
      <SaleList initialData={data} />
      <SaleDetail initialData={data} />
    </ContentContainer>
  );
}

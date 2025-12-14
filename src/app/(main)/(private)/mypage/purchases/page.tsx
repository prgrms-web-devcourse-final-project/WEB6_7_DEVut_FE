import ContentContainer from "@/components/common/ContentContainer";
import BidList from "@/components/mypage/purchases/BidList";

export default function PurchasesPage() {
  return (
    <ContentContainer bordered={false} className="pt-5">
      <div>
        {/* <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
            <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
            <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
            <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
          </div> */}
        <BidList />
      </div>
    </ContentContainer>
  );
}

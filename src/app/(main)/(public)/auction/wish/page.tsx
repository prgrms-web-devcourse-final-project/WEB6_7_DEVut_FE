import ContentContainer from "@/components/common/ContentContainer";
import Pagenation from "@/components/common/Pagenation";
import ProductCard from "@/components/common/ProductCard";

export default function AuctionWishPage() {
  return (
    <ContentContainer bordered={false} className="pt-5">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
        <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
        <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
        <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
      </div>
      <Pagenation />
    </ContentContainer>
  );
}

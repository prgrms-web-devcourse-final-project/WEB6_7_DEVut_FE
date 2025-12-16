import ContentContainer from "@/components/common/ContentContainer";
import Pagenation from "@/components/common/Pagenation";
import PageTabArea from "@/components/common/PageTabArea";
import ProductCard from "@/components/common/ProductCard";
import ProductsGrid from "@/components/common/ProductsGrid";
import { auctionItems } from "@/constants/route/auction";

export default function AuctionWishPage() {
  return (
    <>
      <PageTabArea items={auctionItems} />
      <ContentContainer bordered={false} className="pt-5">
        <ProductsGrid>
          <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
          <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
          <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
          <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
          <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
        </ProductsGrid>
        <Pagenation />
      </ContentContainer>
    </>
  );
}

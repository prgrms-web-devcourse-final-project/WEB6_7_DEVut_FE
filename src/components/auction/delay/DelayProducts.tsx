import OrderSwitch from "@/components/common/OrderSwitch";
import Pagenation from "@/components/common/Pagenation";
import ProductCard from "@/components/common/ProductCard";
import ProductsGrid from "@/components/common/ProductsGrid";
import Title from "@/components/common/Title";

export default function DelayProducts() {
  return (
    <div className="mt-10">
      <Title size={"sm"} className="font-normal">
        <span>
          카테고리
          <span className="mx-3">&gt;</span>
        </span>
        <span className="underline underline-offset-8">엔터테이너먼트</span>
      </Title>
      <div className="h-[15px] w-[90%] text-right">
        <OrderSwitch />
      </div>
      <ProductsGrid>
        <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
        <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
        <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
        <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
        <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
      </ProductsGrid>
      <Pagenation />
    </div>
  );
}

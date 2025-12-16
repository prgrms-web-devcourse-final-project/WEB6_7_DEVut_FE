import Pagenation from "../common/Pagenation";
import ProductCard from "../common/ProductCard";
import ProductsGrid from "../common/ProductsGrid";
import Title from "../common/Title";

export default function DelayPopularProducts() {
  return (
    <div className="mt-10">
      <Title>일반 인기 상품</Title>
      <ProductsGrid>
        <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
        <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
        <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
        <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
        <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
      </ProductsGrid>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"></div>
      <Pagenation />
    </div>
  );
}

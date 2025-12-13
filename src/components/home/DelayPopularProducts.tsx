import Pagenation from "../common/Pagenation";
import ProductCard from "../common/ProductCard";
import Title from "../common/Title";

export default function DelayPopularProducts() {
  return (
    <div className="mt-10">
      <Title>일반 인기 상품</Title>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
        <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
        <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
        <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
      </div>
      <Pagenation />
    </div>
  );
}

import ProductCard from "../common/ProductCard";

export default function SearchResult() {
  return (
    <>
      <div className="mt-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
          <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
          <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
          <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
        </div>
      </div>
    </>
  );
}

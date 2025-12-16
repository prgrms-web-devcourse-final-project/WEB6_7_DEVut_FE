import ProductCard from "../common/ProductCard";
import ProductsGrid from "../common/ProductsGrid";
import SearchState from "./SearchState";

interface SearchResultProps {
  searchData: LiveProductResponse | undefined;
  isLoading: boolean;
  isFetching: boolean;
  error: string | null;
  onPageChange: (page: number) => void;
}

export default function SearchResult({
  searchData,
  isLoading,
  isFetching,
  error,
  onPageChange,
}: SearchResultProps) {
  console.log("searchData:", searchData);

  if (!searchData && !isLoading) {
    return (
      <SearchState
        title="상품을 검색해보세요"
        description="상품명 또는 상세 조건으로 검색 할 수 있습니다."
      />
    );
  }

  if (isLoading) {
    return <div>검색중....</div>;
  }

  if (error) {
    return <SearchState title="오류가 발생했습니다" description={error} />;
  }

  if (!searchData || searchData.liveItems.length === 0) {
    return (
      <SearchState title="검색 결과가 없습니다" description="다른 검색어로 다시 시도해 보세요" />
    );
  }

  return (
    <>
      <div className="mt-10">
        <ProductsGrid>
          {searchData.liveItems.map((product, index) => (
            <ProductCard
              isLive={true}
              title={product.name}
              type="onLive"
              key={index}
              money={1000000}
            />
          ))}
        </ProductsGrid>
      </div>
    </>
  );
}

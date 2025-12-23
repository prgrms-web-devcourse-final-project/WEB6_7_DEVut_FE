import ProductCard from "../common/ProductCard";
import ProductsGrid from "../common/ProductsGrid";
import SearchState from "./SearchState";

interface SearchResultProps {
  cards: ProductCardType[];
  isLoading: boolean;
  isFetching: boolean;
  error: string | null | undefined;
  hasSearched: boolean;
  onPageChange: (page: number) => void;
}

export default function SearchResult({
  cards,
  isLoading,
  isFetching,
  error,
  hasSearched,
  onPageChange,
}: SearchResultProps) {
  console.log("searchData:", cards);

  if (!hasSearched && !isLoading) {
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

  if (!cards || cards.length === 0) {
    return (
      <SearchState title="검색 결과가 없습니다" description="다른 검색어로 다시 시도해 보세요" />
    );
  }

  if (cards && cards.length > 0) {
    return (
      <>
        <div className="mt-10">
          <ProductsGrid>
            {cards.map((product, index) => (
              <ProductCard context="CARD" key={index} product={product} />
            ))}
          </ProductsGrid>
        </div>
      </>
    );
  }
}

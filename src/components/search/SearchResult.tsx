import EmptyContainer from "../common/EmptyContainer";
import ProductCard from "../common/ProductCard";
import ProductsGrid from "../common/ProductsGrid";
import SearchState from "./SearchState";

interface SearchResultProps {
  cards: ProductCardType[];
  isLoading: boolean;
  isFetching: boolean;
  error: string | null | undefined;
  hasSearched: boolean;
}

export default function SearchResult({
  cards,
  isLoading,
  isFetching,
  error,
  hasSearched,
}: SearchResultProps) {
  if (!hasSearched && !isLoading) {
    return (
      <EmptyContainer
        className="mt-5 h-120"
        title="상품을 검색해보세요"
        description="상품명 또는 상세 조건으로 검색 할 수 있습니다."
      />
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-120 items-center justify-center py-10">
        <div
          className="border-custom-orange border-t-content-gray animate-spin rounded-full border-4"
          style={{ width: 24, height: 24 }}
        />
      </div>
    );
  }

  if (error) {
    return <SearchState title="오류가 발생했습니다" description={error} />;
  }

  if (!cards || cards.length === 0) {
    return (
      <EmptyContainer
        className="mt-5 h-120"
        title="검색 결과가 없습니다"
        description="다른 검색어로 다시 시도해 보세요"
      />
    );
  }

  if (cards && cards.length > 0) {
    return (
      <>
        <div className="mt-5">
          <ProductsGrid>
            {cards.map(product => (
              <ProductCard context="CARD" key={product.uid} product={product} />
            ))}
          </ProductsGrid>
        </div>
        <div className="border-border-sub/50 my-4 mt-8 flex w-full justify-center border-t pt-6" />
      </>
    );
  }
}

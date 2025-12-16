import ProductCard from "../common/ProductCard";

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

  return (
    <>
      <div className="mt-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <ProductCard money={100000} title="나이키 슈즈" type="onLive" />
        </div>
      </div>
    </>
  );
}

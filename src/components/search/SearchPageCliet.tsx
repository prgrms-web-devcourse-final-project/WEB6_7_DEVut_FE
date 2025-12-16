"use client";

import { useState } from "react";
import SearchResult from "@/components/search/SearchResult";
import SearchSection from "./SearchSection";
import { FilterBar } from "./FilterBar";
import DetailSearch from "../modal/detailSearch";
import { useLiveProductCards } from "@/features/product/hooks/useLiveProductCards";

export default function SearchPageClient() {
  const [open, setOpen] = useState(false);
  const [params, setParams] = useState<SearchParams>({
    page: 1,
    size: 15,
  });

  const hasSearched =
    !!params.name || !!params.category || !!params.minBidPrice || !!params.maxBidPrice;

  const handleRemoveFilter = (key: keyof SearchParams) => {
    setParams(prev => ({
      ...prev,
      [key]: undefined,
      page: 1,
    }));
  };
  const handleResetFilters = () => {
    setParams({
      page: 1,
      size: 15,
    });
  };

  const { cards, isLoading, isError, isFetching } = useLiveProductCards(params);

  return (
    <>
      <SearchSection
        onSearch={(name: string) => setParams(prev => ({ ...prev, name, page: 1 }))}
        onOpenDetail={() => setOpen(true)}
      />
      <FilterBar params={params} onRemove={handleRemoveFilter} onReset={handleResetFilters} />

      <SearchResult
        cards={cards}
        isLoading={isLoading}
        isFetching={isFetching}
        hasSearched={hasSearched}
        error={isError ? "검색하신 상품 목록이 없습니다." : null}
        onPageChange={(page: number) => setParams(prev => ({ ...prev, page }))}
      />

      {open && (
        <DetailSearch
          onClose={() => setOpen(false)}
          onSearch={(detailParams: SearchParams) =>
            setParams(prev => ({
              ...prev,
              ...detailParams,
              page: 1,
            }))
          }
        />
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import SearchResult from "@/components/search/SearchResult";
import SearchSection from "./SearchSection";
import { FilterBar } from "./FilterBar";
import DetailSearch from "../modal/detailSearch";
import { useSearchProductCards } from "@/features/product/hooks/useSearchProductCards";
import { auctionTypeMapping } from "@/utils/product";

export default function SearchPageClient() {
  const [open, setOpen] = useState(false);
  const [auctionType, setAuctionType] = useState<AuctionTypeKOR>("전체");
  const [params, setParams] = useState<GetProductsParams>({
    page: 1,
    size: 15,
  });

  console.log(auctionType);

  const hasSearched =
    !!params.name || !!params.category || !!params.minBidPrice || !!params.maxBidPrice;

  const handleRemoveFilter = (key: keyof GetProductsParams) => {
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

  const { cards, isLoading, isFetching, isError, error } = useSearchProductCards({
    auctionType: auctionTypeMapping(auctionType),
    params,
  });

  return (
    <>
      <SearchSection
        auctionType={auctionType}
        onChangeAuctionType={(type: AuctionTypeKOR) => {
          setAuctionType(type);
          setParams(prev => ({ ...prev, page: 1 }));
        }}
        onSearch={(name: string) => setParams(prev => ({ ...prev, name, page: 1 }))}
        onOpenDetail={() => setOpen(true)}
      />

      <FilterBar params={params} onRemove={handleRemoveFilter} onReset={handleResetFilters} />

      <SearchResult
        cards={cards}
        isLoading={isLoading}
        isFetching={isFetching}
        hasSearched={hasSearched}
        error={isError ? error?.message : null}
        onPageChange={(page: number) => setParams(prev => ({ ...prev, page }))}
      />

      {open && (
        <DetailSearch
          onClose={() => setOpen(false)}
          onSearch={(detailParams: GetProductsParams) =>
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

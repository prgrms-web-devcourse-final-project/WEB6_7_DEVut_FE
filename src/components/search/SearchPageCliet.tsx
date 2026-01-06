"use client";

import { useState } from "react";
import SearchResult from "@/components/search/SearchResult";
import SearchSection from "./SearchSection";
import { FilterBar } from "./FilterBar";
import DetailSearch from "../modal/detailSearch";
import { useSearchProductInfinite } from "@/features/product/hooks/useSearchProductCards";
import { auctionTypeMapping } from "@/utils/product";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

export default function SearchPageClient() {
  const [open, setOpen] = useState(false);
  const [isSelling, setIsSelling] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const auctionTypeKOR = (searchParams.get("auctionType") ?? "전체") as AuctionTypeKOR;
  const auctionType = auctionTypeMapping(auctionTypeKOR);

  const params: GetProductsAllParams = {
    page: Number(searchParams.get("page") ?? 1),
    size: 15,
    type: auctionType,
    keyword: searchParams.get("keyword") ?? undefined,
    category: (searchParams.get("category") as CategoryKey) ?? undefined,
    minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
    isSelling,
  };

  const hasSearched =
    !!params.keyword || !!params.category || !!params.minPrice || !!params.maxPrice;

  const updateSearchParams = (
    next: Partial<GetProductsAllParams & { auctionType: AuctionTypeKOR }>
  ) => {
    const sp = new URLSearchParams(searchParams.toString());
    sp.delete("page");

    Object.entries(next).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        sp.delete(key);
      } else {
        sp.set(key, String(value));
      }
    });

    router.push(`${pathname}?${sp.toString()}`, { scroll: false });
  };

  const handleChangeAuctionType = (type: AuctionTypeKOR) => {
    updateSearchParams({ auctionType: type, page: 1 });
  };

  const handleSearch = (keyword: string) => {
    updateSearchParams({ keyword, page: 1 });
  };

  const handleRemoveFilter = (key: keyof GetProductsAllParams) => {
    updateSearchParams({ [key]: undefined, page: 1 });
  };

  const handleResetFilters = () => {
    router.push(pathname);
  };

  const handleDetailSearch = (detailParams: GetProductsAllParams) => {
    updateSearchParams({ ...detailParams, page: 1 });
  };

  const handleIsSelling = () => {
    setIsSelling(prev => !prev);
  };

  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchProductInfinite(params);

  const cards = data?.pages.flatMap(page => page.auctions) ?? [];

  const loadMoreRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, hasNextPage);

  return (
    <>
      <SearchSection
        auctionType={auctionTypeKOR}
        onChangeAuctionType={handleChangeAuctionType}
        onSearch={handleSearch}
        onOpenDetail={() => setOpen(true)}
        isSelling={isSelling}
        handleIsSelling={handleIsSelling}
      />

      <FilterBar params={params} onRemove={handleRemoveFilter} onReset={handleResetFilters} />

      <SearchResult
        cards={cards}
        isLoading={isLoading}
        isFetching={isFetchingNextPage}
        hasSearched={hasSearched}
        error={isError ? error?.message : null}
      />

      <div ref={loadMoreRef} className="h-1" />
      {isFetchingNextPage && (
        <div
          className="border-custom-orange border-t-content-gray animate-spin rounded-full border-4"
          style={{ width: 24, height: 24 }}
        />
      )}

      {open && (
        <DetailSearch
          onClose={() => setOpen(false)}
          onSearch={handleDetailSearch}
          isSelling={isSelling}
          auctionType={auctionType}
        />
      )}
    </>
  );
}

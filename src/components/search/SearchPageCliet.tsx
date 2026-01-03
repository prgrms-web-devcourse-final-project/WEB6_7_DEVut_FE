"use client";

import { useState } from "react";
import SearchResult from "@/components/search/SearchResult";
import SearchSection from "./SearchSection";
import { FilterBar } from "./FilterBar";
import DetailSearch from "../modal/detailSearch";
import {
  useSearchProductCards,
  useSearchProductInfinite,
} from "@/features/product/hooks/useSearchProductCards";
import { auctionTypeMapping } from "@/utils/product";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

export default function SearchPageClient() {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const auctionType = (searchParams.get("auctionType") ?? "전체") as AuctionTypeKOR;
  const params: GetProductsParams = {
    page: Number(searchParams.get("page") ?? 1),
    size: 15,
    name: searchParams.get("name") ?? undefined,
    category: (searchParams.get("category") as CategoryKey) ?? undefined,
    minBidPrice: searchParams.get("minBidPrice")
      ? Number(searchParams.get("minBidPrice"))
      : undefined,
    maxBidPrice: searchParams.get("maxBidPrice")
      ? Number(searchParams.get("maxBidPrice"))
      : undefined,
  };

  const hasSearched =
    !!params.name || !!params.category || !!params.minBidPrice || !!params.maxBidPrice;

  const updateSearchParams = (
    next: Partial<GetProductsParams & { auctionType: AuctionTypeKOR }>
  ) => {
    const sp = new URLSearchParams(searchParams.toString());
    sp.delete("page");

    Object.entries(next).forEach(([key, value]) => {
      if (key === "page") return;
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

  const handleSearch = (name: string) => {
    updateSearchParams({ name, page: 1 });
  };

  const handleRemoveFilter = (key: keyof GetProductsParams) => {
    updateSearchParams({ [key]: undefined, page: 1 });
  };

  const handleResetFilters = () => {
    router.push(pathname);
  };

  const handleDetailSearch = (detailParams: GetProductsParams) => {
    updateSearchParams({
      ...detailParams,
      page: 1,
    });
  };

  // const { cards, isLoading, isFetching, isError, error, totalCount } = useSearchProductCards({
  //   auctionType: auctionTypeMapping(auctionType),
  //   params,
  // });

  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchProductInfinite(params);

  const cards = data?.pages.flatMap(page => page.products) ?? [];

  const loadMoreRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, hasNextPage);

  return (
    <>
      <SearchSection
        auctionType={auctionType}
        onChangeAuctionType={handleChangeAuctionType}
        onSearch={handleSearch}
        onOpenDetail={() => setOpen(true)}
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

      {open && <DetailSearch onClose={() => setOpen(false)} onSearch={handleDetailSearch} />}
    </>
  );
}

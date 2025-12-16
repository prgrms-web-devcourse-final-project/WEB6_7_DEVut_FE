"use client";

import { useEffect, useState } from "react";
import SearchResult from "@/components/search/SearchResult";
import DetailSearch from "@/components/modal/detailSearch";
import SearchSection from "./SearchSection";
import { getLiveProducts } from "@/features/product/api/liveProduct.api";
import { useLiveProducts } from "@/features/product/hooks/useLiveProducts";

export default function SearchPageClient() {
  const [open, setOpen] = useState(false);
  const [params, setParams] = useState<SearchParams>({
    page: 1,
    size: 15,
  });
  const { data: searchData, isLoading, isError, error, isFetching } = useLiveProducts(params);

  return (
    <>
      <SearchSection
        onSearch={(name: string) => setParams(prev => ({ ...prev, name, page: 1 }))}
        onOpenDetail={() => setOpen(true)}
      />

      <SearchResult
        searchData={searchData}
        isLoading={isLoading}
        isFetching={isFetching}
        error={isError ? "검색하신 상품 목록이 없습니다." : null}
        onPageChange={(page: number) => setParams(prev => ({ ...prev, page }))}
      />

      {open && <DetailSearch onClose={() => setOpen(false)} />}
    </>
  );
}

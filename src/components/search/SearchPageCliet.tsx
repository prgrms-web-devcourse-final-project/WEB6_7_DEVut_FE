"use client";

import { useState } from "react";
import SearchInput from "@/components/search/SearchInput";
import SearchResult from "@/components/search/SearchResult";
import DetailSearch from "@/components/modal/detailSearch";

export default function SearchPageClient() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SearchInput onOpenDetail={() => setOpen(true)} />

      <SearchResult />

      {open && <DetailSearch onClose={() => setOpen(false)} />}
    </>
  );
}

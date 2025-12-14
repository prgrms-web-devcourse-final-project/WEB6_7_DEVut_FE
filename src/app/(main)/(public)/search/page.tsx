import ContentContainer from "@/components/common/ContentContainer";
import SearchInput from "@/components/search/SearchInput";
import SearchResult from "@/components/search/SearchResult";
import { Suspense } from "react";

export default function SearchPage() {
  return (
    <ContentContainer bordered={false} className="pt-5">
      <div className="flex min-h-screen w-full flex-col">
        <div className="text-title-main flex min-h-[65px] text-2xl">
          <p className="-translate-y-0.5 font-bold">검색</p>
        </div>
        <SearchInput />
        <Suspense fallback={<div>로딩 중....</div>}>
          <SearchResult />
        </Suspense>
      </div>
    </ContentContainer>
  );
}

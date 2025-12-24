import ContentContainer from "@/components/common/ContentContainer";
import SearchPageClient from "@/components/search/SearchPageCliet";
import { Suspense } from "react";

export default function SearchPage() {
  return (
    <ContentContainer bordered={false} className="w-[95%] pt-5">
      <div className="flex min-h-screen w-full flex-col">
        <div className="text-title-main flex min-h-[65px] text-2xl">
          <p className="-translate-y-0.5 font-bold">검색</p>
        </div>

        <Suspense fallback={null}>
          <SearchPageClient />
        </Suspense>
      </div>
    </ContentContainer>
  );
}

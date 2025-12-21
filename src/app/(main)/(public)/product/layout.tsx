"use client";

import PagePrevArea from "@/components/common/PagePrevArea";
import { titleMap } from "@/constants/route/product";
import { usePathname } from "next/navigation";

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const title = titleMap.find(({ match }) => pathname.includes(match))?.title ?? "상품 상세";

  return (
    <>
      <PagePrevArea title={title} />
      {children}
    </>
  );
}

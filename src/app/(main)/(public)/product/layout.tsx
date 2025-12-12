"use client";

import PagePrevArea from "@/components/common/PagePrevArea";
import { usePathname } from "next/navigation";

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const title = pathname.includes("/bids") ? "경매 기록" : "상품 상세";

  return (
    <>
      <PagePrevArea title={title} />
      {children}
    </>
  );
}

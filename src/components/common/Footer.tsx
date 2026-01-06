"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // 메시지 페이지에서는 푸터를 숨김
  if (pathname.startsWith("/message")) return null;

  return (
    <div className="border-border-sub2/30 bg-content-area text-sub mt-10 border-t py-8 text-center text-sm">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-2.5">
        <p className="text-title-main-dark/80">BUZZER BIDDER</p>

        <p className="text-title-main-dark">실시간 입찰로 긴장감을 즐기는 라이브 경매 플랫폼</p>

        <p className="text-xs opacity-70">2025 Team Project · Live Auction Web Service</p>
      </div>
    </div>
  );
}

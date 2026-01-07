"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useDMSocketStore } from "@/features/socket/store/useDMSocketStore";

export default function MainContentWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMessagePage = pathname.startsWith("/message");
  const setActiveRoomId = useDMSocketStore(state => state.setActiveRoomId);

  useEffect(() => {
    const match = pathname.match(/^\/message\/(\d+)$/);
    const nextRoomId = match ? Number(match[1]) : null;
    setActiveRoomId(nextRoomId);
  }, [pathname, setActiveRoomId]);

  // 메시지 페이지에서는 전체 레이아웃 높이를 화면에 딱 맞추고,
  // 바깥 스크롤을 완전히 막은 뒤 내부(MessageLeft/Right)에서만 스크롤을 관리
  if (isMessagePage) {
    return (
      <div className="h-screen max-h-screen w-full overflow-hidden rounded-md px-0 pt-0">
        {children}
      </div>
    );
  }

  // 나머지 페이지는 기존 동작 유지
  return (
    <div className="h-fit min-h-screen w-full overflow-x-visible overflow-y-auto rounded-md px-2 pt-14 md:pt-0">
      {children}
    </div>
  );
}


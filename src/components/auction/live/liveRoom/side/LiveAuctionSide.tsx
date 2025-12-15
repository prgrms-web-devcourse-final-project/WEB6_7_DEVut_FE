"use client";

import { useState } from "react";
import { List, MessageCircle } from "lucide-react";
import LiveSideTabButton from "./LiveSideTabButton";
import LiveChatList from "./LiveChatList";
import LiveProductList from "./LiveProductList";
import { LiveChatItemProps } from "./LiveChatItem";
import Button from "@/components/common/Button";

export default function LiveAuctionSide() {
  const [tab, setTab] = useState("CHAT");

  const messages: LiveChatItemProps[] = [
    { type: "SYSTEM", text: "경매가 시작되었습니다" },
    {
      type: "BID",
      user: "경매왕경매왕경매왕",
      amount: 120000000,
      text: "",
    },
    {
      type: "USER",
      user: "버저",
      text: "와 이거 탐난다",
      avatarUrl: "/avatar/buzzer.png",
    },
    {
      type: "USER",
      user: "나",
      text: "이거 내가 가져간다",
      isMine: true,
    },
    { type: "SYSTEM", text: "종료 1분전!!" },
    {
      type: "USER",
      user: "버저비더",
      text: "잠시만요",
      avatarUrl: "/avatar/buzzer.png",
    },
  ];

  return (
    <div className="border-border-main flex w-[28%] min-w-[280px] flex-col border">
      {/* 상단 탭 */}
      <div className="border-border-main flex h-14 shrink-0 items-center border-b">
        <LiveSideTabButton active={tab === "CHAT"} onClick={() => setTab("CHAT")}>
          <MessageCircle size={18} className="mr-2" /> 채팅
        </LiveSideTabButton>
        <LiveSideTabButton active={tab === "PRODUCT"} onClick={() => setTab("PRODUCT")}>
          <List size={18} className="mr-2" /> 상품 목록
        </LiveSideTabButton>
      </div>

      {/* 스크롤 영역 (여기만) */}
      <div className="min-h-0 flex-1">
        <div hidden={tab !== "CHAT"} className="h-full overflow-y-auto">
          <LiveChatList messages={messages} />
        </div>

        <div hidden={tab !== "PRODUCT"} className="h-full overflow-y-auto">
          <LiveProductList />
        </div>
      </div>

      {/* 하단 입력창 */}
      <div className="border-border-sub shrink-0 border-t px-3 py-3">
        <div className="flex items-end gap-2">
          <textarea
            placeholder="메세지를 입력해주세요."
            className="bg-content-area border-border-sub text-border-sub2 w-full resize-none appearance-none rounded-lg border-2 px-4 py-3 outline-none focus:border-3"
          />
          <Button size="sm" className="w-25 px-0 text-xs">
            보내기
          </Button>
        </div>
      </div>
    </div>
  );
}

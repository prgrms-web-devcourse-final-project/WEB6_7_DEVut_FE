"use client";

import { useState } from "react";
import { List, MessageCircle } from "lucide-react";
import LiveSideTabButton from "./LiveSideTabButton";
import LiveChatList from "./LiveChatList";
import LiveProductList from "./LiveProductList";
import Button from "@/components/common/Button";

interface LiveAuctionSideProps {
  products: LiveAuctionState["products"];
  chat: {
    messages: LiveChatMessage[];
    sendMessage: (payload: unknown) => void;
  };
}

export default function LiveAuctionSide({ chat, products }: LiveAuctionSideProps) {
  const [tab, setTab] = useState("CHAT");
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    chat.sendMessage({
      type: "USER",
      text: input,
    });

    setInput("");
  };

  // const chatItems: LiveChatItemProps[] = chat.map(msg => {
  //   switch (msg.type) {
  //     case "SYSTEM":
  //       return {
  //         type: "SYSTEM",
  //         text: msg.message,
  //       };

  //     case "BID":
  //       return {
  //         type: "BID",
  //         user: msg.nickname,
  //         amount: Number(msg.message.replace(/[^0-9]/g, "")),
  //         text: "",
  //       };

  //     case "USER":
  //       return {
  //         type: "USER",
  //         user: msg.nickname,
  //         text: msg.message,
  //         avatarUrl: msg.profileImageUrl,
  //         isMine: false, // me
  //       };
  //   }
  // });

  return (
    <div className="border-border-main flex min-h-[420px] w-full min-w-[280px] flex-col border lg:min-h-0">
      <div className="border-border-main flex h-14 shrink-0 items-center border-b">
        <LiveSideTabButton active={tab === "CHAT"} onClick={() => setTab("CHAT")}>
          <MessageCircle size={18} className="mr-2" /> 채팅
        </LiveSideTabButton>
        <LiveSideTabButton active={tab === "PRODUCT"} onClick={() => setTab("PRODUCT")}>
          <List size={18} className="mr-2" /> 상품 목록
        </LiveSideTabButton>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className={tab === "CHAT" ? "h-full" : "hidden"}>
          <LiveChatList messages={chat.messages} userId={1} />
        </div>

        <div className={tab === "PRODUCT" ? "h-full" : "hidden"}>
          <LiveProductList products={products} />
        </div>
      </div>

      <div className="border-border-sub shrink-0 border-t px-3 py-3">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="메시지를 입력해주세요."
            className="bg-content-area border-border-sub w-full resize-none rounded-lg border-2 px-4 py-3 outline-none"
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button size="sm" onClick={handleSend}>
            보내기
          </Button>
        </div>
      </div>
    </div>
  );
}

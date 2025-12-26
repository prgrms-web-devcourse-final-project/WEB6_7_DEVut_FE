"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

import StatusBadge from "../common/StatusBadge";

import dummyImage2 from "@/assets/message/dummyImage2.jpg";
import sendButton from "@/assets/message/sendButton.svg";
import productSelector from "@/assets/message/productSelector.svg";

import {
  chatMessageMock,
  chatProductInfoMock,
  me,
} from "@/features/message/types/mock/message.mock";

interface MessageRightProps {
  roomId: number | null;
  isOpen: boolean;
  onBack: () => void;
}

export default function MessageRight({ roomId, isOpen, onBack }: MessageRightProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // roomId가 주입이 되는 순간
  // 상품 정보와, 기존 채팅 내역을 불러오고,
  // 웹소켓을 연결시켜준다.

  const initialMessages = useMemo(() => (roomId ? (chatMessageMock[roomId] ?? []) : []), [roomId]);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const opponent = messages.find(m => m.sender.id !== me.id)?.sender;

  const handleSend = () => {
    const value = inputRef.current?.value.trim();
    if (!value || !roomId) return;

    const newMessage: ChatMessage = {
      id: crypto.randomUUID(),
      roomId,
      sender: me,
      content: value,
      createdAt: new Date().toISOString(),
    };

    setMessages(prev => [...prev, newMessage]);
    inputRef.current!.value = "";
  };

  if (!roomId) {
    return (
      <div className="bg-bg-main hidden items-center justify-center md:flex md:flex-1">
        <p className="text-lg text-[#A1887F]">채팅방을 선택해 주세요</p>
      </div>
    );
  }

  return (
    <div
      className={`bg-bg-main fixed inset-0 z-50 flex flex-col transition-all duration-250 ease-in-out md:static md:z-auto md:flex-1 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex min-h-[65px] items-center gap-3 border-b-2 border-[#6D4C41] px-4 py-5">
        <button className="cursor-pointer text-2xl text-[#6D4C41]" onClick={onBack}>
          {">"}
        </button>
        <p className="text-[20px] text-[#8D6E63]">{opponent?.nickname ?? "채팅"}</p>
      </div>

      <div className="bg-[#FDF6E9 flex h-[117px] items-center justify-center border-b border-[#6D4C41] p-4">
        <button className="flex h-full w-full cursor-pointer flex-row items-center rounded-lg border-2 border-[#A1887F] p-[15px] shadow-[3px_3px_0px_rgba(109,76,65,0.4)] transition-all hover:scale-101 active:scale-99">
          <div className="h-16 w-16 overflow-hidden rounded-md border-3 border-[#6D4C41]">
            <Image
              src={chatProductInfoMock.thumbnail}
              alt={chatProductInfoMock.title}
              width={64}
              height={64}
            />
          </div>

          <div className="flex flex-col p-4">
            <div className="flex flex-row gap-2">
              <StatusBadge status="pending" />
              <p className="text-[14px] text-[#8D6E63]">{chatProductInfoMock.title}</p>
            </div>
            <p className="text-left text-[18px] text-[#6D4C41]">
              현재가 {chatProductInfoMock.currentPrice.toLocaleString()}
            </p>
          </div>

          <Image className="ml-auto" src={productSelector} alt="" width={41} height={36} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
        {messages.map(msg => {
          const isMine = msg.sender.id === me.id;

          return (
            <div key={msg.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
              {!isMine && (
                <div className="mr-3 h-12 w-12 overflow-hidden rounded-full border-2 border-[#6D4C41]">
                  <Image
                    src={msg.sender.profileImage ?? dummyImage2}
                    alt={msg.sender.nickname}
                    width={48}
                    height={48}
                  />
                </div>
              )}

              <div className="flex max-w-[50%] flex-col">
                {!isMine && (
                  <p className="text-lg font-bold text-[#6D4C41]">{msg.sender.nickname}</p>
                )}

                <div
                  className={`rounded-br-xl rounded-bl-xl border-2 px-4 py-2 text-[16px] ${
                    isMine
                      ? "rounded-tl-xl border-[#A15C07] bg-[#FFB74D] text-white shadow-[3px_3px_0px_#A15C07]"
                      : "rounded-tr-xl border-[#A1887F] bg-[#F4F4F4] text-[#5D4037]"
                  }`}
                >
                  {msg.content}
                </div>

                <span
                  className={`mt-1 ${
                    isMine ? "self-end" : "self-start"
                  } text-[12px] text-[#A1887F]`}
                >
                  {new Date(msg.createdAt).toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <form
        className="relative flex flex-row gap-2 border-t-2 border-[#6D4C41] bg-[#EFE6D9] p-3"
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
      >
        <input
          ref={inputRef}
          placeholder="메시지를 입력하세요..."
          className="h-[55px] w-full rounded-full border-3 border-[#6D4C41] bg-[#FEFCF5] px-4 py-2 text-[#5D4037] outline-none"
        />
        <button
          type="submit"
          className="cursor-pointer transition-all hover:scale-105 active:scale-98"
        >
          <Image src={sendButton} alt="보내기" width={50} height={50} />
        </button>
      </form>
    </div>
  );
}

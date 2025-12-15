"use client";

import { messagesByRoom } from "@/constants/dummy/message";
import dummyImage2 from "@/assets/message/dummyImage2.jpg";
import dummyImage1 from "@/assets/message/dummyImage.png";
import sendButton from "@/assets/message/sendButton.svg";
import Image from "next/image";
import StatusBadge from "../common/StatusBadge";
import productSelector from "@/assets/message/productSelector.svg";

export default function MessageRight({
  roomId,
  isOpen,
  onBack,
}: {
  roomId: string | null;
  isOpen: boolean;
  onBack: () => void;
}) {
  if (!roomId) return null;

  const messages = messagesByRoom[roomId] ?? [];

  return (
    <div
      className={`bg-bg-main fixed inset-0 z-50 flex flex-col transition-all duration-250 ease-in-out md:static md:z-auto md:flex-1 ${isOpen ? "translate-x-0" : "translate-x-full"} `}
    >
      <div className="flex min-h-[65px] items-center gap-3 border-b-4 border-[#6D4C41] px-4 py-5">
        <button className="cursor-pointer text-2xl text-[#6D4C41]" onClick={onBack}>
          {">"}
        </button>
        <p className="text-[20px] text-[#8D6E63]">인생역전</p>
      </div>
      {/* 상품 선택 영역 */}
      <div className="bg-[#FDF6E9 flex h-[117px] items-center justify-center border-b-1 border-[#6D4C41] p-4">
        <button className="flex h-full w-full cursor-pointer flex-row items-center rounded-[8px] border-2 border-[#A1887F] p-[15px] shadow-[3px_3px_0px_rgba(109,76,65,0.4)] transition-all hover:scale-101 active:scale-99">
          <div className="h-[64px] w-[64px] overflow-hidden rounded-[6px] border-3 border-[#6D4C41]">
            <Image src={dummyImage1} alt="" width={64} height={64} />
          </div>
          <div className="flex flex-col p-4">
            <div className="flex flex-row gap-2">
              <StatusBadge status={"pending"} />
              <p className="text-[14px] text-[#8D6E63]">애플워치 7 41mm</p>
            </div>
            <p className="text-[18px] text-[#6D4C41]">현재가 252,000</p>
          </div>

          <Image className="ml-auto" src={productSelector} alt="상품 버튼" width={41} height={36} />
        </button>
      </div>

      {/* 메시지 영역 */}
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
        {messages.map(msg => (
          <div key={msg.id}>
            <div className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
              {msg.sender === "other" ? (
                <div className="mr-3 h-[48px] w-[48px] overflow-hidden rounded-full border-2 border-[#6D4C41]">
                  {msg.avatar ? (
                    <Image src={msg.avatar} alt="프로필 이미지" width={48} height={48} />
                  ) : (
                    <Image src={dummyImage2} alt="프로필 이미지" width={48} height={48} />
                  )}
                </div>
              ) : (
                ""
              )}
              <div className="flex max-w-[50%] flex-col">
                <p className="text-lg font-bold text-[#6D4C41]">{msg.name}</p>
                {/* 말풍선 */}
                <div
                  className={`rounded-br-xl rounded-bl-xl border-2 px-4 py-2 text-[16px] ${
                    msg.sender === "me"
                      ? "rounded-tl-xl border-[#A15C07] bg-[#FFB74D] text-white shadow-[3px_3px_0px_#A15C07]"
                      : "rounded-tr-xl border-[#A1887F] bg-[#F4F4F4] text-[#5D4037]"
                  }`}
                >
                  {msg.content}
                </div>

                {/* 시간 , 말풍선 오른쪽 끝 */}
                <span
                  className={`mt-1 ${msg.sender === "me" ? "self-end" : "self-start"} text-[12px] text-[#A1887F]`}
                >
                  {msg.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 입력창 */}
      <form className="relative flex flex-row gap-2 border-t-2 border-[#6D4C41] bg-[#EFE6D9] p-3">
        <input
          placeholder="메시지를 입력하세요..."
          className="h-[55px] w-full rounded-full border-3 border-[#6D4C41] bg-[#FEFCF5] px-4 py-2 text-[#5D4037] outline-none"
        />
        <button
          type="button"
          className="cursor-pointer transition-all hover:scale-105 active:scale-98"
        >
          <Image src={sendButton} alt="보내기 버튼" width={50} height={50} />
        </button>
      </form>
    </div>
  );
}

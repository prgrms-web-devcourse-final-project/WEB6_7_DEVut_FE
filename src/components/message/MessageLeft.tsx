"use client";

import { chatRoomMock } from "@/features/message/types/mock/message.mock";
import Image from "next/image";

interface MessageLeftProps {
  selectedRoomId: number | null;
  onSelectRoom: (roomId: number) => void;
}

export default function MessageLeft({ selectedRoomId, onSelectRoom }: MessageLeftProps) {
  return (
    <div className="w-full border-r-2 border-[#6D4C41] md:w-[394px]">
      <div className="text-title-main mx-auto flex min-h-[65px] items-center gap-3 border-b-2 border-[#6D4C41] px-[42px] py-5 text-2xl">
        <p className="-translate-y-0.5 font-bold">채팅</p>
      </div>

      <ul className="flex flex-col">
        {chatRoomMock.map(room => {
          const isSelected = selectedRoomId === room.id;

          return (
            <li
              key={room.id}
              onClick={() => onSelectRoom(room.id)}
              className={`m-3 flex cursor-pointer items-center gap-3 rounded-xl border-[3px] p-3 transition-all hover:border-[#C56E33] ${isSelected ? "border-[#C56E33] bg-[#FFDAB9] shadow-[0px_0px_10px_#FF8A00]" : "border-transparent"} `}
            >
              <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-[#6D4C41]">
                <Image
                  src={room.opponent.profileImage}
                  alt={room.opponent.nickname}
                  width={48}
                  height={48}
                />
              </div>

              <div className="flex flex-1 flex-col">
                <span className="text-[18px] font-bold text-[#8D6E63]">
                  {room.opponent.nickname}
                </span>

                <p className="truncate text-[16px] text-[#8D6E63]">
                  {room.lastMessage?.content ?? ""}
                </p>
              </div>

              {room.unreadCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FF7043] text-xs text-white">
                  {room.unreadCount}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

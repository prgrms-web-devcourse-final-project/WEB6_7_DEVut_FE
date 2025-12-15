"use client";

import { chatRooms } from "@/constants/dummy/message";
import Image from "next/image";

export default function MessageLeft({
  selectedRoomId,
  onSelectRoom,
}: {
  selectedRoomId: string | null;
  onSelectRoom: (id: string) => void;
}) {
  return (
    <div className="w-full border-r-4 border-[#6D4C41] md:w-[394px]">
      <div className="text-title-main mx-auto flex min-h-[65px] items-center gap-3 border-b-4 border-[#6D4C41] px-[42px] py-5 text-2xl">
        <p className="-translate-y-0.5 font-bold">채팅</p>
      </div>

      <ul className="flex flex-col">
        {chatRooms.map(room => (
          <li
            key={room.id}
            onClick={() => onSelectRoom(room.id)}
            className={`m-3 flex cursor-pointer items-center gap-3 rounded-xl border-[3px] p-3 transition-all hover:scale-101 hover:rounded-xl hover:border-[3px] hover:border-[#C56E33] ${selectedRoomId === room.id ? "rounded-xl border-[3px] border-[#C56E33] bg-[#FFDAB9] shadow-[0px_0px_10px_#FF8A00]" : "border-transparent"} `}
          >
            {/* 프로필 */}
            <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-[#6D4C41]">
              <Image src={room.user.avatar} alt="" width={48} height={48} />
            </div>

            {/* 텍스트 */}
            <div className="flex flex-1 flex-col">
              <div className="flex justify-between">
                <span className="text-[18px] font-bold text-[#8D6E63]">{room.user.name}</span>
              </div>
              <p className="truncate text-sm text-[16px] text-[#8D6E63]">{room.lastMessage}</p>
            </div>

            {/* 안 읽은 메시지 */}
            {room.unreadCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FF7043] text-xs text-white">
                {room.unreadCount}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import BaseImage from "@/components/common/BaseImage";
import { cva } from "class-variance-authority";

const liveChatItemVariants = cva("text-title-main-dark w-full text-sm", {
  variants: {
    type: {
      USER: "flex w-full items-start",
      SYSTEM: "py-4 text-center opacity-90",
      BID: "my-3 flex w-full justify-center",
    },
    mine: {
      true: "justify-end",
      false: "justify-start",
    },
  },
  defaultVariants: {
    type: "USER",
    mine: false,
  },
});

interface LiveChatItemProps {
  message: LiveChatMessage;
  isMine: boolean;
}

export default function LiveChatItem({ message, isMine }: LiveChatItemProps) {
  const { type, nickname, profileImageUrl, message: text, sendTime } = message;

  const time = new Date(sendTime).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  /* SYSTEM */
  if (type === "SYSTEM") {
    return <li className={liveChatItemVariants({ type })}>{text}</li>;
  }

  /* BID */
  if (type === "BID") {
    return (
      <li className={liveChatItemVariants({ type })}>
        <div className="border-border-sub2 shadow-flat-light bg-content-area flex items-center border-[3px] px-4 py-2 text-sm">
          <b className="mr-1">{nickname}</b>
          님이
          <b className="mx-1">{text}</b>
          Bizz에 입찰했습니다!
        </div>
      </li>
    );
  }

  /* USER */
  return (
    <li className={liveChatItemVariants({ type, mine: isMine })}>
      <div
        className={[
          "flex items-start gap-2",
          isMine ? "flex-row-reverse text-right" : "flex-row",
        ].join(" ")}
      >
        {!isMine && (
          <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-300">
            {profileImageUrl && <BaseImage src={profileImageUrl} alt={nickname || ""} />}
          </div>
        )}

        <div className="flex max-w-[70%] flex-col gap-0.5 wrap-break-word whitespace-pre-wrap">
          {!isMine && <span className="text-title-sub2 text-xs">{nickname}</span>}

          <div
            className={[
              "border-border-sub border-2 px-3 py-2",
              isMine
                ? "bg-custom-brown rounded-xl rounded-tr-none text-white"
                : "bg-content-gray rounded-xl rounded-tl-none",
            ].join(" ")}
          >
            {text}
          </div>

          <span className="text-title-sub2/50 mt-1 text-xs">{time}</span>
        </div>
      </div>
    </li>
  );
}

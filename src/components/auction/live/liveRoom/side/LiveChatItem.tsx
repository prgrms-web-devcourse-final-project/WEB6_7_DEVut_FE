"use client";

import BaseImage from "@/components/common/BaseImage";
import { cva } from "class-variance-authority";

const liveChatItemVariants = cva("text-title-main-dark w-full list-none text-sm", {
  variants: {
    type: {
      USER: "flex w-full items-start",
      SYSTEM: "py-3 text-center opacity-90",
      LIVE_BID: "my-5 flex w-full justify-center",
      AUCTION_END: "my-5 flex w-full justify-center",
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
  userId: number;
}

export default function LiveChatItem({ message, userId }: LiveChatItemProps) {
  const {
    type,
    nickname,
    profileImageUrl,
    message: text,
    sendTime,
    senderId,
    bidderId,
    newPrice,
    result,
    finalPrice,
    winnerId,
    bidderNickname,
    winnerNickname,
  } = message;
  const isMine = userId === senderId;
  const isBidder = userId === bidderId;
  const isWinner = userId === winnerId;

  const time = new Date(sendTime).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (type === "SYSTEM") {
    return <li className={liveChatItemVariants({ type })}>{text}</li>;
  }

  if (type === "LIVE_BID") {
    return (
      <li className={liveChatItemVariants({ type })}>
        <div className="border-border-sub2 shadow-flat-light bg-content-area flex w-full flex-col items-center gap-1 border-[3px] px-4 py-2 text-sm">
          <>
            <span>{isBidder ? "🎉 입찰을 축하드립니다!" : "🔔 상위 입찰"} </span>
            <span>
              <b className="text-custom-red">{`"${bidderNickname}"`}</b>
              <b> 님이 {newPrice?.toLocaleString()} </b>
              Bizz에 입찰을 했습니다.
            </span>
          </>
        </div>
      </li>
    );
  }

  if (type === "AUCTION_END") {
    return (
      <li className={liveChatItemVariants({ type })}>
        <div className="border-border-sub2 shadow-flat-light bg-content-area flex w-full flex-col items-center gap-1 border-[3px] px-4 py-2 text-sm">
          <>
            {result === "FAILED" ? (
              <span>상품이 유찰되었습니다.</span>
            ) : (
              <>
                <span>
                  {isWinner ? "🎉 축하드립니다! 상품이 낙찰되었습니다." : "상품이 낙찰되었습니다."}
                </span>
                <span>
                  <b className="text-custom-red">{`"${winnerNickname}"`}</b>
                  <b> 님이 {finalPrice?.toLocaleString()} </b>
                  Bizz에 낙찰되었습니다.
                </span>
              </>
            )}
          </>
        </div>
      </li>
    );
  }

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

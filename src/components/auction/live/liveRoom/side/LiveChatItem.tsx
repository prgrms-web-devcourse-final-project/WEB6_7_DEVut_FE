"use client";

import BaseImage from "@/components/common/BaseImage";
import { cva } from "class-variance-authority";

const liveChatItemVariants = cva("text-title-main-dark w-full text-sm", {
  variants: {
    type: {
      USER: "flex w-full items-start",
      SYSTEM: "py-4 text-center opacity-90",
      LIVE_BID: "my-3 flex w-full justify-center",
      AUCTION_END: "my-3 flex w-full justify-center",
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
          {isBidder ? (
            <>
              <span>🎉 입찰을 축하드립니다! </span>
              <span>{newPrice?.toLocaleString()} Bizz에 성공적으로 입찰했어요.</span>
            </>
          ) : (
            <>
              <span>🔔 상위 입찰 </span>
              <span>{newPrice?.toLocaleString()} Bizz에 입찰이 들어왔습니다.</span>
            </>
          )}
        </div>
      </li>
    );
  }

  if (type === "AUCTION_END") {
    return (
      <li className={liveChatItemVariants({ type })}>
        <div className="border-border-sub2 shadow-flat-light bg-content-area flex w-full flex-col items-center gap-1 border-[3px] px-4 py-2 text-sm">
          {result === "FAILED" ? (
            <>
              <span>상품이 유찰되었습니다.</span>
            </>
          ) : (
            <>
              {isWinner ? (
                <>
                  <span>🎉 축하드립니다! 상품이 낙찰되었습니다.</span>
                  <span>
                    <b>{finalPrice?.toLocaleString()}</b> Bizz에 낙찰되었어요!
                  </span>
                </>
              ) : (
                <>
                  <span>상품이 낙찰되었습니다.</span>
                  <span>
                    <b>{finalPrice?.toLocaleString()}</b> Bizz에 낙찰되었습니다.
                  </span>
                </>
              )}
            </>
          )}
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

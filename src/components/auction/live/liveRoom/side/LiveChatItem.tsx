// LiveChatItem.tsx
import { cva } from "class-variance-authority";
import Image from "next/image";

const liveChatItemVariants = cva("text-title-main-dark text-sm", {
  variants: {
    type: {
      USER: "flex items-start gap-2",
      SYSTEM: "py-4 text-center opacity-90",
      BID: "my-3 flex justify-center",
    },
    mine: {
      true: "flex-row-reverse text-right",
      false: "",
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
  const { type, nickname, profileImageUrl, message: text, createdAt } = message;

  const time = new Date(createdAt).toLocaleTimeString("ko-KR", {
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
        <div className="shadow-flat-light bg-content-area border-border-sub2 flex w-fit items-center border-[3px] px-4 py-2 text-sm">
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
      {!isMine && (
        <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-300">
          {profileImageUrl && (
            <Image
              src={profileImageUrl}
              alt={nickname || ""}
              className="h-full w-full object-cover"
            />
          )}
        </div>
      )}

      <div className="flex max-w-[75%] flex-col gap-0.5">
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
    </li>
  );
}

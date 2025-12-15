import { cva, type VariantProps } from "class-variance-authority";

type LiveChatItemType = "USER" | "SYSTEM" | "BID";

const liveChatItemVariants = cva("text-title-main-dark text-sm", {
  variants: {
    type: {
      USER: "flex items-start gap-2",
      SYSTEM: "py-5 text-center opacity-90",
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

export interface LiveChatItemProps extends VariantProps<typeof liveChatItemVariants> {
  type: LiveChatItemType;
  user?: string;
  text: string;
  amount?: number;
  avatarUrl?: string;
  isMine?: boolean;
  createdAt?: string;
}

export default function LiveChatItem({
  type,
  user,
  text,
  amount,
  avatarUrl,
  isMine = false,
  createdAt,
}: LiveChatItemProps) {
  if (type === "SYSTEM") {
    return <li className={liveChatItemVariants({ type })}>{text}</li>;
  }

  if (type === "BID") {
    return (
      <li className={liveChatItemVariants({ type })}>
        <div className="shadow-flat-light bg-content-area border-border-sub2 flex w-fit flex-wrap items-center border-[3px] px-4 py-2">
          {user}님이 {amount?.toLocaleString()} Bizz 에 입찰하였습니다!
        </div>
      </li>
    );
  }

  return (
    <li className={liveChatItemVariants({ type, mine: isMine })}>
      {!isMine && (
        <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-300">
          {/* 이미지 */}
        </div>
      )}

      <div className="flex max-w-[75%] flex-col gap-0.5">
        {!isMine && <span className="text-sm">{user}</span>}

        <div
          className={`border-border-sub border-2 px-3 py-2 ${
            isMine
              ? "bg-custom-brown rounded-xl rounded-tr-none text-white"
              : "bg-content-gray rounded-xl rounded-tl-none"
          } `}
        >
          {text}
        </div>

        <span className="text-title-sub2/50 mt-1 text-xs">{createdAt ?? "12:45 PM"}</span>
      </div>
    </li>
  );
}

"use client";

import { getNotificationRoute, getNotifyIcon } from "@/utils/notify";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import tape from "@/assets/notify/tape.svg";
import { useDeleteNotify } from "@/features/notify/hooks/useDeleteNotify";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { format, parseISO } from "date-fns";

export default function NotifyItem({
  notify,
  className,
}: {
  notify: NotificationItem<NotificationType>;
  className?: string;
}) {
  const router = useRouter();
  const notifyRoute = getNotificationRoute(notify);
  const { mutate } = useDeleteNotify(notify.id);
  return (
    <div
      className={twMerge(
        `border-border-main group bg-btn-default text-custom-dark-brown relative mb-6 ml-14 flex min-h-[52px] items-center gap-3 rounded-lg border-2 px-4 py-3 shadow-[3px_3px_0_#A1887F]`,
        className
      )}
    >
      {<Image src={tape} alt="`tape" className="absolute -left-5 -rotate-3" />}
      <span className="text-xl">{getNotifyIcon(notify.type)}</span>
      <span
        onClick={() => router.push(notifyRoute || "")}
        className="cursor-pointer group-hover:underline"
      >
        {notify.message}
      </span>

      <span className="text-title-sub2 text-xs whitespace-nowrap">
        {format(parseISO(notify.createDate), "HH:mm")}
      </span>

      <button
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          mutate();
        }}
        className="text-title-sub2 hover:text-custom-red cursor-pointer opacity-0 transition-opacity group-hover:opacity-100"
      >
        <X size={18} />
      </button>
    </div>
  );
}

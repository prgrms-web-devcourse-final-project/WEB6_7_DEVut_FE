import { getNotificationRoute, getNotifyIcon } from "@/utils/notify";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import tape from "@/assets/notify/tape.svg";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";

export default function NotifyItem({
  notify,
  className,
}: {
  notify: NotificationItem<NotificationType>;
  className?: string;
}) {
  const notifyRoute = getNotificationRoute(notify);
  return (
    <Link
      href={notifyRoute as Url}
      className={twMerge(
        `border-border-main group bg-btn-default text-custom-dark-brown relative mb-6 ml-14 flex min-h-[52px] items-center gap-3 rounded-lg border-2 px-4 py-3 shadow-[3px_3px_0_#A1887F]`,
        className
      )}
    >
      {<Image src={tape} alt="`tape" className="absolute -left-5 -rotate-3" />}
      <span className="text-xl">{getNotifyIcon(notify.type)}</span>
      <span className="group-hover:underline">{notify.message}</span>
    </Link>
  );
}

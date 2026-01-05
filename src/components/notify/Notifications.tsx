"use client";

import { notifyGroupByDate } from "@/utils/notify";
import MileStoneSemiTitle from "../common/MileStoneSemiTitle";
import { useNotificatoins } from "@/features/notify/hooks/useNotifications";
import { useNotificationStore } from "@/features/notify/store/useNotification";
import { useEffect } from "react";
import NotifyItem from "./NotifyItem";

interface NotifyListProps {
  notifications: NotificationItem<NotificationType>[];
}

export default function Notifications({ notifications }: NotifyListProps) {
  const { data } = useNotificatoins(notifications);
  const { resetUnread } = useNotificationStore(state => state);
  const { group, sortedKeys } = notifyGroupByDate(data);

  useEffect(() => {
    resetUnread();
  }, [resetUnread]);

  return (
    <div className="relative min-h-screen">
      {sortedKeys.length > 0 ? (
        <>
          <div className="bg-border-main absolute top-0 left-7 h-full w-[3px]" />
          {sortedKeys.map((dateKey, index) => (
            <div key={dateKey} className="mb-12">
              <MileStoneSemiTitle title={dateKey} className="mb-8 ml-2" />

              {group[dateKey].map(notify => (
                <NotifyItem key={notify.id} notify={notify} />
              ))}

              {index !== sortedKeys.length - 1 && (
                <div className="mt-12 ml-15 w-[95%] border-t-[3px] border-dashed border-[#A1887F]/30" />
              )}
            </div>
          ))}
        </>
      ) : (
        <div className="text-title-sub2 flex h-[60vh] items-center justify-center text-sm">
          알림이 없습니다.
        </div>
      )}
    </div>
  );
}

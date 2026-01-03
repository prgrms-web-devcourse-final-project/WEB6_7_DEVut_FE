import ContentContainer from "@/components/common/ContentContainer";
import MileStoneSemiTitle from "@/components/common/MileStoneSemiTitle";
import NotifyItem from "@/components/notify/notifyItem";
import { getNotifications } from "@/features/notify/api/notify.server.api";
import { getNotifyIcon, notifyGroupByDate } from "@/utils/notify";

export default async function NotifyPage() {
  const notifications = await getNotifications();
  const { group, sortedKeys } = notifyGroupByDate(notifications);

  return (
    <ContentContainer bordered={false} className="w-[95%] pt-5">
      <div className="flex min-h-screen w-full max-w-7xl flex-col">
        <div className="text-title-main flex min-h-[65px] text-2xl">
          <p className="-translate-y-0.5 font-bold">알림</p>
        </div>
        <section className="relative min-h-screen">
          {sortedKeys.length > 0 ? (
            <>
              <div className="bg-border-main absolute top-0 left-7 h-full w-[3px]" />
              {sortedKeys.map((dateKey, index) => (
                <div key={dateKey} className="mb-12">
                  <MileStoneSemiTitle title={dateKey} className="mb-8 ml-2" />

                  {group[dateKey].map(notification => (
                    <NotifyItem key={notification.id} icon={getNotifyIcon(notification.type)}>
                      {notification.message}
                    </NotifyItem>
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
        </section>
      </div>
    </ContentContainer>
  );
}

import ContentContainer from "@/components/common/ContentContainer";
import Notifications from "@/components/notify/Notifications";
import { allReadNotifications, getNotifications } from "@/features/notify/api/notify.server.api";

export default async function NotifyPage() {
  const [notifications] = await Promise.all([getNotifications(), allReadNotifications()]);

  return (
    <ContentContainer bordered={false} className="w-[95%] pt-5">
      <div className="flex min-h-screen w-full max-w-7xl flex-col">
        <div className="text-title-main flex min-h-[65px] text-2xl">
          <p className="-translate-y-0.5 font-bold">알림</p>
        </div>
        <Notifications notifications={notifications} />
      </div>
    </ContentContainer>
  );
}

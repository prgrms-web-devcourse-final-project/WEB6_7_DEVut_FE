import MobileHeader from "@/components/common/MobileHeader";
import Sidebar from "@/components/common/SideBar";
import NotificationProvider from "@/providers/NotificationProvider";
import SocketProvider from "@/providers/SocketProvider";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <NotificationProvider>
      <SocketProvider>
        <div className="flex">
          <Sidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <MobileHeader />
            <div className="h-fit min-h-screen w-full overflow-x-visible overflow-y-hidden rounded-md px-2 pt-14 md:pt-0">
              {children}
            </div>
          </div>
        </div>
      </SocketProvider>
    </NotificationProvider>
  );
}

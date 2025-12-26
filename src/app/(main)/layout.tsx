import MobileHeader from "@/components/common/MobileHeader";
import Sidebar from "@/components/common/SideBar";
import NotificationProvider from "@/providers/NotificationProvider";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <NotificationProvider>
    <div className="flex">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <MobileHeader />
        <div className="h-fit min-h-screen w-full overflow-x-visible overflow-y-hidden rounded-md pt-14 md:pt-0">
          {children}
        </div>
      </div>
    </NotificationProvider>
  );
}

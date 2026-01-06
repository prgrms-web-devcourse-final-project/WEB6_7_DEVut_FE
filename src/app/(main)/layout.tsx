import Footer from "@/components/common/Footer";
import MobileHeader from "@/components/common/MobileHeader";
import Sidebar from "@/components/common/SideBar";
import MainContentWrapper from "@/components/common/MainContentWrapper";
import { getMeServer } from "@/features/auth/api/auth.server.api";
import NotificationProvider from "@/providers/NotificationProvider";
import SocketProvider from "@/providers/SocketProvider";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const me = await getMeServer();

  return (
    <NotificationProvider me={me}>
      <SocketProvider>
        <div className="flex">
          <Sidebar me={me} />
          <div className="flex min-w-0 flex-1 flex-col">
            <MobileHeader />
            <MainContentWrapper>{children}</MainContentWrapper>
            <Footer />
          </div>
        </div>
      </SocketProvider>
    </NotificationProvider>
  );
}

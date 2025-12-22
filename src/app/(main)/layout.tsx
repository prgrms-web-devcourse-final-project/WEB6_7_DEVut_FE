import MobileHeader from "@/components/common/MobileHeader";
import Sidebar from "@/components/common/SideBar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex w-full flex-col">
        <MobileHeader />
        <div className="h-fit min-h-screen w-full overflow-x-visible overflow-y-hidden rounded-md pt-14 md:pt-0">
          {children}
        </div>
      </div>
    </div>
  );
}

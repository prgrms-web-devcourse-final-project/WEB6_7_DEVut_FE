import Sidebar from "@/components/common/SideBar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="border-border-main h-screen w-full overflow-hidden rounded-md border-[3px] border-l">
        {children}
      </div>
    </div>
  );
}

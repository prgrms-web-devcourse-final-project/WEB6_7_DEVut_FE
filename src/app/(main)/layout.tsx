import Sidebar from "@/components/common/SideBar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="h-fit min-h-screen w-full overflow-hidden rounded-md">{children}</div>
    </div>
  );
}

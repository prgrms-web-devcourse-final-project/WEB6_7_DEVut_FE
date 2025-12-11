import { sidebarItems } from "@/constants/sidebar";
import SideBarItem from "./SideBarItem";
import BBLogo from "../../../public/images/sidebar/BBlogo.png";
import BBLogoBackground from "../../../public/images/sidebar/BBlogo_background.png";
import Image from "next/image";
import sound from "../../../public/images/sidebar/sound.png";

export default function Sidebar() {
  return (
    <div className="border-border-main shadow-right flex h-screen w-20 flex-col items-center gap-4 rounded-md border-[3px] border-r pt-2 pb-2">
      <div className="group relative h-[65px] min-h-[65px] w-[65px] min-w-[65px] cursor-pointer">
        <Image
          src={BBLogoBackground}
          alt="logo background"
          fill
          className="object-cover drop-shadow-[0_1px_0_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:-rotate-45"
        />
        <Image
          src={BBLogo}
          alt="logo"
          fill
          className="translate-y-[8%] scale-[1.8] object-contain drop-shadow-[0_2px_0_rgba(0,0,0,0.6)]"
        />
      </div>
      {sidebarItems.map(item => (
        <SideBarItem
          key={item.path}
          path={item.path}
          src={item.icon}
          badgeCount={item.badgeCount}
        />
      ))}
      <div
        className={`border-border-sub2 shadow-flat mt-auto flex h-[50px] cursor-pointer items-center justify-center border-[3px] p-3 transition-all active:translate-y-0.5 active:shadow-none`}
      >
        <Image src={sound} alt="sound" width={22} height={22} />
      </div>
    </div>
  );
}

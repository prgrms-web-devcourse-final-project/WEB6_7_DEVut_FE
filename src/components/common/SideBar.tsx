"use client";

import { sidebarItems } from "@/constants/route/sidebar";
import SideBarItem from "./SideBarItem";
import BBLogo from "@/assets/images/sidebar/BBlogo.png";
import BBLogoBackground from "@/assets/images/sidebar/BBlogo_background.png";
import Image from "next/image";
import sound from "@/assets/images/sidebar/sound.png";
import mypage from "@/assets/images/sidebar/mypage.png";
import login from "@/assets/images/sidebar/login.svg";
import { useAuthStore } from "@/features/auth/model/auth.store";

export default function Sidebar() {
  const user = useAuthStore(state => state.user);
  return (
    <div className="shadow-flat-light flex min-h-screen w-20 flex-col items-center gap-4 rounded-md pt-2 pb-2">
      <div className="group relative h-[65px] min-h-[65px] w-[65px] min-w-[65px] cursor-pointer">
        <Image
          src={BBLogoBackground}
          alt="logo background"
          fill
          className="object-cover drop-shadow-[4px_4px_0_rgba(0,0,0,0.2)] transition-transform duration-300 group-hover:-rotate-45"
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

      <SideBarItem path={user ? "/mypage" : "/login"} src={user ? mypage : login} />
      <div
        className={`border-border-sub2 shadow-flat mt-auto flex h-[50px] cursor-pointer items-center justify-center border-[3px] p-3 transition-all active:translate-y-0.5 active:shadow-none`}
      >
        <Image src={sound} alt="sound" width={22} height={22} />
      </div>
    </div>
  );
}

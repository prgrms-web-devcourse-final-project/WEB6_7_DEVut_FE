"use client";

import SideBarItem from "./SideBarItem";
import BBLogo from "@/assets/images/sidebar/BBlogo.png";
import BBLogoBackground from "@/assets/images/sidebar/BBlogo_background.png";
import Image from "next/image";
import sound from "@/assets/images/sidebar/sound.png";
import mypage from "@/assets/images/sidebar/mypage.png";
import login from "@/assets/images/sidebar/login.svg";
import SideBarItems from "./SideBarItems";
import { useLiveRoomStore } from "@/features/auction/store/useLiveRoomStore";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar({ me }: { me: User | null }) {
  const { subscribedAuctionIds } = useLiveRoomStore(state => state);
  const path = usePathname();
  const isRoom = path === "/auction/liveRoom";
  const hasSubscribed = subscribedAuctionIds.length > 0;

  return (
    <div className="shadow-flat-light sticky top-0 hidden h-screen w-20 flex-col items-center gap-4 overflow-visible rounded-md pt-2 pb-2 md:flex">
      <Link
        href={hasSubscribed ? (isRoom ? "/" : "/auction/liveRoom") : "#"}
        aria-disabled={!hasSubscribed}
        className={twMerge(
          "group relative h-[65px] min-h-[65px] w-[65px] min-w-[65px]",
          hasSubscribed ? "cursor-pointer active:scale-98" : "pointer-events-none cursor-default"
        )}
      >
        <Image
          src={BBLogoBackground}
          alt="logo background"
          fill
          className={twMerge(
            "object-cover drop-shadow-[4px_4px_0_rgba(0,0,0,0.2)] transition-opacity duration-500",
            hasSubscribed ? (isRoom ? "opacity-100" : "animate-pulse opacity-100") : "opacity-0"
          )}
        />

        <Image
          src={BBLogo}
          alt="logo"
          fill
          className="translate-y-[8%] scale-[1.8] object-contain drop-shadow-[0_2px_0_rgba(0,0,0,0.6)]"
        />
      </Link>

      <SideBarItems />

      <SideBarItem
        path={me ? "/mypage" : "/login"}
        src={me ? mypage : login}
        label={me ? "내정보" : "로그인"}
      />
      <div
        className={`border-border-sub2 shadow-flat mt-auto flex h-[50px] cursor-pointer items-center justify-center border-[3px] p-3 transition-all active:translate-y-0.5 active:shadow-none`}
      >
        <Image src={sound} alt="sound" width={22} height={22} />
      </div>
    </div>
  );
}

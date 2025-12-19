"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { sidebarItems } from "@/constants/route/sidebar";
import BBLogo from "@/assets/images/sidebar/BBlogo.png";
import { TextAlignJustify, X } from "lucide-react";
import { useMe } from "@/features/auth/hooks/useMe";
import mypage from "@/assets/images/sidebar/mypage.png";
import login from "@/assets/images/sidebar/login.svg";
import sound from "@/assets/images/sidebar/sound.png";

export default function MobileHeader() {
  const [open, setOpen] = useState(false);
  const { data: me } = useMe();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <div className="border-border-sub2 bg-content-area flex items-center justify-between border-b px-4 py-3 md:hidden">
        <div className="flex items-center gap-3">
          <button onClick={() => setOpen(true)} className="text-2xl font-bold">
            <TextAlignJustify />
          </button>
          <Image src={BBLogo} alt="BB 로고" width={40} height={40} className="translate-y-0.5" />
        </div>
      </div>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        className={`bg-content-area fixed top-0 left-0 z-50 h-screen w-64 transform shadow-lg transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col justify-between p-4">
          <div className="flex flex-col gap-2">
            <button onClick={() => setOpen(false)} className="self-end text-xl">
              <X />
            </button>

            {sidebarItems.map(item => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-gray-100"
              >
                <Image src={item.icon} alt={item.label} width={24} height={24} />
                <span className="text-base font-medium">{item.label}</span>
              </Link>
            ))}

            <Link
              href={me ? "/mypage" : "/login"}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-gray-100"
            >
              <Image
                src={me ? mypage : login}
                alt={me ? "내정보" : "로그인"}
                width={24}
                height={24}
              />
              <span className="text-base font-medium">{me ? "내정보" : "로그인"}</span>
            </Link>
          </div>

          <button
            onClick={() => {
              setOpen(false);
            }}
            className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 hover:bg-gray-100"
          >
            <Image src={sound} alt="소리" width={24} height={24} />
            <span className="text-base font-medium">사운드</span>
          </button>
        </div>
      </div>
    </>
  );
}

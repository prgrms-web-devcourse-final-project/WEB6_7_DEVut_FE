"use client";

import { useRouter } from "next/navigation";

export default function PagePrevArea({ title }: { title: string }) {
  const router = useRouter();
  return (
    <div className="text-title-main mx-auto flex min-h-[65px] w-[95%] max-w-[1440px] items-center gap-3 text-2xl">
      <div
        className="border-border-main shadow-flat-light bg-btn-default flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-[3.5px] text-lg"
        onClick={() => router.back()}
      >
        <span className="-translate-x-[0.7px]">{"<"}</span>
      </div>
      <span className="-translate-y-0.5 font-bold">{title}</span>
    </div>
  );
}

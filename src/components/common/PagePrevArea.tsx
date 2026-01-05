"use client";

import { useRouter } from "next/navigation";

export default function PagePrevArea({ title }: { title: string }) {
  const router = useRouter();
  return (
    <div className="text-title-main mx-auto mt-5 flex min-h-fit w-[99%] max-w-[1440px] items-center text-xl md:mb-5 md:w-[98%] md:gap-3 md:text-2xl">
      <div
        className="md:border-border-main md:shadow-flat-light md:bg-btn-default flex h-10 w-10 cursor-pointer items-center justify-center text-2xl md:h-8 md:w-8 md:rounded-full md:border-[3.5px] md:text-lg"
        onClick={() => router.back()}
      >
        <span className="-translate-x-[0.7px]">{"<"}</span>
      </div>

      <span className="-translate-y-0.5 font-bold">{title}</span>
    </div>
  );
}

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface PaginationProps {
  className?: string;
  totalPages: number;
}

export default function Pagination({ className, totalPages }: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = Number(searchParams.get("page") ?? 1);

  const goToPage = (p: number) => {
    const sp = new URLSearchParams(searchParams.toString());
    if (p <= 1) sp.delete("page");
    else sp.set("page", String(p));

    router.push(`${pathname}?${sp.toString()}`);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div
      className={twMerge(
        "border-border-sub/50 my-7 mt-8 flex w-full justify-center border-t pt-6",
        className
      )}
    >
      <button
        onClick={() => goToPage(page - 1)}
        disabled={page <= 1}
        className="text-title-sub cursor-pointer px-3 py-1 disabled:opacity-50"
      >
        Prev
      </button>

      <div className="flex gap-2">
        {pages.map(p => (
          <button
            key={p}
            onClick={() => goToPage(p)}
            className={twMerge(
              "h-8 w-8 cursor-pointer rounded-lg border-[3px] transition-all active:translate-y-0.5",
              page === p
                ? "bg-custom-orange shadow-flat border-border-main text-white"
                : "bg-content-gray shadow-flat border-border-sub2 text-title-main"
            )}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        onClick={() => goToPage(page + 1)}
        disabled={page >= totalPages}
        className="text-title-sub cursor-pointer px-3 py-1 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

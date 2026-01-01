import { twMerge } from "tailwind-merge";

export default function Pagenation({ className }: { className?: string }) {
  return (
    <div className={twMerge("w-full", className)}>
      <div className="mx-auto flex w-[50%] items-center justify-center gap-2">
        <button>Prev</button>

        <div className="flex gap-1">
          <button className="bg-custom-orange shadow-flat border-border-sub2 text-title-main h-8 w-8 cursor-pointer rounded-lg border-[3px] transition-all active:translate-y-0.5 active:shadow-none">
            <span className="-translate-x-0.5">1</span>
          </button>
          <button className="bg-content-gray shadow-flat border-border-sub2 text-title-main h-8 w-8 cursor-pointer rounded-lg border-[3px] transition-all active:translate-y-0.5 active:shadow-none">
            <span className="-translate-x-0.5">2</span>
          </button>
        </div>

        <button>Next</button>
      </div>
    </div>
  );
}

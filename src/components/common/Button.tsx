import { twMerge } from "tailwind-merge";

export default function Button({ label, className }: { label: string; className?: string }) {
  return (
    <>
      <button
        className={twMerge(
          "flex h-16 w-[161.67px] cursor-pointer items-center justify-center rounded-lg border-3 border-[#4E342E] bg-[#FFF8E1] text-[20px] text-[#6D4C41] transition-all hover:scale-102 active:scale-99",
          className
        )}
      >
        {label}
      </button>
    </>
  );
}

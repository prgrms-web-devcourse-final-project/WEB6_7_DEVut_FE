"use client";

import { twMerge } from "tailwind-merge";

const toNumberString = (s: string) => s.replace(/[^\d]/g, "");
const toComma = (n?: number) =>
  typeof n === "number" ? new Intl.NumberFormat("ko-KR").format(n) : "";

type Props = {
  placeholder: string;
  className?: string;
  value?: number;
  onChange: (value: number) => void;
};

export default function PriceInput({ placeholder, className = "", value, onChange }: Props) {
  return (
    <div className="relative flex items-center">
      <input
        type="text"
        inputMode="numeric"
        placeholder={placeholder}
        value={toComma(value)}
        onChange={e => {
          const digits = toNumberString(e.target.value);
          onChange(digits ? Number(digits) : 0);
        }}
        className={twMerge(
          "bg-input-area text-border-sub shadow-inner-soft border-border-sub focus:border-border-sub2 mx-auto w-full appearance-none rounded-xl border-2 px-4 py-3.5 outline-none focus:border-3",
          className
        )}
      />

      <span className="text-border-sub/70 pointer-events-none absolute right-3">Bizz</span>
    </div>
  );
}

"use client";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const toNumberString = (s: string) => s.replace(/[^\d]/g, "");
const toComma = (digits: string) =>
  digits ? new Intl.NumberFormat("ko-KR").format(Number(digits)) : "";

export default function PriceInput({
  placeholder,
  className = "",
}: {
  placeholder: string;
  className?: string;
}) {
  const [raw, setRaw] = useState(""); // 콤마 없는 숫자 문자열

  const [price, setPrice] = useState(""); // 화면에 보이는 값(콤마 포함)

  return (
    <div className="relative flex items-center">
      <input
        type="text"
        inputMode="numeric"
        placeholder={placeholder}
        value={toComma(raw)}
        onChange={e => setRaw(toNumberString(e.target.value))}
        className={twMerge(
          "bg-input-area text-border-sub shadow-inner-soft border-border-sub focus:border-border-sub2 mx-auto w-full appearance-none rounded-xl border-2 px-4 py-3.5 outline-none focus:border-3",
          className
        )}
      />
      <span className="text-border-sub/70 pointer-events-none absolute right-3">Bizz</span>
    </div>
  );
}

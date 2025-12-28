"use client";

import { useLayoutEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

const toNumberString = (s: string) => s.replace(/[^\d]/g, "");
// 0일 때 빈 문자열 반환 -> placeholder 노출
const toComma = (n?: number) =>
  typeof n === "number" && n !== 0 ? new Intl.NumberFormat("ko-KR").format(n) : "";

type Props = {
  placeholder: string;
  className?: string;
  value?: number;
  onChange: (value: number) => void;
};

export default function PriceInput({ placeholder, className = "", value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const cursorRef = useRef<number | null>(null); // 커서 앞에 있던 숫자 개수

  // 렌더링 후 커서 복원
  useLayoutEffect(() => {
    if (cursorRef.current !== null && inputRef.current) {
      const formattedValue = inputRef.current.value;
      let digitsSeen = 0;
      let newCursorPos = 0;

      // 앞에서부터 스캔하며 digitsSeen 개수만큼 채워지는 지점 찾기
      for (let i = 0; i < formattedValue.length; i++) {
        if (/\d/.test(formattedValue[i])) {
          digitsSeen++;
        }
        if (digitsSeen >= cursorRef.current) {
          // 목표한 숫자 갯수만큼 지났으면, 그 다음 위치가 커서 위치
          // 단, 현재 문자가 숫자라면 그 문자 뒤(i+1), 아니면(콤마 등) 콤마 뒤로 계속 갈 수도 있음.
          // 보통 숫자가 나온 직후에 멈추거나 해야 함
          // => digitsSeen에 도달한 순간의 i+1
          newCursorPos = i + 1;
          break;
        }
      }

      if (cursorRef.current === 0) newCursorPos = 0; // 맨 앞

      inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
      cursorRef.current = null;
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = e.target;
    const rawVal = el.value;
    const caret = el.selectionStart || 0;

    const digitsBeforeCaret = rawVal.slice(0, caret).replace(/\D/g, "").length;
    cursorRef.current = digitsBeforeCaret;

    const digits = toNumberString(rawVal);
    onChange(digits ? Number(digits) : 0);
  };

  return (
    <div className="relative flex items-center">
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        placeholder={placeholder}
        value={toComma(value)}
        onChange={handleChange}
        className={twMerge(
          "bg-input-area text-border-sub shadow-inner-soft border-border-sub focus:border-border-sub2 mx-auto w-full appearance-none rounded-xl border-2 px-4 py-3.5 outline-none focus:border-3",
          className
        )}
      />

      <span className="text-border-sub/70 pointer-events-none absolute right-3">Bizz</span>
    </div>
  );
}

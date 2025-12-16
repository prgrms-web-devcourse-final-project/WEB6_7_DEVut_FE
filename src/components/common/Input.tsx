"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  maxLength?: number;
};

export default function Input({
  type = "text",
  maxLength,
  className,
  value = "",
  onChange,
  onKeyDown, // 👈 추가
  ...rest
}: Props) {
  const [count, setCount] = useState(String(value).length);

  useEffect(() => {
    setCount(String(value).length);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let nextValue = e.target.value;

    if (typeof maxLength === "number" && nextValue.length > maxLength) {
      nextValue = nextValue.slice(0, maxLength);
    }

    if (onChange) {
      e.target.value = nextValue;
      onChange(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 여기서 공통 처리 넣어도 됨 (예: Enter 방지)
    onKeyDown?.(e); // 👈 그대로 위임
  };

  return (
    <div className="relative w-full">
      <input
        {...rest}
        type={type}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown} // 👈 연결
        className={twMerge(
          "bg-input-area text-border-sub shadow-inner-soft border-border-sub focus:border-border-sub2/70 mx-auto w-full appearance-none rounded-xl border-2 px-4 py-3.5 outline-none focus:border-3",
          className
        )}
      />

      {maxLength && (
        <span className="text-border-sub/30 pointer-events-none absolute right-3 bottom-2 text-xs">
          {count}/{maxLength}
        </span>
      )}
    </div>
  );
}

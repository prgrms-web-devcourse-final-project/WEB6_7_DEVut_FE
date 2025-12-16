"use client";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

type InputType = "text" | "password" | "email" | "number" | "search" | "tel" | "url";

type Props = {
  type?: InputType;
  placeholder: string;
  maxLength?: number;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
};

export default function Input({
  type = "text",
  placeholder,
  maxLength,
  className = "",
  onChange,
  value,
}: Props) {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="relative w-full">
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={e => {
            const value = e.target.value;

            if (typeof maxLength === "number") {
              // 실제 입력값 길이를 maxLength로 clamp
              const nextLength = Math.min(value.length, maxLength);
              setCount(nextLength);

              // 혹시 브라우저 이벤트 타이밍으로 초과 입력이 들어온 경우 잘라냄
              if (value.length > maxLength) {
                e.target.value = value.slice(0, maxLength);
              }
            }
            onChange?.(e);
          }}
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
    </>
  );
}

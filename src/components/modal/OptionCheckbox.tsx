"use client";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export function OptionCheckbox() {
  const [checked, setChecked] = useState(false);

  return (
    <div
      className="flex cursor-pointer items-center gap-4"
      onClick={() => setChecked(prev => !prev)}
    >
      {/* 박스 */}
      <div
        className={twMerge(
          "border-custom-dark-brown h-7 w-7 rounded-lg border-4 shadow-[2px_2px_0px_rgba(92,58,33,0.8)]",
          "flex items-center justify-center",
          checked ? "bg-custom-orange" : "bg-bg-main"
        )}
      >
        {checked && <div className="bg-custom-dark-brown h-3 w-3 rounded-sm" />}
      </div>

      {/* 텍스트 */}
      <span className="text-border-main text-[20px]">곧 마감 (Under 10 min)</span>
    </div>
  );
}

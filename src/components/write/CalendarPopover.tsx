"use client";

import Button from "@/components/common/Button";
import { useEffect, useRef } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

type CalendarPopoverProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  formatLabel?: (date: Date) => string;
  placeholder?: string;
  buttonClassName?: string;
};

export default function CalendarPopover({
  open,
  onOpenChange,
  value,
  onChange,
  formatLabel,
  placeholder = "날짜",
  buttonClassName,
}: CalendarPopoverProps) {
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  // 바깥 클릭(또는 터치)하면 닫기
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      const inTrigger = triggerRef.current?.contains(target);
      const inPopover = popoverRef.current?.contains(target);
      if (!inTrigger && !inPopover) onOpenChange(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [open, onOpenChange]);

  const label = value
    ? formatLabel
      ? formatLabel(value)
      : value.toLocaleDateString("ko-KR")
    : placeholder;

  return (
    <div className="relative w-full">
      <Button
        // ref={triggerRef}
        type="button"
        fullWidth={true}
        onClick={() => onOpenChange(!open)}
        className={buttonClassName}
      >
        {label}
      </Button>

      <div
        ref={popoverRef}
        className={[
          "absolute right-0 left-0 z-50 mt-2 w-fit rounded-xl bg-white p-4 shadow-2xl",
          "origin-top-left transition-all duration-200 ease-out",
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0",
        ].join(" ")}
      >
        <DayPicker
          mode="single"
          selected={value}
          disabled={{ before: new Date() }}
          onSelect={date => {
            if (!date) return;
            onChange(date);
            onOpenChange(false);
          }}
          classNames={{
            day_button:
              "h-9 w-9 rounded-md transition-colors hover:bg-border-sub/20 hover:shadow-flat-light",
            disabled:
              "text-border-sub/40 cursor-not-allowed opacity-50 hover:bg-transparent hover:shadow-none",
            selected: "bg-border-sub2 text-white hover:bg-border-sub2",
            today: "ring-2 ring-border-sub2 rounded-md",

            // 캡션 가운데 + 양 옆 버튼
            caption: "relative flex items-center justify-center px-2 py-2",
            caption_label: "text-lg font-black",
            nav: "absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2",
            nav_button: "size-8 rounded-md transition hover:bg-border-sub/20",
          }}
        />
      </div>
    </div>
  );
}

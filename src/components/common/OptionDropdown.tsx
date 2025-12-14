"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface OptionDropdownProps {
  label: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

interface OptionDropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function OptionDropdown({ label, className, children }: OptionDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        className={twMerge(
          "bg-btn-default border-border-sub2 text-title-sub flex cursor-pointer items-center gap-1 rounded-xl border-2 px-5 py-1 pr-3",
          className
        )}
      >
        <span>{label}</span>
        <ChevronDown className={twMerge("scale-85", open && "rotate-180")} />
      </button>

      {open && (
        <div className="border-border-sub2 bg-content-area absolute z-20 mt-2 min-w-[120px] overflow-hidden rounded-xl border shadow-md">
          {children}
        </div>
      )}
    </div>
  );
}

OptionDropdown.Item = function DropdownItem({
  children,
  onClick,
  className,
}: OptionDropdownItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={twMerge(
        "text-title-sub hover:bg-content-gray w-full cursor-pointer px-4 py-2 text-left text-sm transition-colors",
        className
      )}
    >
      {children}
    </button>
  );
};

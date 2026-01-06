"use client";

import { X } from "lucide-react";

interface TabButtonProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  onClose: () => void;
}

export default function TabButton({ label, active, onClick, onClose }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative flex h-10 cursor-pointer items-center pr-10 text-sm transition-all duration-200 ${
        active ? "z-20 translate-y-0.5" : "z-10 translate-y-1.5 opacity-80 hover:opacity-100"
      }`}
    >
      <div
        className={`absolute inset-0 border-3 border-[#3A2414] ${
          active
            ? `bg-[#6B4A2F] shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_2px_0_rgba(0,0,0,0.35)]`
            : `bg-[#4A321F] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]`
        }`}
      />

      <span className="relative z-10 ml-8 text-white">{label}</span>

      <X
        size={18}
        onClick={e => {
          e.stopPropagation();
          onClose();
        }}
        className="text-custom-brown absolute top-1/2 right-2 z-10 -translate-y-1/2 cursor-pointer opacity-0 transition-opacity group-hover:opacity-100"
      />
    </button>
  );
}

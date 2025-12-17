"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import { useAutoResizeTextarea } from "@/hooks/useAutoResizeTextarea";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoResize?: boolean;
}

export default function Textarea({
  className,
  autoResize = true,
  onInput,
  ...props
}: TextareaProps) {
  const { ref, onInput: autoResizeOnInput } = useAutoResizeTextarea();

  const handleInput: React.FormEventHandler<HTMLTextAreaElement> = e => {
    if (autoResize) {
      autoResizeOnInput();
    }
    onInput?.(e);
  };

  return (
    <textarea
      ref={autoResize ? ref : undefined}
      onInput={handleInput}
      className={twMerge(
        "bg-content-area border-border-sub text-border-sub2 min-h-60 w-full appearance-none rounded-lg border-2 px-4 py-4 outline-none focus:border-3",
        className
      )}
      {...props}
    />
  );
}

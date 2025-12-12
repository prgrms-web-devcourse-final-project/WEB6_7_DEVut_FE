"use client";
import { useAutoResizeTextarea } from "@/hooks/useAutoResizeTextarea";

export default function Textarea() {
  const { ref, onInput } = useAutoResizeTextarea();

  return (
    <>
      <textarea
        ref={ref}
        onInput={onInput}
        placeholder="상품에 대한 설명을 자세히 적어주세요."
        className="bg-content-area border-border-sub text-border-sub2 mx-auto min-h-60 w-full appearance-none rounded-lg border-2 px-4 py-4 outline-none focus:border-3"
      />
    </>
  );
}

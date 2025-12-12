"use client";
import { useRef, useCallback } from "react";

export function useAutoResizeTextarea() {
  const ref = useRef<HTMLTextAreaElement>(null);

  const onInput = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    el.style.height = "auto"; // 높이 초기화
    el.style.height = `${el.scrollHeight}px`; // 내용 높이만큼 증가
  }, []);

  return { ref, onInput };
}

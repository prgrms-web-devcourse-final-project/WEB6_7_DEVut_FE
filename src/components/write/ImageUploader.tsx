"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { twJoin } from "tailwind-merge";
import camera from "@/assets/camera.svg";
import WrapperImage from "../common/WrapperImage";

interface ImageUploaderProps {
  files: File[];
  onChange: (files: File[]) => void;
  max?: number;
}

export default function ImageUploader({ files, onChange, max = 5 }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openFilePicker = () => {
    if (files.length >= max) return;
    inputRef.current?.click();
  };

  const previews = useMemo(
    () =>
      files.map(file => ({
        file,
        url: URL.createObjectURL(file),
      })),
    [files]
  );

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    if (!selected.length) return;

    const remaining = max - files.length;
    if (remaining <= 0) return;

    onChange([...files, ...selected.slice(0, remaining)]);
    e.target.value = "";
  };

  const removeAt = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
  };

  useEffect(() => {
    return () => {
      previews.forEach(p => URL.revokeObjectURL(p.url));
    };
  }, [previews]);

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={onChangeFile}
      />

      <button
        type="button"
        onClick={openFilePicker}
        disabled={files.length >= max}
        className={twJoin(
          "border-border-sub bg-content-area h-full w-full rounded-2xl border-4 border-dashed p-16",
          files.length >= max ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:blur-[2px]"
        )}
      >
        <div className="flex flex-col items-center justify-center">
          <Image src={camera} alt="camera Icon" className="mb-2" />
          <p className="text-title-sub2 text-[18px]">이곳을 클릭하여 이미지를 업로드 하세요</p>
          <p className="text-title-sub2 text-[14px]">최대 {max}장까지 가능합니다</p>
        </div>
      </button>

      {previews.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {previews.map((p, idx) => (
            <div key={p.url} className="relative">
              <WrapperImage src={p.url} rounded="lg" className="h-[120px] w-full object-cover" />

              <button
                type="button"
                onClick={() => removeAt(idx)}
                className="border-border-sub2 bg-btn-default text-title-sub shadow-flat-light absolute top-2 right-2 rounded-md border-2 px-2 py-1 text-[12px]"
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

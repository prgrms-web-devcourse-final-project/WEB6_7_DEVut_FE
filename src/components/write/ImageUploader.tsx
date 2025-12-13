import { useEffect, useRef, useState } from "react";
import camera from "@/assets/camera.svg";
import Image from "next/image";
import { twJoin } from "tailwind-merge";
import WrapperImage from "../common/WrapperImage";

type PreviewItem = {
  file: File;
  url: string;
};
export default function ImageUploader() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previews, setPreviews] = useState<PreviewItem[]>([]);
  const MAX = 5;

  const openFilePicker = () => inputRef.current?.click();

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    // if (!files.type.startsWith("image/")) {
    //   alert("이미지 파일만 업로드 해주세요");
    //   return;
    // }

    setPreviews(prev => {
      const remaining = MAX - prev.length;
      const nextFiles = files.slice(0, Math.max(0, remaining));

      const nextItems = nextFiles.map(file => ({
        file,
        url: URL.createObjectURL(file),
      }));
      return [...prev, ...nextItems];
    });

    e.target.value = "";
  };

  const removeAt = (index: number) => {
    setPreviews(prev => {
      const target = prev[index];
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((_, i) => i !== index);
    });
  };

  useEffect(() => {
    return () => {
      previews.forEach(p => URL.revokeObjectURL(p.url));
    };
  }, [previews]);

  return (
    <div>
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        multiple
        className="hidden"
        onChange={onChangeFile}
      />
      <button
        type="button"
        onClick={openFilePicker}
        className={twJoin(
          "border-border-sub bg-content-area h-full w-full rounded-2xl border-4 border-dashed p-16",
          previews.length >= MAX ? "cursor-not-allowed opacity-60" : "hover:border- cursor-pointer"
        )}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="mb-2 flex w-full justify-center">
            <Image src={camera} alt="camera Icon" />
          </div>
          <p className="text-title-sub2 text-[18px]">이곳을 클릭하여 이미지를 업로드 하세요</p>
          <p className="text-title-sub2 text-[14px]">최대 {MAX}장까지 가능합니다</p>
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

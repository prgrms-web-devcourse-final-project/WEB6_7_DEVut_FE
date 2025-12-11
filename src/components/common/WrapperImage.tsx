import { StaticImageData } from "next/image";
import BaseImage, { RoundedSize } from "./BaseImage";
import { twMerge } from "tailwind-merge";

interface WrapperImageProps {
  src: string | StaticImageData;
  alt?: string;
  className?: string;
  rounded?: RoundedSize;
}

export default function WrapperImage({
  src,
  alt = "image",
  rounded = "none",
  className,
}: WrapperImageProps) {
  return (
    <div className="border-border-sub2 bg-content-gray shadow-flat h-full w-full rounded-lg border-[1.8px] p-1.5">
      <BaseImage src={src} alt={alt} rounded={rounded} className={twMerge("", className)} />
    </div>
  );
}

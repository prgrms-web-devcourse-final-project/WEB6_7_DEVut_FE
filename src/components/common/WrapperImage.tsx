import { StaticImageData } from "next/image";
import BaseImage, { RoundedSize } from "./BaseImage";
import { twMerge } from "tailwind-merge";
import test from "@/assets/images/auction/auctioneer.svg";

interface WrapperImageProps {
  src?: string | StaticImageData;
  alt?: string;
  className?: string;
  rounded?: RoundedSize;
}

function isValidExternalUrl(src: string) {
  return src.startsWith("http://") || src.startsWith("https://");
}

export default function WrapperImage({
  src,
  alt = "image",
  rounded = "none",
  className,
}: WrapperImageProps) {
  let safeSrc: string | StaticImageData = test;

  if (src) {
    if (typeof src === "string") {
      // 문자열인데 URL이 아니거나 더미 도메인이면 fallback
      if (isValidExternalUrl(src) && !src.includes("example.com")) {
        safeSrc = src;
      }
    } else {
      // StaticImageData (로컬 svg/png)
      safeSrc = src;
    }
  }
  return (
    <div className="border-border-sub2 bg-content-gray h-full w-full rounded-lg border-2">
      <BaseImage src={safeSrc} alt={alt} rounded={rounded} className={twMerge("", className)} />
    </div>
  );
}

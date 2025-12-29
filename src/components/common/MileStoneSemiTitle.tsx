import Image from "next/image";
import MileStone from "@/assets/common/mileStoneSemiTitle.svg";
import { twMerge } from "tailwind-merge";

function hashToNumber(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getRotateFromKey(key: string) {
  const hash = hashToNumber(key);
  const min = -3;
  const max = 3;
  return min + ((hash % 1000) / 1000) * (max - min);
}

export default function MileStoneSemiTitle({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  const rotate = getRotateFromKey(title).toFixed(2);
  return (
    <>
      <div
        className={twMerge(
          "relative flex h-11 w-[181.5px] rotate-2 items-center justify-center",
          className
        )}
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        <Image src={MileStone} alt="마일스톤 소제목 배경" width={181.5} height={44} />

        <p className="absolute left-2 text-[25px] text-[#4E342E] text-shadow-[-0.5px_-0.5px_0_#fff,0.5px_-0.5px_0_#fff,-0.5px_0.5px_0_#fff,0.5px_0.5px_0_#fff]">
          {title}
        </p>
      </div>
    </>
  );
}

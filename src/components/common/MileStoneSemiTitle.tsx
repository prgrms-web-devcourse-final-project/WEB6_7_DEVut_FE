import Image from "next/image";
import MileStone from "@/assets/mileStoneSemiTitle.svg";

export default function MileStoneSemiTitle({ title }: { title: string }) {
  return (
    <>
      <div className="relative flex h-11 w-[181.5px] items-center justify-center">
        <Image src={MileStone} alt="마일스톤 소제목 배경" width={181.5} height={44} />

        <p className="absolute left-2 text-[25px] text-[#4E342E] text-shadow-[-0.5px_-0.5px_0_#fff,0.5px_-0.5px_0_#fff,-0.5px_0.5px_0_#fff,0.5px_0.5px_0_#fff]">
          {title}
        </p>
      </div>
    </>
  );
}

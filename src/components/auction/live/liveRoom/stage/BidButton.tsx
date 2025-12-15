import test from "@/assets/images/sidebar/auction.png";
import Image from "next/image";
export default function BidButton() {
  return (
    <button className="group relative z-30 flex h-[clamp(110px,12vw,140px)] w-[clamp(110px,12vw,140px)] cursor-pointer items-center justify-center overflow-hidden rounded-full shadow-[0_14px_28px_rgba(0,0,0,0.7)] transition-all hover:scale-[1.02] active:translate-y-0.5">
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_65%_35%,#3B1E12_0%,#1C0E08_75%)]" />
      <div className="absolute -inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(184,66,16,0.75)_0%,rgba(184,66,16,0.35)_38%,rgba(184,66,16,0)_65%)] blur-[2.5px]" />
      <div className="absolute inset-0 translate-x-[11%] translate-y-[9%] rounded-full bg-[#2A1810]" />

      <div className="relative z-30 flex flex-col items-center">
        <span className="text-2xl font-bold text-white">입찰하기</span>
        <span className="mt-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#D4A574] p-2 transition-all duration-200 group-hover:rotate-15">
          <Image src={test} alt="test" />
        </span>
      </div>
    </button>
  );
}

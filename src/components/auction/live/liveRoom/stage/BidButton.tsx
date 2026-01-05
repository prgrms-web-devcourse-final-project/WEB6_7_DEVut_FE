import test from "@/assets/images/sidebar/auction.png";
import Image from "next/image";

export default function BidButton() {
  return (
    <button className="group relative z-30 flex h-14 w-full cursor-pointer items-center justify-center overflow-hidden rounded-md shadow-[0_2px_6px_rgba(0,0,0,0.18)] transition-all active:translate-y-px lg:h-[clamp(110px,12vw,140px)] lg:w-[clamp(110px,12vw,140px)] lg:rounded-full lg:shadow-[0_6px_12px_rgba(0,0,0,0.28)] lg:hover:scale-[1.01] lg:active:translate-y-0.5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,#3B1E12_0%,#1C0E08_75%)]" />
      <div className="absolute -inset-[12%] hidden rounded-full bg-[radial-gradient(circle,rgba(184,66,16,0.45)_0%,rgba(184,66,16,0.2)_38%,rgba(184,66,16,0)_65%)] blur-[1.5px] lg:block" />
      <div className="absolute inset-0 hidden rounded-full bg-[#2A1810] lg:block lg:translate-x-[11%] lg:translate-y-[9%]" />

      <div className="relative z-30 flex items-center gap-3 lg:flex-col lg:gap-0">
        <span className="text-base font-bold text-white lg:text-2xl">입찰하기</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D4A574] p-1 transition-all duration-200 lg:mt-2 lg:h-10 lg:w-10 lg:group-hover:rotate-12">
          <Image src={test} alt="auction icon" />
        </span>
      </div>
    </button>
  );
}

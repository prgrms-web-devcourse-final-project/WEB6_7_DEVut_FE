import test from "@/assets/vintage.png";
import BizzAmount from "@/components/common/BizzAmount";
import Image from "next/image";

export default function AuctionProduct({
  currentStageProduct,
}: {
  currentStageProduct: LiveRoomProduct | undefined;
}) {
  return (
    <div className="absolute inset-x-0 z-20 flex justify-center" style={{ bottom: "15%" }}>
      <div
        className="relative rounded-sm border-[3px] border-[#5A3B2E] bg-[#F7F2EB] shadow-[0_18px_36px_rgba(0,0,0,0.45)]"
        style={{
          width: "clamp(160px, 18vw, 280px)",
          fontSize: "clamp(11px, 1vw, 14px)",
        }}
      >
        <div className="pointer-events-none absolute inset-x-[1.2em] -bottom-[0.9em] h-[0.9em] rounded-full bg-black/40 blur-md" />

        <div className="relative z-10 p-[1em]">
          <div className="mb-2 rounded-sm border border-[#8B6A4F] bg-[#E9D8C4] px-2 py-1 text-center font-semibold tracking-wide text-[#3B261A]">
            {currentStageProduct?.name}
          </div>

          <div className="mb-3 rounded-sm border-[3px] border-[#6B4A38] bg-[#3A2418] p-1">
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-sm">
              <Image src={test} alt="product" fill className="object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/25 via-transparent to-transparent" />
            </div>
          </div>

          <div className="rounded-sm border-2 border-[#6B4A38] bg-[#FFF8F0] px-3 py-[0.6em]">
            <p className="text-[0.8em] tracking-wide text-[#7A5A44] uppercase">현재 입찰가</p>
            <BizzAmount amount={currentStageProduct?.currentPrice || ""} />
          </div>
        </div>
      </div>
    </div>
  );
}

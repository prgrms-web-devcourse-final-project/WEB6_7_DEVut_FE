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
        className="bg-content-area border-border-sub2 text-title-main-dark relative rounded-sm border-[3px] drop-shadow-[0_1.2em_2.2em_rgba(0,0,0,0.45)]"
        style={{
          width: "clamp(150px, 18vw, 260px)",
          fontSize: "clamp(11px, 1vw, 14px)",
        }}
      >
        <div className="pointer-events-none absolute inset-x-[1.2em] -bottom-[0.9em] h-[0.9em] rounded-full bg-black/45 blur-md" />

        <div className="relative z-10 p-[1em]">
          <p>{currentStageProduct?.name}</p>
          <div className="border-border-main my-2 border" />
          <div className="border-border-sub2 mb-2 border-[1.5px]">
            <div className="relative aspect-4/3 w-full">
              <Image src={test} alt="product" fill className="object-cover" />
            </div>
          </div>

          <div className="border-border-sub2 border-[0.14em] px-3 py-[0.6em]">
            <p className="text-[0.85em] opacity-70">현재 입찰가</p>
            <BizzAmount amount={currentStageProduct?.price || ""} />
          </div>
        </div>
      </div>
    </div>
  );
}

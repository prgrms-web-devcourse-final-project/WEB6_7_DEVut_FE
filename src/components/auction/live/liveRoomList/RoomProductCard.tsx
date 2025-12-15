import BaseImage from "@/components/common/BaseImage";
import test from "@/assets/vintage.png";
import BizzAmount from "@/components/common/BizzAmount";

export default function RoomProductCard() {
  return (
    <div className="relative h-full">
      <div className="flex h-full w-full flex-col rounded-md border border-[#4F382A] bg-[#FDF6E9]">
        <div className="relative aspect-214/134 w-full overflow-hidden rounded-[3px] p-1.5">
          <BaseImage src={test} alt="카드 이미지" />
        </div>

        <div className="text-title-main-dark mt-1.5 flex w-full flex-col px-2 pb-2">
          <p className="text-[11px] opacity-60">시작가</p>

          <BizzAmount
            amount={100000}
            className="text-custom-orange-dark text-[14px] leading-tight font-bold"
          />

          <p className="mt-0.5 line-clamp-1 text-[13px]">야호</p>
        </div>
      </div>
    </div>
  );
}

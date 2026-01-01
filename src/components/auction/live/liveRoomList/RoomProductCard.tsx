import BaseImage from "@/components/common/BaseImage";
import BizzAmount from "@/components/common/BizzAmount";

interface RoomProductCardProps {
  product: LiveRoomItem;
}

export default function RoomProductCard({ product }: RoomProductCardProps) {
  console.log("product", product);
  return (
    <div className="relative h-full">
      {product && (
        <div
          key={product.id}
          className="border-border-main bg-content-area shadow-flat-dark flex h-full w-full flex-col rounded-md border"
        >
          <div className="relative aspect-214/134 w-full overflow-hidden rounded-[3px] p-1.5">
            <BaseImage src={product.image} alt="카드 이미지" />
          </div>

          <div className="text-title-main-dark mt-1.5 flex w-full flex-col px-2 pb-2">
            <p className="text-[11px] opacity-60">시작가</p>

            <BizzAmount
              amount={product.amount}
              className="text-custom-orange-dark text-[14px] leading-tight font-bold"
            />

            <p className="mt-0.5 line-clamp-1 text-[13px]">{product.title}</p>
          </div>
        </div>
      )}
    </div>
  );
}

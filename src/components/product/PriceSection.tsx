import Link from "next/link";
import BizzAmount from "../common/BizzAmount";
import Button from "../common/Button";
import { getDigitLength } from "@/utils/product";

interface PriceSectionProps {
  path: string;
  product: ProductDetail;
}

export default function PriceSection({ path, product }: PriceSectionProps) {
  const currentLen = getDigitLength(product.currentPrice);
  const buyNowLen = product.type === "DELAYED" ? getDigitLength(product.buyNowPrice) : 0;
  const shouldStack = Math.max(currentLen, buyNowLen) >= 12;

  return (
    <div className="bg-content-gray border-border-sub2 flex items-end justify-between gap-6 rounded-xl border p-5">
      {/* 가격 영역 */}
      <div className={shouldStack ? "flex flex-col gap-4" : "flex items-center gap-8"}>
        {/* 입찰가 */}
        <div>
          <p className="text-title-sub2 text-sm">입찰가</p>
          <div className="mt-1">
            <BizzAmount
              amount={product.currentPrice}
              iconSize="lg"
              className="text-title-main-dark text-2xl font-bold lg:text-3xl"
            />
          </div>
        </div>

        {/* 가로일 때만 구분선 */}
        {!shouldStack && product.type === "DELAYED" && (
          <div className="border-border-sub2 h-10 rotate-15 border" />
        )}

        {/* 즉시 구매가 */}
        {product.type === "DELAYED" && (
          <div>
            <p className="text-title-sub2 text-sm">즉시 구매가</p>
            <div className="mt-1">
              <BizzAmount
                amount={product.buyNowPrice}
                iconSize="lg"
                className="text-title-main-dark text-2xl font-bold lg:text-3xl"
              />
            </div>
          </div>
        )}
      </div>

      {/* 경매 기록 버튼 */}
      {product.type === "DELAYED" && (
        <div className="flex shrink-0 items-end">
          <Link href={`${path}/bidsLog`}>
            <Button size="sm" className="whitespace-nowrap">
              경매 기록
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

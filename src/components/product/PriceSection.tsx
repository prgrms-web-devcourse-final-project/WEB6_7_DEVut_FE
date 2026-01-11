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
    <div className="bg-content-gray border-border-sub2 rounded-xl border p-5">
      <div className="flex flex-col gap-4 lg:hidden">
        <div className={shouldStack ? "flex flex-col gap-4" : "flex items-center gap-8"}>
          <div>
            <p className="text-title-sub2 text-sm">입찰가</p>
            <div className="mt-1">
              <BizzAmount
                amount={product.currentPrice}
                iconSize="lg"
                className="text-title-main-dark text-2xl font-bold"
              />
            </div>
          </div>

          {!shouldStack && product.type === "DELAYED" && (
            <div className="border-border-sub2 h-10 rotate-15 border" />
          )}

          {product.type === "DELAYED" && (
            <div>
              <p className="text-title-sub2 text-sm">즉시 구매가</p>
              <div className="mt-1">
                <BizzAmount
                  amount={product.buyNowPrice}
                  iconSize="lg"
                  className="text-title-main-dark text-2xl font-bold"
                />
              </div>
            </div>
          )}
        </div>

        {product.type === "DELAYED" && (
          <>
            <div className="border-border-sub2 border-t" />
            <Link href={`${path}/bidsLog`} className="w-full">
              <Button size="sm" className="w-full">
                경매 기록
              </Button>
            </Link>
          </>
        )}
      </div>

      <div className="hidden items-end justify-between gap-6 lg:flex">
        <div className={shouldStack ? "flex flex-col gap-4" : "flex items-center gap-8"}>
          <div>
            <p className="text-title-sub2 text-sm">입찰가</p>
            <div className="mt-1">
              <BizzAmount
                amount={product.currentPrice}
                iconSize="lg"
                className="text-title-main-dark text-3xl font-bold"
              />
            </div>
          </div>

          {!shouldStack && product.type === "DELAYED" && (
            <div className="border-border-sub2 h-10 rotate-15 border" />
          )}

          {product.type === "DELAYED" && (
            <div>
              <p className="text-title-sub2 text-sm">즉시 구매가</p>
              <div className="mt-1">
                <BizzAmount
                  amount={product.buyNowPrice}
                  iconSize="lg"
                  className="text-title-main-dark text-3xl font-bold"
                />
              </div>
            </div>
          )}
        </div>

        {product.type === "DELAYED" && (
          <Link href={`${path}/bidsLog`}>
            <Button size="sm" className="whitespace-nowrap">
              경매 기록
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

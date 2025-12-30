"use client";

import Button from "../common/Button";
import ContentContainer from "../common/ContentContainer";
import { useRouter } from "next/navigation";
import BizzAmount from "../common/BizzAmount";
import { getCategoryLabel } from "@/utils/category";
import { statusMapping } from "@/utils/product";
import { MessageCircle, SquarePen, Star } from "lucide-react";
import { formatDateTime } from "@/utils/date";
import { useState } from "react";
import { useProductDetail } from "@/features/product/hooks/useProductDetail";

import dynamic from "next/dynamic";
import ProductImageCarouselSkeleton from "../skeleton/product/ProductImageCarouselSkeleton";
import DelayedBidSection from "./DelayedBidSection";
import DelayedEndTimer from "./DelayedEndTimer";
import DelayedBuyNowSection from "./DelayedBuyNowSection";

const ProductImageCarousel = dynamic(() => import("./ProductImageCarousel"), {
  ssr: false,
  loading: () => <ProductImageCarouselSkeleton />,
});

interface ProductInfo {
  initialProduct: ProductDetail;
  me: User | null;
}

export default function ProductInfo({ initialProduct, me }: ProductInfo) {
  const { data: product, isLoading, isError } = useProductDetail(initialProduct);
  const route = useRouter();
  const [isBidOpen, setIsBidOpen] = useState(false);
  const [isBuyNowOpen, setIsBuyNowOpen] = useState(false);

  // 추후 리팩토링 (DTO 통합)
  const path = product?.type === "LIVE" ? `/product/live/${product.id}` : `/product/${product?.id}`;
  const sellerId = product?.type === "LIVE" ? product.sellerId : product?.sellerUserId;
  const currentPrice = product?.type === "LIVE" ? 1000000 : product?.currentPrice;

  if (isLoading) return <div>상품 정보를 불러오는 중...</div>;
  if (isError) return <div>상품 정보를 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <div className="mx-auto flex h-fit w-[98%] max-w-[1440px] flex-col gap-7 pb-10">
      <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-stretch">
        <ProductImageCarousel images={product?.images} className="w-full" />

        <div className="flex flex-col gap-5 lg:h-full">
          <div className="flex flex-col gap-5">
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-title-main-dark text-2xl leading-snug font-bold lg:text-3xl">
                {product?.name}
              </h1>

              <span className="bg-btn-active border-border-sub2 rounded-full border px-3 py-1 text-xs whitespace-nowrap text-white">
                {getCategoryLabel(product?.category)}
              </span>
            </div>

            <div className="bg-content-gray border-border-sub2 flex justify-between rounded-xl border p-5">
              <div className="flex h-full items-center gap-8">
                <div>
                  <p className="text-title-sub2 text-sm">현재가</p>

                  <div className="mt-2 flex items-end justify-between">
                    <BizzAmount
                      amount={currentPrice || 100000}
                      iconSize="lg"
                      className="text-title-main-dark text-2xl font-bold lg:text-3xl"
                    />
                  </div>
                </div>
                {product?.type === "DELAYED" && (
                  <>
                    <div className="border-border-sub2 h-[50%] rotate-15 border" />
                    <div>
                      <p className="text-title-sub2 text-sm">즉시 구매가</p>

                      <div className="mt-2 flex items-end justify-between">
                        <BizzAmount
                          amount={product?.buyNowPrice}
                          iconSize="lg"
                          className="text-title-main-dark text-2xl font-bold lg:text-3xl"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-end">
                <Button size="sm" onClick={() => route.push(`${path}/bidsLog`)}>
                  경매 기록
                </Button>
              </div>
            </div>

            <div className="border-border-sub2 rounded-xl border p-4 py-5 text-sm lg:text-base">
              <div className="grid grid-cols-[80px_1fr] gap-x-3 gap-y-5">
                <div className="text-title-sub">상품상태</div>
                <div className="text-title-main-dark">
                  {statusMapping(product?.itemStatus || "NEW")}
                </div>

                <div className="text-title-sub">배송비</div>
                <div className="text-title-main-dark">
                  {product?.deliveryInclude ? "포함" : "미포함"}
                </div>

                <div className="text-title-sub">장소</div>
                <div className="text-title-main-dark">{`${product?.region} / ${product?.preferredPlace}`}</div>

                {product?.type === "DELAYED" && product.startPrice && (
                  <>
                    <div className="text-title-sub">시작가</div>
                    <div className="text-title-main-dark">
                      {product?.startPrice.toLocaleString()}
                    </div>
                  </>
                )}

                {product?.type === "LIVE" && (
                  <>
                    <div className="text-title-sub font-bold">라이브 시작</div>
                    <div className="text-title-main-dark">
                      {formatDateTime(product?.liveTime || "")}
                    </div>
                  </>
                )}

                {product?.type === "DELAYED" && <DelayedEndTimer endTime={product?.endTime} />}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-3">
            <Button className="flex-1" leftIcon={<Star />}>
              찜 {product?.likeCount}
            </Button>
            {/* 라이브 */}
            {product?.type === "LIVE" && (
              <>
                {product?.auctionStatus === "BEFORE_BIDDING" && (
                  <Button className="flex-1" disabled>
                    라이브 준비중
                  </Button>
                )}

                {product?.auctionStatus === "IN_PROGRESS" && (
                  <Button className="bg-custom-orange flex-1 text-white">라이브 입장하기</Button>
                )}

                {["PAYMENT_PENDING", "IN_DEAL", "PURCHASE_CONFIRMED", "FAILED"].includes(
                  product?.auctionStatus || ""
                ) && (
                  <Button className="flex-1" disabled>
                    라이브 종료
                  </Button>
                )}
              </>
            )}

            {/* 지연(일반), 본인이 등록한 물건일 때 disable */}
            {product?.type === "DELAYED" && (
              <>
                <DelayedBidSection
                  productId={product.id}
                  isOpen={isBidOpen}
                  modalToggle={(bool: boolean) => {
                    setIsBidOpen(bool);
                    setIsBuyNowOpen(false);
                  }}
                  currentBid={product.currentPrice}
                  auctionStatus={product.auctionStatus}
                />

                <DelayedBuyNowSection
                  productId={product.id}
                  isOpen={isBuyNowOpen}
                  modalToggle={(bool: boolean) => {
                    setIsBuyNowOpen(bool);
                    setIsBidOpen(false);
                  }}
                  buyNowPrice={product.buyNowPrice}
                  auctionStatus={product.auctionStatus}
                />
              </>
            )}

            {me?.id === sellerId ? (
              <Button
                className="flex-1"
                leftIcon={<SquarePen size={18} />}
                onClick={() => route.push(`${path}/modify`)}
              >
                수정하기
              </Button>
            ) : (
              <Button className="flex-1" leftIcon={<MessageCircle size={18} />}>
                대화하기
              </Button>
            )}
          </div>
        </div>
      </div>

      <ContentContainer className="bg-content-area text-title-main border-border-main/10 shadow-flat-light w-full p-5 text-xl md:w-full">
        {product?.description}
      </ContentContainer>
    </div>
  );
}

"use client";

import Button from "../common/Button";
import ContentContainer from "../common/ContentContainer";
import { useRouter } from "next/navigation";
import BizzAmount from "../common/BizzAmount";
import { getCategoryLabel } from "@/utils/category";
import { statusMapping } from "@/utils/product";
import { MessageCircle, Star } from "lucide-react";
import ProductImageCarousel from "./ProductImageCarousel";
import { formatDateTime } from "@/utils/date";
import { useState } from "react";
import { BiddingSectionModal } from "./BiddingSectionModal";
import { useProductDetail } from "@/features/product/hooks/useProductDetail";

interface ProductInfo {
  initialProduct: ProductDetail;
}

export default function ProductInfo({ initialProduct }: ProductInfo) {
  const { data: product, isLoading, isError } = useProductDetail(initialProduct);
  const route = useRouter();
  const [isBidOpen, setIsBidOpen] = useState(false);

  console.log(product);

  if (isLoading) return <div>상품 정보를 불러오는 중...</div>;
  if (isError) return <div>상품 정보를 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <div className="mx-auto flex h-fit w-[98%] max-w-[1440px] flex-col gap-7 pb-10">
      <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-stretch">
        <ProductImageCarousel images={product?.images} className="w-full" />

        <div className="flex flex-col gap-5 md:h-full md:justify-between">
          <div className="flex flex-col gap-5">
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-title-main-dark text-2xl leading-snug font-bold md:text-3xl">
                {product?.name}
              </h1>

              <span className="bg-btn-active border-border-sub2 rounded-full border px-3 py-1 text-xs whitespace-nowrap text-white">
                {getCategoryLabel(product?.category)}
              </span>
            </div>

            <div className="bg-content-gray border-border-sub2 rounded-xl border p-5">
              <p className="text-title-sub2 text-sm">현재가</p>

              <div className="mt-2 flex items-end justify-between">
                <BizzAmount
                  amount={1000000}
                  iconSize="lg"
                  className="text-title-main-dark text-2xl font-bold md:text-3xl"
                />

                <Button
                  size="sm"
                  onClick={() => {
                    const logPath =
                      product.type === "LIVE"
                        ? `/product/live/${product.id}/bidsLog`
                        : `/product/${product.id}/bidsLog`;

                    route.push(logPath);
                  }}
                >
                  경매 기록
                </Button>
              </div>
            </div>

            <div className="border-border-sub2 rounded-xl border p-4 py-5 text-sm md:text-base">
              <div className="grid grid-cols-[80px_1fr] gap-x-3 gap-y-5">
                <div className="text-title-sub font-bold">상품상태</div>
                <div className="text-title-main-dark">
                  {statusMapping(product?.itemStatus || "NEW")}
                </div>

                <div className="text-title-sub font-bold">배송비</div>
                <div className="text-title-main-dark">
                  {product?.deliveryInclude ? "포함" : "미포함"}
                </div>

                <div className="text-title-sub font-bold">지역</div>
                <div className="text-title-main-dark">{product?.region}</div>

                <div className="text-title-sub font-bold">직거래</div>
                <div className="text-title-main-dark">{product?.preferredPlace}</div>

                {product.type === "LIVE" && (
                  <>
                    <div className="text-title-sub font-bold">라이브 시작</div>
                    <div className="text-title-main-dark">
                      {formatDateTime(product?.liveTime || "")}
                    </div>
                  </>
                )}

                {product.type === "DELAYED" && (
                  <>
                    <div className="text-title-sub font-bold">마감 시간</div>
                    <div className="text-title-main-dark">
                      {formatDateTime(product?.endTime || "")}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button className="flex-1" leftIcon={<Star />}>
              찜 {product?.likeCount}
            </Button>
            {/* 라이브 */}
            {product.type === "LIVE" && (
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

            {/* 지연(일반) */}
            {product.type === "DELAYED" && (
              <>
                <BiddingSectionModal
                  isOpen={isBidOpen}
                  onClose={() => setIsBidOpen(false)}
                  currentBid={1000000}
                  minBid={1000000}
                  onConfirmBid={() => {}}
                />
                <Button
                  className="bg-custom-brown flex-1 text-white"
                  onClick={() => setIsBidOpen(true)}
                >
                  입찰하기
                </Button>
              </>
            )}

            {/* 내가 등록한 물품이면 수정하기 버튼으로.. */}
            <Button className="flex-1" leftIcon={<MessageCircle size={18} />}>
              대화하기
            </Button>
          </div>
        </div>
      </div>

      <ContentContainer className="bg-content-area text-title-main border-border-main/10 shadow-flat-light w-full p-5 text-xl md:w-full">
        {product?.description}
      </ContentContainer>
    </div>
  );
}

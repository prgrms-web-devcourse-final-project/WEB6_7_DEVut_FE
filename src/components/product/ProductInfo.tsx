"use client";

import WrapperImage from "../common/WrapperImage";
import test from "@/assets/vintage.png";
import Button from "../common/Button";
import ContentContainer from "../common/ContentContainer";
import { useRouter } from "next/navigation";
import BizzAmount from "../common/BizzAmount";
import { useLiveProductDetail } from "@/features/product/hooks/useLiveProductDetail";

export default function ProductInfo({ productId }: { productId: string }) {
  const { data, isLoading, isError } = useLiveProductDetail(Number(productId));

  console.log("상품 상세: ", data);

  const route = useRouter();

  return (
    <div className="mx-auto flex h-fit w-[95%] max-w-[1440px] flex-col gap-7 pb-10">
      <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2">
        <WrapperImage src={test} alt="test" className="aspect-square" />
        <div className="flex flex-col gap-5 lg:sticky lg:top-24">
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-title-main-dark text-2xl leading-snug font-bold md:text-3xl">
              귀멸의 칼날 한정판 무이치로 피규어
            </h1>

            <span className="bg-btn-active border-border-sub2 rounded-full border px-3 py-1 text-xs whitespace-nowrap text-white">
              엔터테인먼트
            </span>
          </div>

          <div className="bg-content-gray border-border-sub2 rounded-xl border p-5">
            <p className="text-title-sub2 text-sm">현재가</p>

            <div className="mt-2 flex items-end justify-between">
              <BizzAmount
                amount={120000}
                iconSize={"lg"}
                className="text-title-main-dark text-2xl font-bold md:text-3xl"
              />

              <Button size="sm" onClick={() => route.push(`/product/${productId}/bidsLog`)}>
                경매 기록
              </Button>
            </div>
          </div>

          <div className="border-border-sub2 rounded-xl border p-5 text-sm md:text-base">
            <dl className="grid grid-cols-2 gap-y-4">
              <dt className="text-title-sub font-bold">상품상태</dt>
              <dd className="text-title-main-dark">새상품</dd>

              <dt className="text-title-sub font-bold">사이즈</dt>
              <dd className="text-title-main-dark">Free</dd>

              <dt className="text-title-sub font-bold">배송비</dt>
              <dd className="text-title-main-dark">포함</dd>

              <dt className="text-title-sub font-bold">직거래</dt>
              <dd className="text-title-main-dark">대전광역시 유성구</dd>
            </dl>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1">찜 21</Button>
            <Button className="bg-custom-orange flex-1 text-white">라이브 입장하기</Button>
            <Button className="flex-1">대화하기</Button>
          </div>
        </div>
      </div>
      <ContentContainer className="bg-content-area text-title-main border-border-main/10 shadow-flat-light w-full p-5 text-xl">
        올초에 일본여행 갔을 때 피규어샵에서 구매했습니다. 사고나서 포장도 안 뜯었어요~ 많관부많관부
      </ContentContainer>
    </div>
  );
}

"use client";

import WrapperImage from "../common/WrapperImage";
import test from "@/assets/vintage.png";
import Button from "../common/Button";
import ContentContainer from "../common/ContentContainer";
import { useRouter } from "next/navigation";

export default function ProductInfo({ productId }: { productId: string }) {
  const route = useRouter();

  return (
    <div className="flex h-fit flex-col gap-7 pb-10">
      <div className="mt-2 grid grid-cols-1 gap-6 px-8 md:grid-cols-[minmax(0,450px)_1fr]">
        <WrapperImage src={test} alt="test" className="aspect-5/3 md:aspect-square" />
        <div className="relative flex flex-col gap-4 lg:sticky lg:top-24">
          <div className="flex min-h-[50px] items-start justify-between gap-2">
            <h1 className="text-title-main-dark text-3xl leading-snug font-bold">
              귀멸의 칼날 한정판 무이치로 피규어
            </h1>

            <span className="bg-btn-active border-border-sub2 rounded-full border-2 px-3 py-1 text-xs font-normal whitespace-nowrap text-white">
              엔터테인먼트
            </span>
          </div>

          <div className="bg-content-gray border-border-sub2 rounded-xl border-2 p-4 px-6">
            <p className="text-title-sub2 text-sm">현재가</p>

            <div className="mt-1 flex items-end justify-between gap-2">
              <p className="text-title-main-dark text-2xl">252,000</p>

              <Button
                className="border-border-sub2 h-10 w-[100px] border-[3px] text-sm"
                label="경매 기록"
              />
            </div>
          </div>

          <div className="text-title-sub border-border-sub2 grid grid-cols-[2fr_8fr] gap-x-[clamp(12px,2vw,24px)] gap-y-4 rounded-xl border-2 p-5 px-6 text-lg font-bold whitespace-nowrap">
            <span>상품상태</span>
            <span className="text-title-main-dark">새상품</span>

            <span>사이즈</span>
            <span className="text-title-main-dark">Free</span>

            <span>배송비</span>
            <span className="text-title-main-dark">포함</span>

            <span>직거래</span>
            <span className="text-title-main-dark">대전광역시 유성구</span>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1" label="찜 21" />
            <Button className="bg-custom-orange flex-2 text-white" label="라이브 입장하기" />
            <Button className="flex-1" label="대화 하기" />
          </div>
        </div>
      </div>
      <ContentContainer className="bg-content-area text-title-main border-border-main/10 shadow-flat-light p-5 text-xl">
        올초에 일본여행 갔을 때 피규어샵에서 구매했습니다. 사고나서 포장도 안 뜯었어요~ 많관부많관부
      </ContentContainer>
    </div>
  );
}

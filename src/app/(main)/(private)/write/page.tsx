"use client";
import Category from "@/components/common/Category";
import ContentContainer from "@/components/common/ContentContainer";
import Input from "@/components/common/Input";
import PagePrevArea from "@/components/common/PagePrevArea";
import Textarea from "@/components/common/TextArea";
import { useState } from "react";
export default function WritePage() {
  const [title, setTitle] = useState("");

  return (
    <>
      <PagePrevArea title="경매 게시물 작성" />
      <ContentContainer className="flex flex-col gap-5 p-8">
        <div>
          <p className="text-title-sub text-2xl">상품 정보</p>
        </div>
        <div className="space-y-2">
          <p className="text-title-sub2 text-lg">상품명</p>
          <Input
            placeholder="상품명을 입력해주세요"
            maxLength={40}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <p className="text-title-sub2 text-lg">카테고리</p>
          <Category />
        </div>
        <div className="space-y-2">
          <p className="text-title-sub2 text-lg">상품상태</p>
          <label htmlFor="new" className="flex cursor-pointer items-center gap-1">
            <input
              className="border-border-sub checked:border-border-sub2 size-5 cursor-pointer appearance-none rounded-full border-[3px] checked:bg-[radial-gradient(circle,_var(--color-border-sub2)_40%,_transparent_41%)]"
              type="radio"
              id="new"
              name="condition"
            />
            <span className="text-title-main text-xl">
              새 상품 (미사용){" "}
              <span className="text-border-sub text-[16px]">미개봉, 사용하지 않은 새 상품</span>
            </span>
          </label>
          <label htmlFor="good" className="flex cursor-pointer items-center gap-1">
            <input
              className="border-border-sub checked:border-border-sub2 size-5 cursor-pointer appearance-none rounded-full border-[3px] checked:bg-[radial-gradient(circle,_var(--color-border-sub2)_40%,_transparent_41%)]"
              type="radio"
              id="good"
              name="condition"
            />
            <span className="text-title-main text-xl">
              사용감 적음 (중고){" "}
              <span className="text-border-sub text-[16px]">
                눈에 띄는 흔적이나 얼룩이 약간 있음
              </span>
            </span>
          </label>

          <label htmlFor="bad" className="flex cursor-pointer items-center gap-1">
            <input
              className="border-border-sub checked:border-border-sub2 size-5 cursor-pointer appearance-none rounded-full border-[3px] checked:bg-[radial-gradient(circle,_var(--color-border-sub2)_40%,_transparent_41%)]"
              type="radio"
              id="bad"
              name="condition"
            />
            <span className="text-title-main text-xl">
              사용감 많음 (중고){" "}
              <span className="text-border-sub text-[16px]">
                눈에 띄는 흔적이나 얼룩이 많이 있음
              </span>
            </span>
          </label>
        </div>
        <div className="space-y-2">
          <p className="text-title-sub2 text-lg">설명</p>
          <Textarea />
        </div>
      </ContentContainer>
    </>
  );
}

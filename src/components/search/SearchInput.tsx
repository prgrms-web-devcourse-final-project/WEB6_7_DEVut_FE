"use client";
import { useState } from "react";
import Input from "../common/Input";
import { FileSearch, Search } from "lucide-react";
import { twMerge } from "tailwind-merge";
import OptionDropdown from "../common/OptionDropdown";

type Props = {
  onOpenDetail: () => void;
};

export default function SearchInput({ onOpenDetail }: Props) {
  const [onSell, setOnSell] = useState(false);
  const [status, setStatus] = useState("전체");
  return (
    <div className="flex w-full flex-wrap items-center gap-4">
      {/* 검색 인풋 */}
      <div className="relative flex min-h-[58px] w-full lg:flex-1">
        <Input placeholder="상품명을 입력해주세요" className="pr-25" />
        <div className="text-custom-dark-brown absolute top-3 right-2">
          <button
            onClick={onOpenDetail}
            className="border-custom-brown mr-3 cursor-pointer border-r px-3"
          >
            <FileSearch size={30} />
          </button>
          <button className="cursor-pointer transition-all hover:scale-110 active:scale-95">
            <Search size={30} />
          </button>
        </div>
      </div>

      {/* 판매중 토글 */}
      <div className="flex shrink-0 items-center gap-3">
        <p className="text-custom-dark-brown text-[18px] whitespace-nowrap">판매중인 상품만 보기</p>
        <div
          className={twMerge(
            "border-custom-dark-brown relative h-8 w-14 cursor-pointer rounded-full border-4",
            onSell && "bg-custom-orange-dark"
          )}
          onClick={() => setOnSell(prev => !prev)}
        >
          <div
            className={twMerge(
              "border-custom-dark-brown bg-custom-orange absolute top-1/2 left-0 h-6 w-6 -translate-y-1/2 rounded-full border-4",
              "transition-transform duration-300 ease-in-out",
              onSell && "translate-x-7"
            )}
          />
        </div>
      </div>

      {/* 정렬 드롭다운 */}
      <div className="min-w-[106px] shrink-0">
        <OptionDropdown label={status}>
          <OptionDropdown.Item onClick={() => setStatus("전체")}>전체</OptionDropdown.Item>
          <OptionDropdown.Item onClick={() => setStatus("라이브")}>라이브</OptionDropdown.Item>
          <OptionDropdown.Item onClick={() => setStatus("지연")}>지연</OptionDropdown.Item>
        </OptionDropdown>
      </div>
    </div>
  );
}

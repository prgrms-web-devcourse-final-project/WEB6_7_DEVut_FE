"use client";
import { useState } from "react";
import Input from "../common/Input";
import { FileSearch, Search, SlidersHorizontal } from "lucide-react";
import { twMerge } from "tailwind-merge";
import OptionDropdown from "../common/OptionDropdown";
import Toast, { ToastType } from "../common/Toast";
import SellingToggle from "./SellingToggle";

interface SearchSectionProps {
  onOpenDetail: () => void;
  onSearch: (name: string) => void;
  auctionType: "전체" | "라이브" | "일반";
  onChangeAuctionType: (type: "전체" | "라이브" | "일반") => void;
  handleIsSelling: () => void;
  isSelling: boolean;
}

export default function SearchSection({
  onSearch,
  onOpenDetail,
  auctionType,
  onChangeAuctionType,
  handleIsSelling,
  isSelling,
}: SearchSectionProps) {
  const [searchText, setSearchText] = useState("");
  const notify = (message: string, type: ToastType) => Toast({ message, type });

  const handleSearch = () => {
    if (searchText.trim() === "") {
      notify("검색어를 입력해주세요.", "ERROR");
      return;
    }
    onSearch(searchText);
  };

  return (
    <div className="flex w-full flex-wrap items-center gap-5 gap-y-3">
      <div className="relative flex min-h-[58px] w-full lg:flex-1">
        <Input
          placeholder="상품명을 입력해주세요"
          className="pr-25"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.preventDefault();
              onSearch(searchText);
            }
          }}
        />
        <div className="text-custom-dark-brown absolute top-3 right-2">
          <button
            onClick={onOpenDetail}
            className="border-custom-brown mr-3 cursor-pointer border-r px-3"
          >
            <SlidersHorizontal size={30} />
          </button>
          <button
            onClick={handleSearch}
            className="cursor-pointer transition-all hover:scale-110 active:scale-95"
          >
            <Search size={30} />
          </button>
        </div>
      </div>

      <SellingToggle isSelling={isSelling} handleIsSelling={handleIsSelling} />

      {/* <div className="min-w-[106px] shrink-0">
        <OptionDropdown label={auctionType}>
          <OptionDropdown.Item onClick={() => onChangeAuctionType("전체")}>
            전체
          </OptionDropdown.Item>
          <OptionDropdown.Item onClick={() => onChangeAuctionType("라이브")}>
            라이브
          </OptionDropdown.Item>
          <OptionDropdown.Item onClick={() => onChangeAuctionType("일반")}>
            일반
          </OptionDropdown.Item>
        </OptionDropdown>
      </div> */}
    </div>
  );
}

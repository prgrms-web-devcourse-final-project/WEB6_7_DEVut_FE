"use client";
import { useState } from "react";
import Input from "../common/Input";
import { FileSearch, Search } from "lucide-react";
import { twMerge } from "tailwind-merge";
import OptionDropdown from "../common/OptionDropdown";
import Toast, { ToastType } from "../common/Toast";

interface SearchSectionProps {
  onOpenDetail: () => void;
  onSearch: (name: string) => void;
}

export default function SearchSection({ onSearch, onOpenDetail }: SearchSectionProps) {
  const [searchText, setSearchText] = useState("");
  const [onSell, setOnSell] = useState(false);
  const [status, setStatus] = useState("라이브");
  const notify = (message: string, type: ToastType) => Toast({ message, type });

  const handleSearch = () => {
    if (searchText.trim() === "") {
      notify("검색어를 입력해주세요.", "ERROR");
      return;
    }
    onSearch(searchText);
  };

  return (
    <div className="flex w-full flex-wrap items-center gap-4">
      <div className="relative flex min-h-[58px] w-full lg:flex-1">
        <Input
          placeholder="상품명을 입력해주세요"
          className="pr-25"
          value={searchText}
          maxLength={20}
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
            <FileSearch size={30} />
          </button>
          <button
            onClick={handleSearch}
            className="cursor-pointer transition-all hover:scale-110 active:scale-95"
          >
            <Search size={30} />
          </button>
        </div>
      </div>

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

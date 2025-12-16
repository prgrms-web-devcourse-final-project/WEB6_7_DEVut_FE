import { Search, X } from "lucide-react";
import Category from "../common/Category";
import Input from "../common/Input";
import Image from "next/image";
import hyphen from "@/assets/modal/hyphen.svg";
import Button from "../common/Button";
import { PriceSlider } from "./PriceSlider";
import { OptionCheckbox } from "./OptionCheckbox";
import PriceInput from "../common/PriceInput";
import ContentContainer from "../common/ContentContainer";
import { useState } from "react";

interface DetailSearchProps {
  onClose: () => void;
  onSearch: (detailParams: SearchParams) => void;
}

export default function DetailSearch({ onClose, onSearch }: DetailSearchProps) {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<CategoryKey | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300000]);
  const [minPrice, maxPrice] = priceRange;

  const handleSearch = () => {
    onSearch({
      name: searchText || "",
      category: category || undefined,
      minBidPrice: minPrice,
      maxBidPrice: maxPrice,
      page: 1,
      size: 15,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
      <div className="border-custom-dark-brown bg-bg-main shadow-flat-light relative w-full max-w-[720px] rounded-2xl border-4">
        <button className="absolute top-2 right-0 mr-3 cursor-pointer" onClick={onClose}>
          <X size={30} className="text-border-main" />
        </button>
        <div className="flex max-h-[90vh] flex-col gap-10 overflow-y-auto p-10">
          <div className="relative flex min-h-[58px] w-full">
            <Input
              placeholder="상품명을 입력해주세요"
              className="pr-25"
              value={searchText}
              maxLength={20}
              onChange={e => setSearchText(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
            />
            <div className="text-custom-dark-brown absolute top-3 right-2">
              <button
                onClick={handleSearch}
                className="cursor-pointer transition-all hover:scale-110 active:scale-95"
              >
                <Search size={30} />
              </button>
            </div>
          </div>

          <div>
            <p className="text-border-main mb-6 text-[20px]">카테고리</p>
            <ContentContainer bordered={false} className="min-h-0 w-full">
              <div className="mx-auto max-w-[1000px] px-3">
                <div className="mx-auto w-full max-w-[900px] px-3">
                  <Category
                    name="delayProducts"
                    value={category}
                    onChange={setCategory}
                    size="md"
                    className="flex gap-2 overflow-x-auto whitespace-nowrap sm:flex-wrap sm:justify-center"
                  />
                </div>
              </div>
            </ContentContainer>
          </div>

          <div>
            <p className="text-border-main mb-6 text-[20px]">입찰가</p>
            <div className="flex min-h-[58px] gap-20">
              <PriceInput
                placeholder="최소 금액"
                value={minPrice}
                onChange={(v: number) => setPriceRange([Math.min(v, maxPrice), maxPrice])}
                className="pr-12"
              />
              <Image src={hyphen} alt="하이픈" />
              <PriceInput
                placeholder="최대 금액"
                value={maxPrice}
                onChange={v => setPriceRange([minPrice, Math.max(v, minPrice)])}
                className="pr-12"
              />
            </div>
            <PriceSlider value={priceRange} onChange={setPriceRange} />
          </div>

          <div>
            <p className="text-border-main mb-6 text-[20px]">옵션</p>
            <OptionCheckbox />
          </div>

          <Button
            onClick={handleSearch}
            className="bg-custom-orange min-h-[55px] text-white shadow-[4px_4px_0px_#5C3A21]"
          >
            검색하기
          </Button>
        </div>
      </div>
    </div>
  );
}

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

type Props = {
  onClose: () => void;
};

export default function DetailSearch({ onClose }: Props) {
  const [category, setCategory] = useState<CategoryKey | null>(null);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
      <div className="border-custom-dark-brown bg-bg-main w-full max-w-[720px] rounded-2xl border-4 shadow-[4px_4px_0px_#5C3A21]">
        {/* 🔽 여기에서 스크롤 */}
        <div className="flex max-h-[90vh] flex-col gap-10 overflow-y-auto p-10">
          {/* 검색 인풋 */}
          <div className="relative flex min-h-[58px] w-full">
            <Input placeholder="상품명을 입력해주세요" className="pr-25" />
            <div className="text-custom-dark-brown absolute top-3 right-2">
              <button
                className="border-custom-brown mr-3 cursor-pointer border-r px-3"
                onClick={onClose}
              >
                <X size={30} />
              </button>
              <button className="cursor-pointer transition-all hover:scale-110 active:scale-95">
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
              <PriceInput placeholder="최소 금액" className="pr-12" />
              <Image src={hyphen} alt="하이픈" />
              <PriceInput placeholder="최대 금액" className="pr-12" />
            </div>
            <PriceSlider />
          </div>

          <div>
            <p className="text-border-main mb-6 text-[20px]">옵션</p>
            <OptionCheckbox />
          </div>

          <Button className="bg-custom-orange min-h-[55px] shadow-[4px_4px_0px_#5C3A21]">
            적용하기
          </Button>
        </div>
      </div>
    </div>
  );
}

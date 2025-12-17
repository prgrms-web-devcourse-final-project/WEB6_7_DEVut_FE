"use client";

import { useState } from "react";
import Button from "@/components/common/Button";
import Category from "@/components/common/Category";
import ContentContainer from "@/components/common/ContentContainer";
import Input from "@/components/common/Input";
import PriceInput from "@/components/common/PriceInput";
import Textarea from "@/components/common/TextArea";
import ImageUploader from "@/components/write/ImageUploader";
import calendar from "@/assets/images/sidebar/calendar.png";
import Image from "next/image";
import { DayPicker } from "react-day-picker";
import { formatYmd } from "@/utils/date";
import ItemStatusRadio from "./ItemStatusRadio";
import { useCreateAuctionProduct } from "@/features/auction/hooks/useCreateAuctionProduct";
import Toast, { ToastType } from "../common/Toast";
import { useUploadImages } from "@/features/image/hooks/useUploadImages";
import { useRouter } from "next/navigation";

type AuctionKind = "live" | "delay";
export default function WriteForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<CategoryKey | null>(null);
  const [condition, setCondition] = useState<ItemCondition>("NEW");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [startPrice, setStartPrice] = useState(0);
  const [deliveryInclude, setDeliveryInclude] = useState(true);
  const [auctionKind, setAuctionKind] = useState<AuctionKind>("live");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const notify = (message: string, type: ToastType) => Toast({ message, type });
  const router = useRouter();

  const { uploadImages, isUploading } = useUploadImages();
  const { mutate, isPending } = useCreateAuctionProduct();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!category) {
      notify("카테고리를 선택해주세요.", "ERROR");
      return;
    }
    if (!title.trim()) {
      notify("상품명을 입력해주세요.", "ERROR");
      return;
    }
    if (startPrice <= 0) {
      notify("경매 시작가를 올바르게 입력해주세요.", "ERROR");
      return;
    }
    // if (auctionKind === "delay" && !endDate) return;
    if (images.length === 0) {
      notify("최소 한 장의 이미지를 업로드해주세요.", "ERROR");
      return;
    }

    const imageUrls = await uploadImages(images, "auctions");

    mutate(
      {
        name: title,
        category,
        itemStatus: condition,
        description,
        initPrice: startPrice,
        deliveryInclude,
        liveTime: auctionKind === "live" ? "2025-12-20T15:30:00" : (endDate?.toISOString() ?? ""),
        directDealAvailable: true,
        region: "서울",
        preferredPlace: "강남역 1번 출구",
        images: imageUrls,
      },
      {
        onSuccess: data => {
          notify("상품이 성공적으로 등록되었습니다.", "SUCCESS");
          router.replace(`/product/live/${data.id}`);
        },
        onError: error => {
          notify("상품 등록에 실패했습니다. 다시 시도해주세요.", "ERROR");
          console.error("Error creating auction product:", error);
        },
      }
    );
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
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
            value={title}
          />
        </div>
        <div className="space-y-2">
          <p className="text-title-sub2 text-lg">카테고리</p>
          <Category
            name="categoryRadio"
            value={category}
            onChange={setCategory}
            className="flex gap-2 overflow-x-auto whitespace-nowrap sm:flex-wrap"
          />
        </div>
        <div className="space-y-2">
          <p className="text-title-sub2 text-lg">상품상태</p>
          <ItemStatusRadio condition={condition} setCondition={setCondition} />
        </div>
        <div className="space-y-2">
          <p className="text-title-sub2 text-lg">설명</p>
          <Textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="상품에 대한 설명을 자세히 적어주세요."
          />
        </div>
      </ContentContainer>

      <ContentContainer className="flex flex-col gap-5 p-8">
        <div>
          <p className="text-title-sub text-2xl">상품 이미지</p>
        </div>
        <ImageUploader files={images} onChange={setImages} />
      </ContentContainer>

      <ContentContainer className="flex flex-col gap-5 p-8">
        <div>
          <p className="text-title-sub text-2xl">기타</p>
        </div>
        <div className="space-y-2">
          <p className="text-title-sub2 text-lg">가격</p>
          <PriceInput
            placeholder="경매 시작가를 입력해주세요 (수정 불가)"
            onChange={setStartPrice}
            value={startPrice}
          />
        </div>
        <div className="space-y-2">
          <p className="text-title-sub2 text-lg">택배거래</p>
          <div className="flex items-center gap-4">
            <label htmlFor="delivery-include" className="flex cursor-pointer items-center gap-1">
              <input
                id="delivery-include"
                type="radio"
                name="delivery"
                className="border-border-sub checked:border-border-sub2 size-5 cursor-pointer appearance-none rounded-full border-[3px] checked:bg-[radial-gradient(circle,var(--color-border-sub2)_40%,transparent_41%)]"
                checked={deliveryInclude === true}
                onChange={() => setDeliveryInclude(true)}
              />
              <span className="text-title-main text-xl">배송비 포함</span>
            </label>

            <label htmlFor="delivery-exclude" className="flex cursor-pointer items-center gap-1">
              <input
                id="delivery-exclude"
                type="radio"
                name="delivery"
                className="border-border-sub checked:border-border-sub2 size-5 cursor-pointer appearance-none rounded-full border-[3px] checked:bg-[radial-gradient(circle,var(--color-border-sub2)_40%,transparent_41%)]"
                checked={deliveryInclude === false}
                onChange={() => setDeliveryInclude(false)}
              />
              <span className="text-title-main text-xl">배송비 별도</span>
            </label>
          </div>
          <hr className="my-4 h-0.5 border-0 bg-[repeating-linear-gradient(to_right,var(--color-border-sub)_0,var(--color-border-sub)_6px,transparent_6px,transparent_12px)]" />
          <p className="text-title-sub2 text-lg">경매방식</p>
          <div className="flex gap-4 sm:gap-8 lg:gap-20">
            <div className="grid w-full grid-cols-2 gap-4 sm:gap-8 lg:gap-20">
              <Button
                fullWidth={true}
                variant={auctionKind === "live" ? "selected" : "primary"}
                onClick={() => setAuctionKind("live")}
              >
                <span className="text-title-main text-xl whitespace-nowrap">라이브 경매</span>
              </Button>

              <Button
                fullWidth={true}
                variant={auctionKind === "delay" ? "selected" : "primary"}
                onClick={() => setAuctionKind("delay")}
              >
                <span className="text-title-main text-xl whitespace-nowrap">일반 경매</span>
              </Button>
            </div>
          </div>
          {auctionKind === "live" && (
            <>
              <p className="text-title-sub2 text-lg">시작 일시 선택</p>
              <div>
                <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:gap-20">
                  <div className="bg-content-gray text-title-sub border-border-sub2/20 inline-flex w-full cursor-not-allowed items-center justify-center rounded-lg border-3">
                    2025-12-20 15:30
                  </div>
                  <Button
                    fullWidth={true}
                    leftIcon={<Image className="size-5" src={calendar} alt="calendar" />}
                  >
                    시간표 보러가기
                  </Button>
                </div>
              </div>
            </>
          )}
          {auctionKind === "delay" && (
            <>
              <p className="text-title-sub2 text-lg">마감 일시 선택</p>
              <div>
                <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:gap-20">
                  <Button onClick={() => setCalendarOpen(prev => !prev)}>
                    {endDate ? formatYmd(endDate) : "날짜"}{" "}
                  </Button>
                  {calendarOpen && (
                    <div className="text-title-main absolute z-30 mt-2 rounded-xl bg-white p-4 shadow-2xl">
                      <DayPicker
                        mode="single"
                        selected={endDate}
                        disabled={{ before: new Date() }}
                        onSelect={date => {
                          if (!date) return;
                          setEndDate(date);
                          setCalendarOpen(false);
                        }}
                        classNames={{
                          day: "rounded-md transition-colors",
                          day_button:
                            "h-9 w-9 rounded-md transition-colors hover:bg-border-sub/20 hover:shadow-flat-light rounded-md",
                          disabled: "text-border-sub/40 cursor-not-allowed opacity-50",
                          selected: "bg-border-sub2 text-white hover:bg-border-sub2",
                          today: "ring ring-border-sub2 rounded-md",
                          caption: "flex relative items-center justify-between px-2",
                          caption_label: "text-lg flex font-black justify-center",
                          nav: "absolute inset-x-2 flex items-center justify-between gap-2",
                          nav_button: "size-8 rounded-md transition hover:bg-border-sub",
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          <div className="mt-12 flex w-full justify-end gap-5">
            <Button
              disabled={isUploading || isPending}
              className="bg-btn-active text-white"
              type="submit"
            >
              등록하기
            </Button>
            <Button className="bg-content-gray">등록취소</Button>
          </div>
        </div>
      </ContentContainer>
    </form>
  );
}

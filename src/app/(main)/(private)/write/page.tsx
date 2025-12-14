"use client";
import Button from "@/components/common/Button";
import Category from "@/components/common/Category";
import ContentContainer from "@/components/common/ContentContainer";
import Input from "@/components/common/Input";
import PagePrevArea from "@/components/common/PagePrevArea";
import PriceInput from "@/components/common/PriceInput";
import Textarea from "@/components/common/TextArea";
import ImageUploader from "@/components/write/ImageUploader";
import calendar from "@/assets/images/sidebar/calendar.png";
import { useState } from "react";
import Image from "next/image";
import { DayPicker } from "react-day-picker";

type Condition = "new" | "good" | "bad";
type Delivery = "inclusive" | "exclusive";
type AuctionKind = "live" | "delay";
export default function WritePage() {
  const [title, setTitle] = useState("");
  const [condition, setCondition] = useState<Condition>("new");
  const [delivery, setDelivery] = useState<Delivery>("inclusive");
  const [auctionKind, setAuctionKind] = useState<AuctionKind>("live");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [category, setCategory] = useState<CategoryKey | null>(null);

  const formatYmd = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  return (
    <div className="flex flex-col gap-8">
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
          <Category
            name="categoryRadio"
            value={category}
            onChange={setCategory}
            className="flex gap-2 overflow-x-auto whitespace-nowrap sm:flex-wrap"
          />
        </div>
        <div className="space-y-2">
          <p className="text-title-sub2 text-lg">상품상태</p>
          <label htmlFor="new" className="flex cursor-pointer items-center gap-1">
            <input
              className="border-border-sub checked:border-border-sub2 size-5 cursor-pointer appearance-none rounded-full border-[3px] checked:bg-[radial-gradient(circle,_var(--color-border-sub2)_40%,_transparent_41%)]"
              type="radio"
              id="new"
              name="condition"
              checked={condition === "new"}
              onChange={() => setCondition("new")}
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
              checked={condition === "good"}
              onChange={() => setCondition("good")}
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
              checked={condition === "bad"}
              onChange={() => setCondition("bad")}
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

      <ContentContainer className="flex flex-col gap-5 p-8">
        <div>
          <p className="text-title-sub text-2xl">상품 이미지</p>
        </div>
        <ImageUploader />
      </ContentContainer>

      <ContentContainer className="flex flex-col gap-5 p-8">
        <div>
          <p className="text-title-sub text-2xl">기타</p>
        </div>
        <div className="space-y-2">
          <p className="text-title-sub2 text-lg">가격</p>
          <PriceInput placeholder="경매 시작가를 입력해주세요 (수정 불가)" />
        </div>
        <div className="space-y-2">
          <p className="text-title-sub2 text-lg">택배거래</p>
          <div className="flex items-center gap-4">
            <label htmlFor="inclusive" className="flex cursor-pointer items-center gap-1">
              <input
                className="border-border-sub checked:border-border-sub2 size-5 cursor-pointer appearance-none rounded-full border-[3px] checked:bg-[radial-gradient(circle,_var(--color-border-sub2)_40%,_transparent_41%)]"
                type="radio"
                id="inclusive"
                name="delivery"
                checked={delivery === "inclusive"}
                onChange={() => setDelivery("inclusive")}
              />
              <span className="text-title-main text-xl">배송비 포함</span>
            </label>
            <label htmlFor="exclusive" className="flex cursor-pointer items-center gap-1">
              <input
                className="border-border-sub checked:border-border-sub2 size-5 cursor-pointer appearance-none rounded-full border-[3px] checked:bg-[radial-gradient(circle,_var(--color-border-sub2)_40%,_transparent_41%)]"
                type="radio"
                id="exclusive"
                name="delivery"
                checked={delivery === "exclusive"}
                onChange={() => setDelivery("exclusive")}
              />
              <span className="text-title-main text-xl">배송비 별도</span>
            </label>
          </div>
          <hr className="my-4 h-0.5 border-0 bg-[repeating-linear-gradient(to_right,_var(--color-border-sub)_0,_var(--color-border-sub)_6px,_transparent_6px,_transparent_12px)]" />
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
                    2025-12-14 15:30
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
        </div>
      </ContentContainer>
    </div>
  );
}

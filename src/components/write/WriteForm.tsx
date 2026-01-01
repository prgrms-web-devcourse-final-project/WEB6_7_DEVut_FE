"use client";

import { useState } from "react";
import Button from "@/components/common/Button";
import ContentContainer from "@/components/common/ContentContainer";
import Input from "@/components/common/Input";
import PriceInput from "@/components/common/PriceInput";
import ImageUploader from "@/components/write/ImageUploader";
import calendar from "@/assets/images/sidebar/calendar.png";
import Image from "next/image";
import { formatIsoDateTime, formatYmd, getAuctionTimeKey, getMinEndDate } from "@/utils/date";
import { useCreateAuctionProduct } from "@/features/auction/hooks/useCreateAuctionProduct";
import Toast, { ToastType } from "../common/Toast";
import { useUploadImages } from "@/features/image/hooks/useUploadImages";
import { useRouter } from "next/navigation";
import EndDatePicker from "./EndDatePicker";

import WriteBaseForm from "./WriteBaseForm";
import Modal from "@/components/common/Modal";
import WeeklySchedule from "@/components/schedule/WeeklySchedule";
import useNow from "../schedule/UpdateNow";
import { twMerge } from "tailwind-merge";
import DashDivider from "../common/DashDivider";

export default function WriteForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<CategoryKey | null>(null);
  const [condition, setCondition] = useState<ItemCondition>("NEW");
  const [description, setDescription] = useState("");
  const [region, setRegion] = useState("");
  const [preferredPlace, setPreferredPlace] = useState("");
  const [images, setImages] = useState<(string | File)[]>([]);
  const [startPrice, setStartPrice] = useState(0);
  const [buyNowPrice, setBuyNowPrice] = useState<number>(0);
  const [deliveryInclude, setDeliveryInclude] = useState(true);
  const [auctionKind, setAuctionKind] = useState<AuctionType>("LIVE");
  const [calendarOpen, setCalendarOpen] = useState(false);
  // const [liveDate, setLiveDate] = useState<Date | null>(null);
  // const [liveTime, setLiveTime] = useState<Date | null>(null);
  const [roomIndex, setRoomIndex] = useState<number>(1);

  const now = useNow();
  const [startDate, setStartDate] = useState<string | null>(null); // yyyy-MM-dd
  const [startTime, setStartTime] = useState<string | null>(null); // 09:30:00
  const [endDate, setEndDate] = useState<Date>(getMinEndDate);
  const [endTime, setEndTime] = useState("12:00");

  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

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
    if (images.length === 0) {
      notify("최소 한 장의 이미지를 업로드해주세요.", "ERROR");
      return;
    }
    if (startPrice <= 0) {
      notify("경매 시작가를 올바르게 입력해주세요.", "ERROR");
      return;
    }
    if ((auctionKind === "LIVE" && !startDate) || !startTime) {
      notify("경매 시작일시를 선택해주세요.", "ERROR");
      return;
    }
    if ((auctionKind === "DELAYED" && !endDate) || !endTime) {
      notify("경매 마감일시를 선택해주세요.", "ERROR");
      return;
    }

    const newFiles = images.filter(i => i instanceof File) as File[];
    const imageUrls = await uploadImages(newFiles, "auctions");

    const formBase = {
      name: title,
      category,
      itemStatus: condition,
      description,
      deliveryInclude,
      directDealAvailable: true,
      region,
      preferredPlace,
      images: imageUrls,
    };

    const form: CreateProductForm =
      auctionKind === "LIVE"
        ? {
            ...formBase,
            type: "LIVE",
            startAt: startDate + "T" + startTime,
            initPrice: startPrice,
            roomIndex,
          }
        : {
            ...formBase,
            type: "DELAYED",
            endTime: formatIsoDateTime(endDate, endTime),
            startPrice,
            buyNowPrice,
          };

    mutate(form, {
      onSuccess: data => {
        notify("상품이 성공적으로 등록되었습니다.", "SUCCESS");
        const productId =
          form.type === "LIVE"
            ? (data as CreateLiveProductData).item.id
            : (data as CreateDelayProductData).id;

        router.replace(
          form.type === "LIVE" ? `/product/live/${productId}` : `/product/${productId}`
        );
      },
      onError: error => {
        notify("상품 등록에 실패했습니다.", "ERROR");
        console.error(error);
      },
    });
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <WriteBaseForm
        title={title}
        onChangeTitle={setTitle}
        category={category}
        onChangeCategory={setCategory}
        condition={condition}
        onChangeCondition={setCondition}
        description={description}
        onChangeDescription={setDescription}
        region={region}
        onChangeRegion={setRegion}
        preferredPlace={preferredPlace}
        onChangePreferredPlace={setPreferredPlace}
      />

      <ContentContainer className="flex flex-col gap-5 p-8">
        <div>
          <p className="text-title-sub text-2xl">상품 이미지 *</p>
        </div>
        <ImageUploader files={images} onChange={setImages} />
      </ContentContainer>

      <ContentContainer className="flex flex-col gap-5 p-8">
        <div>
          <p className="text-title-sub text-2xl">기타</p>
        </div>
        <p className="text-title-sub2 text-lg">경매방식 *</p>
        <div className="flex gap-4 sm:gap-8 lg:gap-20">
          <div className="grid w-full grid-cols-2 gap-4 sm:gap-8 lg:gap-20">
            <Button
              fullWidth={true}
              variant={auctionKind === "LIVE" ? "selected" : "primary"}
              onClick={() => setAuctionKind("LIVE")}
            >
              <span className="text-title-main text-xl whitespace-nowrap">라이브 경매</span>
            </Button>

            <Button
              fullWidth={true}
              variant={auctionKind === "DELAYED" ? "selected" : "primary"}
              onClick={() => setAuctionKind("DELAYED")}
            >
              <span className="text-title-main text-xl whitespace-nowrap">일반 경매</span>
            </Button>
          </div>
        </div>
        <DashDivider />
        <div className="space-y-2">
          <p className="text-title-sub2 text-lg">가격 *</p>
          <PriceInput
            placeholder="경매 시작가를 입력해주세요 (수정 불가)"
            onChange={setStartPrice}
            value={startPrice}
          />
        </div>
        {auctionKind === "DELAYED" && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-title-sub2 text-lg">즉시구매가</span>
              <span className="text-title-sub2 text-sm">(미입력시 즉시구매 불가로 설정됩니다)</span>
            </div>
            <PriceInput
              placeholder="즉시구매가를 입력해주세요 (수정 불가)"
              onChange={setBuyNowPrice}
              value={buyNowPrice}
            />
          </div>
        )}
        <div className="space-y-2">
          <p className="text-title-sub2 text-lg">택배거래 *</p>

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
          <DashDivider />

          {auctionKind === "LIVE" && (
            <>
              <p className="text-title-sub2 text-lg">시작 일시 선택 *</p>
              <div>
                <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:gap-20">
                  <div
                    className={twMerge(
                      "bg-content-gray border-border-sub2/20 inline-flex w-full cursor-not-allowed items-center justify-center rounded-lg border-3",
                      startDate && startTime ? "text-title-sub" : "text-title-sub/50"
                    )}
                  >
                    {startDate && startTime
                      ? startDate + " " + startTime + " (" + roomIndex + "번 방)"
                      : "시간표에서 원하는 시간을 선택해주세요"}
                  </div>
                  <Button
                    fullWidth={true}
                    leftIcon={<Image className="size-5" src={calendar} alt="calendar" />}
                    onClick={() => setIsScheduleModalOpen(true)}
                    type="button"
                  >
                    시간표 보러가기
                  </Button>
                </div>
              </div>
            </>
          )}
          {auctionKind === "DELAYED" && (
            <div className="relative">
              <p className="text-title-sub2 mb-2 text-lg">마감 일시 선택 *</p>
              <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:gap-20">
                <Button onClick={() => setCalendarOpen(prev => !prev)}>
                  {endDate ? formatYmd(endDate) : "날짜"}{" "}
                </Button>
                {calendarOpen && (
                  <EndDatePicker
                    endDate={endDate}
                    onSelect={(date: Date | undefined) => {
                      if (!date) return;
                      setEndDate(date);
                      setCalendarOpen(false);
                    }}
                  />
                )}
                <Input
                  className="text-border-sub2 flex justify-center"
                  type="time"
                  step={1800}
                  value={endTime}
                  onChange={e => setEndTime(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="mt-12 flex w-full justify-end gap-5">
            <Button
              disabled={isUploading || isPending}
              className="bg-btn-active text-white"
              type="submit"
            >
              등록하기
            </Button>
            <Button className="bg-content-gray" onClick={() => router.back()}>
              등록취소
            </Button>
          </div>
        </div>
      </ContentContainer>

      <Modal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        className="max-w-[1200px]"
      >
        <WeeklySchedule
          isWriteMode={true}
          onRoomSelect={(roomIndex: number, startAt: string) => {
            setRoomIndex(roomIndex);

            const [date, time] = startAt.split("T");
            setStartDate(date);
            setStartTime(time.substring(0, 5)); // HH:mm

            setIsScheduleModalOpen(false);
          }}
        />
      </Modal>
    </form>
  );
}

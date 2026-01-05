"use client";

import { useState } from "react";
import WriteBaseForm from "../write/WriteBaseForm";
import ContentContainer from "../common/ContentContainer";
import ImageUploader from "../write/ImageUploader";
import Button from "../common/Button";
import Toast from "../common/Toast";
import { useModifyAuctionProduct } from "@/features/auction/hooks/useModifyAuctionProduct";
import { useUploadImages } from "@/features/image/hooks/useUploadImages";
import { useRouter } from "next/navigation";

interface ProductModifyFormProps {
  product: ProductDetail;
}
export default function ProductModifyForm({ product }: ProductModifyFormProps) {
  const [title, setTitle] = useState(product.name || "");
  const [category, setCategory] = useState<CategoryKey | null>(product.category ?? null);
  const [condition, setCondition] = useState<ItemCondition>(product.itemStatus);
  const [description, setDescription] = useState(product.description || "");
  const [region, setRegion] = useState(product.region || "");
  const [preferredPlace, setPreferredPlace] = useState(product.preferredPlace || "");
  const [images, setImages] = useState<(string | File)[]>(
    Array.isArray(product.images) ? product.images : []
  );

  const router = useRouter();
  const notify = (message: string, type: ToastType) => Toast({ message, type });

  const { mutate, isPending } = useModifyAuctionProduct(product.id);
  const { uploadImages, isUploading } = useUploadImages();

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
      notify("최소 한 장의 이미지는 필요합니다.", "ERROR");
      return;
    }

    const existingUrls = images.filter(img => typeof img === "string") as string[];
    const newFiles = images.filter(img => img instanceof File) as File[];
    const uploadedUrls = newFiles.length > 0 ? await uploadImages(newFiles, "auctions") : [];
    const finalImages = [...existingUrls, ...uploadedUrls];

    const formBase = {
      name: title,
      category,
      itemStatus: condition,
      description,
      deliveryInclude: product.deliveryInclude,
      directDealAvailable: true,
      region,
      preferredPlace,
      images: finalImages,
    };

    const form: CreateProductForm =
      product.type === "LIVE"
        ? {
            ...formBase,
            type: "LIVE",
            startAt: product.liveTime,
            initPrice: product.currentPrice,
            roomIndex: product.roomIndex,
          }
        : {
            ...formBase,
            type: "DELAYED",
            endTime: product.endTime,
            startPrice: product.startPrice,
            buyNowPrice: product.buyNowPrice,
          };

    mutate(form, {
      onSuccess: () => {
        notify("상품이 수정되었습니다.", "SUCCESS");
        router.replace(
          product.type === "LIVE" ? `/product/live/${product.id}` : `/product/${product.id}`
        );
      },
      onError: error => {
        notify("상품 수정에 실패했습니다.", "ERROR");
        console.error(error);
      },
    });
  };

  return (
    <form onSubmit={onSubmit} className="mb-10 flex flex-col gap-8">
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
        <p className="text-title-sub text-2xl">상품 이미지</p>
        <ImageUploader files={images} onChange={setImages} />
      </ContentContainer>

      <div className="mx-auto flex w-[95%] max-w-[1440px] justify-end gap-5">
        <Button
          className="bg-btn-active text-white"
          type="submit"
          disabled={isPending || isUploading}
        >
          수정하기
        </Button>
        <Button className="bg-content-gray" onClick={() => router.back()}>
          수정취소
        </Button>
      </div>
    </form>
  );
}

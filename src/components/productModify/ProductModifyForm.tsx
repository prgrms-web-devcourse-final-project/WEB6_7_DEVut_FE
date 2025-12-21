"use client";

import { useState } from "react";
import WriteBaseForm from "../write/WriteBaseForm";
import ContentContainer from "../common/ContentContainer";
import ImageUploader from "../write/ImageUploader";
import Button from "../common/Button";

interface ProductModifyFormProps {
  product: ProductDetail;
}
export default function ProductModifyForm({ product }: ProductModifyFormProps) {
  const [title, setTitle] = useState(product.name);
  const [category, setCategory] = useState<CategoryKey | null>(product.category);
  const [condition, setCondition] = useState<ItemCondition>(product.itemStatus);
  const [description, setDescription] = useState(product.description);
  const [region, setRegion] = useState(product.region);
  const [preferredPlace, setPreferredPlace] = useState(product.preferredPlace);
  const [images, setImages] = useState<(string | File)[]>(product.images);

  return (
    <form className="mb-10 flex flex-col gap-8">
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

      <div className="mx-auto flex w-[95%] justify-end gap-5">
        <Button className="bg-btn-active text-white" type="submit">
          수정하기
        </Button>
        <Button className="bg-content-gray">수정취소</Button>
      </div>
    </form>
  );
}

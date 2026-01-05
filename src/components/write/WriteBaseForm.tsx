import Category from "../common/Category";
import ContentContainer from "../common/ContentContainer";
import Input from "../common/Input";
import Textarea from "../common/TextArea";
import ItemStatusRadio from "./ItemStatusRadio";

interface WriteBaseFormProps {
  title: string;
  onChangeTitle: (value: string) => void;
  category: CategoryKey | null;
  onChangeCategory: (value: CategoryKey | null) => void;
  condition: ItemCondition;
  onChangeCondition: (value: ItemCondition) => void;
  description: string;
  onChangeDescription: (value: string) => void;
  region: string;
  onChangeRegion: (value: string) => void;
  preferredPlace: string;
  onChangePreferredPlace: (value: string) => void;
}

export default function WriteBaseForm({
  title,
  onChangeTitle,
  category,
  onChangeCategory,
  condition,
  onChangeCondition,
  description,
  onChangeDescription,
  region,
  onChangeRegion,
  preferredPlace,
  onChangePreferredPlace,
}: WriteBaseFormProps) {
  return (
    <ContentContainer className="flex flex-col gap-5 p-8">
      <div>
        <p className="text-title-sub text-2xl">상품 정보</p>
      </div>
      <div className="space-y-2">
        <p className="text-title-sub2 text-lg">상품명 *</p>
        <Input
          placeholder="상품명을 입력해주세요"
          maxLength={40}
          onChange={e => onChangeTitle(e.target.value)}
          value={title}
        />
      </div>
      <div className="space-y-2">
        <p className="text-title-sub2 text-lg">카테고리 *</p>
        <Category
          name="categoryRadio"
          value={category}
          onChange={onChangeCategory}
          className="flex gap-2 overflow-x-auto whitespace-nowrap sm:flex-wrap"
        />
      </div>
      <div className="space-y-2">
        <p className="text-title-sub2 text-lg">상품상태 *</p>
        <ItemStatusRadio condition={condition} setCondition={onChangeCondition} />
      </div>
      <div className="space-y-2">
        <p className="text-title-sub2 text-lg">설명 *</p>
        <Textarea
          value={description}
          onChange={e => onChangeDescription(e.target.value)}
          placeholder="상품에 대한 설명을 자세히 적어주세요."
        />
      </div>
      <div className="flex w-full flex-col gap-6 md:flex-row md:gap-10">
        <div className="w-full space-y-2">
          <p className="text-title-sub2 text-lg">지역</p>
          <Input
            placeholder="예) 서울"
            maxLength={40}
            onChange={e => onChangeRegion(e.target.value)}
            value={region}
          />
        </div>

        <div className="w-full space-y-2">
          <p className="text-title-sub2 text-lg">선호 장소</p>
          <Input
            placeholder="예) 강남역"
            maxLength={40}
            onChange={e => onChangePreferredPlace(e.target.value)}
            value={preferredPlace}
          />
        </div>
      </div>
    </ContentContainer>
  );
}

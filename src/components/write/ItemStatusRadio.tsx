interface ConditionOption {
  value: ItemCondition;
  label: string;
  description: string;
  id: string;
}

const CONDITION_OPTIONS: ConditionOption[] = [
  {
    id: "new",
    value: "NEW",
    label: "새 상품 (미사용)",
    description: "미개봉, 사용하지 않은 새 상품",
  },
  {
    id: "good",
    value: "USED_LIKE_NEW",
    label: "사용감 적음 (중고)",
    description: "눈에 띄는 흔적이나 얼룩이 약간 있음",
  },
  {
    id: "bad",
    value: "USED_HEAVILY",
    label: "사용감 많음 (중고)",
    description: "눈에 띄는 흔적이나 얼룩이 많이 있음",
  },
];

export default function ItemStatusRadio({
  condition,
  setCondition,
}: {
  condition: ItemCondition;
  setCondition: (value: ItemCondition) => void;
}) {
  return (
    <>
      {CONDITION_OPTIONS.map(({ id, value, label, description }) => (
        <label key={id} htmlFor={id} className="flex cursor-pointer items-center gap-1">
          <input
            id={id}
            type="radio"
            name="condition"
            className="border-border-sub checked:border-border-sub2 size-5 cursor-pointer appearance-none rounded-full border-[3px] checked:bg-[radial-gradient(circle,_var(--color-border-sub2)_40%,_transparent_41%)]"
            checked={condition === value}
            onChange={() => setCondition(value)}
          />
          <span className="text-title-main text-xl">
            {label} <span className="text-border-sub text-[16px]">{description}</span>
          </span>
        </label>
      ))}
    </>
  );
}

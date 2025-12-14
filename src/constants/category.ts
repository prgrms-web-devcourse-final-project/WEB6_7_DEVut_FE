interface Category {
  key: CategoryKey;
  label: string;
}

export const CATEGORIES: Category[] = [
  { key: "clothes", label: "의류" },
  { key: "entertainment", label: "엔터테인먼트" },
  { key: "electronics", label: "전자기기" },
  { key: "collectibles", label: "수집품" },
  { key: "sports", label: "스포츠/레저" },
  { key: "shoes", label: "신발" },
  { key: "bags", label: "가방" },
  { key: "plates", label: "플레이트" },
  { key: "art", label: "예술/수집" },
  { key: "movie", label: "영화" },
];

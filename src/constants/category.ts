interface Category {
  key: CategoryKey;
  label: string;
}

export const CATEGORIES: Category[] = [
  { key: "CLOTHES", label: "의류" },
  { key: "ENTERTAINMENT", label: "엔터테인먼트" },
  { key: "ELECTRONICS", label: "전자기기" },
  { key: "COLLECTIBLES", label: "수집품" },
  { key: "SPORTS", label: "스포츠/레저" },
  { key: "SHOES", label: "신발" },
  { key: "BAGS", label: "가방" },
  { key: "PLATES", label: "플레이트" },
  { key: "ART", label: "예술/수집" },
  { key: "MOVIE", label: "영화" },
];

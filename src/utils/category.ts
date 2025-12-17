import { CATEGORIES } from "@/constants/category";

export const getCategoryLabel = (key?: CategoryKey) => {
  if (!key) return "";
  return CATEGORIES.find(category => category.key === key)?.label ?? key;
};

"use client";

import Category from "../../common/Category";
import ContentContainer from "../../common/ContentContainer";

interface CategorySectionProps {
  category: CategoryKey | null;
  setCategory: (category: CategoryKey | null) => void;
  all?: boolean;
}

export default function CategorySection({
  category,
  setCategory,
  all = false,
}: CategorySectionProps) {
  return (
    <ContentContainer className="border-border-sub/10 shadow-flat-light min-h-0 w-full py-6 md:w-full">
      <div className="mx-auto max-w-[1000px] px-3">
        <Category
          all={all}
          name="delayProducts"
          value={category}
          onChange={setCategory}
          size="md"
          className="flex gap-2 overflow-x-auto whitespace-nowrap sm:flex-wrap sm:justify-center"
        />
      </div>
    </ContentContainer>
  );
}

"use client";

import { useState } from "react";
import Category from "../../common/Category";
import ContentContainer from "../../common/ContentContainer";

export default function CategorySection() {
  const [category, setCategory] = useState<CategoryKey | null>(null);

  return (
    <ContentContainer className="border-border-sub/10 shadow-flat-light min-h-0 w-full py-6 md:w-full">
      <div className="mx-auto max-w-[1000px] px-3">
        <div className="mx-auto w-full max-w-[900px] px-3">
          <Category
            name="delayProducts"
            value={category}
            onChange={setCategory}
            size="md"
            className="flex gap-2 overflow-x-auto whitespace-nowrap sm:flex-wrap sm:justify-center"
          />
        </div>
      </div>
    </ContentContainer>
  );
}

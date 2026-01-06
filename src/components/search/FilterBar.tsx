import { getCategoryLabel } from "@/utils/category";

type FilterBarProps = {
  params: GetProductsAllParams;
  onRemove: (key: keyof GetProductsAllParams) => void;
  onReset: () => void;
};

function FilterBadge({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      onClick={onRemove}
      className="border-border-sub bg-bg-main text-border-main hover:bg-border-sub/10 flex cursor-pointer items-center gap-1 rounded-full border px-3 py-1 text-sm"
    >
      {label}
      <span className="text-border-sub">✕</span>
    </button>
  );
}

export function FilterBar({ params, onRemove, onReset }: FilterBarProps) {
  const hasFilter = !!params.keyword || !!params.category || !!params.minPrice || !!params.maxPrice;

  if (!hasFilter) return null;

  return (
    <div className="mx-auto mt-4 w-full max-w-[1440px]">
      <div className="border-border-sub bg-content-area flex flex-wrap items-center gap-2 rounded-xl border px-4 py-3">
        {params.keyword && (
          <FilterBadge label={params.keyword} onRemove={() => onRemove("keyword")} />
        )}

        {params.category && (
          <FilterBadge
            label={`카테고리: ${getCategoryLabel(params.category)}`}
            onRemove={() => onRemove("category")}
          />
        )}

        {(params.minPrice || params.maxPrice) && (
          <FilterBadge
            label={`가격: ${
              params.minPrice?.toLocaleString() ?? 0
            } ~ ${params.maxPrice?.toLocaleString() ?? "∞"}`}
            onRemove={() => {
              onRemove("minPrice");
              onRemove("maxPrice");
            }}
          />
        )}

        <button
          onClick={onReset}
          className="text-border-sub ml-auto text-sm underline-offset-2 hover:underline"
        >
          초기화
        </button>
      </div>
    </div>
  );
}

import { getCategoryLabel } from "@/utils/category";

type FilterBarProps = {
  params: SearchParams;
  onRemove: (key: keyof SearchParams) => void;
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
  const hasFilter =
    !!params.name || !!params.category || !!params.minBidPrice || !!params.maxBidPrice;

  if (!hasFilter) return null;

  return (
    <div className="mx-auto mt-4 w-full max-w-[1440px]">
      <div className="border-border-sub bg-content-area flex flex-wrap items-center gap-2 rounded-xl border px-4 py-3">
        {params.name && <FilterBadge label={params.name} onRemove={() => onRemove("name")} />}

        {params.category && (
          <FilterBadge
            label={`카테고리: ${getCategoryLabel(params.category)}`}
            onRemove={() => onRemove("category")}
          />
        )}

        {(params.minBidPrice || params.maxBidPrice) && (
          <FilterBadge
            label={`가격: ${
              params.minBidPrice?.toLocaleString() ?? 0
            } ~ ${params.maxBidPrice?.toLocaleString() ?? "∞"}`}
            onRemove={() => {
              onRemove("minBidPrice");
              onRemove("maxBidPrice");
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

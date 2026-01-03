import { CATEGORIES } from "@/constants/category";
import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const categoryVariants = cva("shadow-flat-light cursor-pointer rounded-lg border-2 transition", {
  variants: {
    size: {
      sm: "px-3 py-1 text-[12px]",
      md: "px-4 py-1.5 text-[14px]",
      lg: "px-6 py-2.5 text-[16px]",
    },
    active: {
      true: "bg-btn-active border-border-main border-[3px] text-white",
      false: "bg-content-gray border-border-sub text-title-sub",
    },
  },
  defaultVariants: {
    size: "md",
    active: false,
  },
});

interface CategoryProps extends VariantProps<typeof categoryVariants> {
  name: string;
  value?: CategoryKey | null;
  onChange: (value: CategoryKey | null) => void;
  className?: string;
  all?: boolean;
}

export default function Category({
  name,
  value,
  onChange,
  size,
  className,
  all = false,
}: CategoryProps) {
  return (
    <div className={twMerge(className)}>
      {all && (
        <label
          className={categoryVariants({
            size,
            active: value == null,
          })}
        >
          <input
            type="radio"
            name={name}
            checked={value == null}
            onChange={() => onChange(null)}
            className="hidden"
          />
          전체
        </label>
      )}

      {CATEGORIES.map(cat => {
        const checked = value === cat.key;

        return (
          <label
            key={cat.key}
            className={categoryVariants({
              size,
              active: checked,
            })}
          >
            <input
              type="radio"
              name={name}
              value={cat.key}
              checked={checked}
              onChange={() => onChange(cat.key)}
              className="hidden"
            />
            {cat.label}
          </label>
        );
      })}
    </div>
  );
}

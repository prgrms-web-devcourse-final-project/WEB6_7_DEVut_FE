import { cva, VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const titleVariants = cva("text-title-main font-bold", {
  variants: {
    size: {
      sm: "text-sm font-semibold",
      md: "text-lg",
      lg: "text-xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface TitleProps extends VariantProps<typeof titleVariants> {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  wrapperClassName?: string;
}
export default function Title({ children, size, icon, className, wrapperClassName }: TitleProps) {
  return (
    <div className={twMerge("mb-4 flex items-center justify-between", wrapperClassName)}>
      {icon && <span className="mr-2 flex items-center">{icon}</span>}
      <h2 className={twMerge(titleVariants({ size }), className)}>{children}</h2>
    </div>
  );
}

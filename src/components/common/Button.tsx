import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
  `inline-flex cursor-pointer items-center justify-center rounded-lg border-3 transition-all disabled:cursor-not-allowed disabled:opacity-50`,
  {
    variants: {
      variant: {
        primary:
          "border-border-sub2 bg-btn-default text-title-sub shadow-flat-light hover:scale-102 active:scale-99",
        selected:
          "border-border-sub2 bg-custom-orange text-title-sub shadow-flat-light hover:scale-102 active:scale-99",
      },
      size: {
        sm: `h-9 px-3 text-xs sm:h-10 sm:px-4 sm:text-sm`,
        md: `h-12 px-5 text-sm sm:h-14 sm:px-6 sm:text-base`,
        lg: `h-14 px-6 text-lg sm:h-16 sm:px-8 sm:text-[20px]`,
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<"button">, VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Button({
  className,
  variant,
  size,
  fullWidth,
  isLoading,
  disabled,
  children,
  leftIcon,
  rightIcon,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={twMerge(buttonVariants({ variant, size, fullWidth }), className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}

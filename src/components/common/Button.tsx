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
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-14 px-6 text-base",
        lg: "h-16 px-8 text-[20px]",
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
  ...props
}: ButtonProps) {
  return (
    <button
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

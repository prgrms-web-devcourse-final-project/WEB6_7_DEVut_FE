"use client";

import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import Bizz from "@/assets/common/bizz.svg";
import Image from "next/image";

const bizzAmountVariants = cva("text-border-sub2 flex items-center", {
  variants: {
    fontSize: {
      sm: "gap-0.5 text-sm",
      md: "gap-1 text-xl",
      lg: "gap-1.5 text-2xl",
      xl: "gap-2 text-3xl",
    },
    iconSize: {
      sm: 12,
      md: 18,
      lg: 24,
      xl: 30,
    },
  },
  defaultVariants: {
    fontSize: "md",
    iconSize: "md",
  },
});

interface BizzAmountProps extends VariantProps<typeof bizzAmountVariants> {
  amount: number | string;
  className?: string;
}

function formatAmount(amount: number | string) {
  if (typeof amount === "number") return amount.toLocaleString();
  const n = Number(amount);
  return Number.isFinite(n) ? n.toLocaleString() : amount;
}

export default function BizzAmount({ amount, className, fontSize, iconSize }: BizzAmountProps) {
  const ICON_SIZE_MAP = {
    sm: 12,
    md: 18,
    lg: 24,
    xl: 30,
  } as const;

  const iconPx = ICON_SIZE_MAP[iconSize ?? "md"];

  return (
    <span className={twMerge(bizzAmountVariants({ fontSize }), className)}>
      <span>{formatAmount(amount)}</span>
      <Image src={Bizz} alt="bizz logo" width={iconPx} height={iconPx} />
    </span>
  );
}

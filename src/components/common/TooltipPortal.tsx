"use client";

import { createPortal } from "react-dom";
import { Tooltip as BaseTooltip } from "react-tooltip";
import { getPortalRoot } from "@/utils/portal";

interface TooltipPortalProps {
  id: string;
  place?: "top" | "right" | "left" | "bottom";
  className?: string;
}

export default function TooltipPortal({ id, place = "right", className }: TooltipPortalProps) {
  const portalRoot = getPortalRoot();

  if (!portalRoot) return null;

  return createPortal(
    <BaseTooltip id={id} place={place} className={className} style={{ zIndex: 999999 }} />,
    portalRoot
  );
}

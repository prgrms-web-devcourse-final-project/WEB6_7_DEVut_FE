"use client";

import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Tooltip as BaseTooltip } from "react-tooltip";

interface TooltipPortalProps {
  id: string;
  place?: "top" | "right" | "left" | "bottom";
  className?: string;
}

export default function TooltipPortal({ id, place = "right", className }: TooltipPortalProps) {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const el = document.createElement("div");
    document.body.appendChild(el);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setContainer(el);

    return () => {
      if (el.parentNode === document.body) {
        document.body.removeChild(el);
      }
    };
  }, []);

  if (!container) return null;

  return createPortal(
    <BaseTooltip id={id} place={place} className={className} style={{ zIndex: 999999 }} />,
    container
  );
}

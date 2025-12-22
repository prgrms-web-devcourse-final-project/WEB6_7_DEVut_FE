"use client";

import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Tooltip as BaseTooltip } from "react-tooltip";

interface TooltipPortalProps {
  id: string;
  place?: "top" | "right" | "left" | "bottom";
  className?: string;
}

export default function TooltipPortal({ id, place = "right", className }: TooltipPortalProps) {
  const [container] = useState(() => {
    if (typeof document === "undefined") return null;
    const div = document.createElement("div");
    document.body.appendChild(div);
    return div;
  });

  useEffect(() => {
    return () => {
      if (container) {
        document.body.removeChild(container);
      }
    };
  }, [container]);

  if (!container) return null;

  return ReactDOM.createPortal(
    <BaseTooltip id={id} place={place} className={className} style={{ zIndex: 999999 }} />,
    container
  );
}

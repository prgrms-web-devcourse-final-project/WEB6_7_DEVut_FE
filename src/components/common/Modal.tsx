"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  closeOnBackdropClick?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  className,
  closeOnBackdropClick = true,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeOnBackdropClick ? onClose : undefined}
      />

      {/* Modal Content */}
      <div
        className={twMerge(
          "relative z-10 max-h-[90vh] w-[90%] overflow-y-auto rounded-lg bg-white shadow-xl",
          className
        )}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

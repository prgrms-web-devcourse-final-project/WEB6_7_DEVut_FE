"use client";

import React from "react";
import Button from "./Button";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = "예",
  cancelText = "아니오",
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-30" onClick={onCancel} />
      <div className="z-10 w-[90%] max-w-sm rounded-lg bg-white p-6 shadow-lg">
        {title && <h3 className="mb-2 text-center text-lg font-semibold">{title}</h3>}
        <p className="mb-4 text-center text-base">{message}</p>
        <div className="flex justify-between gap-3">
          <Button
            className="bg-custom-orange flex-1 rounded border-none py-2 text-white"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
          <Button className="bg-content-gray flex-1 rounded border-none py-2" onClick={onCancel}>
            {cancelText}
          </Button>
        </div>
      </div>
    </div>
  );
};

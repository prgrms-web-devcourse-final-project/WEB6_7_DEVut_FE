"use client";

import Button from "../common/Button";

type ConfirmModalProps = {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  title,
  description,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 text-center">
      <div className="w-[330px] rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-2 text-lg font-bold">{title}</h2>
        {description && <p className="mb-6 text-sm text-gray-600">{description}</p>}

        <div className="flex justify-between gap-2">
          <Button
            className="bg-custom-red max-h-13 text-white transition-all hover:scale-101 active:scale-99"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
          <Button
            className="max-h-13 border transition-all hover:scale-101 active:scale-99"
            onClick={onCancel}
          >
            {cancelText}
          </Button>
        </div>
      </div>
    </div>
  );
}

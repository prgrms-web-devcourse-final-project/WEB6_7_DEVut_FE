"use client";

import { X } from "lucide-react";
import { useState } from "react";

import WithdrawForm from "./WithdrawForm";
import WithdrawConfirm from "./WithdrawConfirm";
import WithdrawResult from "./WithdrawResult";

type Step = "INPUT" | "CONFIRM" | "DONE";

export default function CreateWithdrawalModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<Step>("INPUT");
  const [form, setForm] = useState({
    amount: 0,
    bank: "",
    account: "",
    owner: "",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
      <div className="border-custom-dark-brown bg-bg-main shadow-flat-light relative w-full max-w-[520px] rounded-2xl border-4">
        <button onClick={onClose} className="absolute top-3 right-3 cursor-pointer">
          <X size={28} />
        </button>

        {step === "INPUT" && (
          <WithdrawForm form={form} onChange={setForm} onNext={() => setStep("CONFIRM")} />
        )}

        {step === "CONFIRM" && (
          <WithdrawConfirm
            form={form}
            onBack={() => setStep("INPUT")}
            onConfirm={() => setStep("DONE")}
          />
        )}

        {step === "DONE" && <WithdrawResult onClose={onClose} />}
      </div>
    </div>
  );
}

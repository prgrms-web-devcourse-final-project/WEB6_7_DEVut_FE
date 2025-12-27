"use client";

import { X } from "lucide-react";
import { useState } from "react";

import WithdrawForm from "./WithdrawForm";
import WithdrawConfirm from "./WithdrawConfirm";
import WithdrawResult from "./WithdrawResult";

type Step = "INPUT" | "CONFIRM" | "DONE";

const STEP_INDEX: Record<Step, number> = {
  INPUT: 0,
  CONFIRM: 1,
  DONE: 2,
};

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
      <div className="border-custom-dark-brown bg-bg-main shadow-flat-light relative w-full max-w-[520px] overflow-hidden rounded-2xl border-4">
        <button onClick={onClose} className="absolute top-3 right-3 z-20 cursor-pointer">
          <X size={28} />
        </button>

        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${STEP_INDEX[step] * 100}%)`,
          }}
        >
          {/* STEP 1 */}
          <div className="w-full shrink-0">
            <WithdrawForm form={form} onChange={setForm} onNext={() => setStep("CONFIRM")} />
          </div>

          {/* STEP 2 */}
          <div className="w-full shrink-0">
            <WithdrawConfirm
              form={form}
              onBack={() => setStep("INPUT")}
              onConfirm={() => setStep("DONE")}
            />
          </div>

          {/* STEP 3 */}
          <div className="w-full shrink-0">
            <WithdrawResult onClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}

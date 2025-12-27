import { useCreateWithdrawal } from "@/features/withdrawal/hooks/useCreateWithdrawal";
import Button from "../common/Button";
import ContentContainer from "../common/ContentContainer";

type formType = {
  amount: number;
  bank: string;
  account: string;
  owner: string;
};

export default function WithdrawConfirm({
  form,
  onBack,
  onConfirm,
}: {
  form: formType;
  onBack: () => void;
  onConfirm: () => void;
}) {
  const createWithdrawal = useCreateWithdrawal();

  const handleCreateWithdrawal = () => {
    createWithdrawal?.mutate(
      {
        amount: form.amount,
        bankName: form.bank,
        accountNumber: form.account,
        accountHolder: form.owner,
      },
      {
        onSuccess: () => {
          onConfirm();
        },
      }
    );
  };
  return (
    <div className="flex flex-col gap-8 p-8">
      <h2 className="text-border-main text-xl font-bold">출금 내용 확인</h2>

      <ContentContainer className="flex flex-col gap-4 text-sm" bordered={false}>
        <Row label="출금 금액" value={`${form.amount.toLocaleString()} Bizz`} />
        <Row label="은행" value={form.bank} />
        <Row label="계좌번호" value={maskAccount(form.account)} />
        <Row label="예금주" value={form.owner} />
      </ContentContainer>

      <div className="flex gap-3">
        <Button className="flex-1" onClick={onBack}>
          취소
        </Button>
        <Button
          className="bg-custom-orange flex-1 text-white shadow-[4px_4px_0px_#5C3A21]"
          onClick={handleCreateWithdrawal}
        >
          출금 확정
        </Button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-border-sub flex justify-between border-b pb-2">
      <span className="opacity-60">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function maskAccount(account: string) {
  if (account.length < 4) return account;
  return account.slice(0, 3) + "-***-****";
}

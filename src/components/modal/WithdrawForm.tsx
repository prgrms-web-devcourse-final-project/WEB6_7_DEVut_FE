import ContentContainer from "../common/ContentContainer";
import PriceInput from "../common/PriceInput";
import Input from "../common/Input";
import Button from "../common/Button";

type formType = {
  amount: number;
  bank: string;
  account: string;
  owner: string;
};

export default function WithdrawForm({
  form,
  onChange,
  onNext,
}: {
  form: formType;
  onChange: (v: formType) => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col gap-8 p-8">
      <h2 className="text-border-main text-xl font-bold">출금 요청</h2>

      <ContentContainer className="flex flex-col gap-5" bordered={false}>
        <PriceInput
          placeholder="출금 금액"
          value={form.amount}
          onChange={v => onChange({ ...form, amount: v })}
        />

        <Input
          placeholder="은행명 (예: 국민은행)"
          value={form.bank}
          onChange={e => onChange({ ...form, bank: e.target.value })}
        />

        <Input
          placeholder="계좌번호"
          value={form.account}
          onChange={e => onChange({ ...form, account: e.target.value })}
        />

        <Input
          placeholder="예금주"
          value={form.owner}
          onChange={e => onChange({ ...form, owner: e.target.value })}
        />
      </ContentContainer>

      <Button className="bg-custom-orange text-white shadow-[4px_4px_0px_#5C3A21]" onClick={onNext}>
        출금 요청
      </Button>
    </div>
  );
}

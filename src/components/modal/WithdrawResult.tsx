import Button from "../common/Button";

export default function WithdrawResult({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center gap-6 p-10 text-center">
      <div className="text-custom-orange text-4xl">✓</div>

      <h2 className="text-border-main text-xl font-bold">출금 요청 완료</h2>

      <p className="text-sm opacity-70">
        출금 요청이 정상적으로 접수되었습니다.
        <br />
        영업일 기준 1~2일 내 처리됩니다.
      </p>

      <Button
        className="bg-custom-orange text-white shadow-[4px_4px_0px_#5C3A21]"
        onClick={onClose}
      >
        확인
      </Button>
    </div>
  );
}

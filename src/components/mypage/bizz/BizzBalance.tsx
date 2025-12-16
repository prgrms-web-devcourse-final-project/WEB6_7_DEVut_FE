import BizzAmount from "@/components/common/BizzAmount";
import Button from "@/components/common/Button";
import ContentContainer from "@/components/common/ContentContainer";

export default function BizzBalance() {
  return (
    <ContentContainer
      bordered={false}
      className="mt-4 flex min-h-[200px] flex-col justify-between gap-5 pt-4"
    >
      {/* 잔액 영역 */}
      <div className="text-title-main flex w-full max-w-[520px] flex-col gap-2">
        <span className="text-2xl font-bold">잔액</span>

        {/* 👇 안쪽 카드 더 줄임 */}
        <ContentContainer className="border-border-sub/20 shadow-flat-light flex min-h-[120px] items-center px-4 py-3">
          <BizzAmount amount={123456789} fontSize="xl" iconSize="xl" />
        </ContentContainer>
      </div>

      {/* 버튼 영역 */}
      <div className="flex w-full max-w-[520px] justify-end gap-3">
        <Button className="bg-custom-blue h-9 w-full text-white md:w-22">충전</Button>
        <Button className="bg-custom-red h-9 w-full text-white md:w-22">출금</Button>
      </div>
    </ContentContainer>
  );
}

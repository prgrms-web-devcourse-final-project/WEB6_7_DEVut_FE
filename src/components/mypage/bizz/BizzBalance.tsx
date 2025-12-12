import Button from "@/components/common/Button";
import ContentContainer from "@/components/common/ContentContainer";

export default function BizzBalance() {
  return (
    <ContentContainer className="mt-5 flex min-h-[300px] flex-col justify-between pt-8">
      <div className="text-title-main ml-15 flex w-[50%] flex-1 flex-col justify-center gap-5">
        <div className="text-[32px]">잔액</div>
        <ContentContainer className="shadow-flat-light border-border-sub/20 m-0 h-[130px] min-h-0 p-5 text-[32px]">
          12,345,678
        </ContentContainer>
      </div>
      <div className="mx-auto mb-5 flex max-h-[50px] w-[95%] justify-end">
        <Button label="충전" className="bg-custom-blue h-10 w-22 text-white" />
        <Button label="출금" className="bg-custom-red ml-4 h-10 w-22 text-white" />
      </div>
    </ContentContainer>
  );
}

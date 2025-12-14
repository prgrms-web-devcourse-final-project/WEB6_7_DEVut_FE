import BizzAmount from "@/components/common/BizzAmount";
import Button from "@/components/common/Button";
import ContentContainer from "@/components/common/ContentContainer";

export default function BizzBalance() {
  return (
    <ContentContainer className="mt-5 flex min-h-[300px] flex-col justify-between pt-8">
      <div className="text-title-main ml-15 flex w-[50%] flex-1 flex-col justify-center gap-5">
        <div className="text-[32px]">잔액</div>
        <ContentContainer className="shadow-flat-light border-border-sub/20 m-0 h-[130px] min-h-0 p-5 text-[32px]">
          <BizzAmount amount={123456789} fontSize={"xl"} iconSize={"xl"} />
        </ContentContainer>
      </div>
      <div className="mx-auto mb-5 flex max-h-[50px] w-[95%] justify-end">
        <Button className="bg-custom-blue h-10 w-22 text-white">충전</Button>
        <Button className="bg-custom-red ml-4 h-10 w-22 text-white">출금</Button>
      </div>
    </ContentContainer>
  );
}

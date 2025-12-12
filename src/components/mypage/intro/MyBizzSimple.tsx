import Button from "../../common/Button";
import ContentContainer from "../../common/ContentContainer";
import MyBizzLog from "../bizz/MyBizzLog";

export default function MyBizzSimple() {
  return (
    <ContentContainer className="flex min-h-[370px] flex-col justify-between gap-10">
      <div className="mx-auto mt-10 flex h-fit w-[90%] gap-10">
        <div className="flex w-[300px] flex-col gap-3">
          <div className="text-title-main text-lg font-bold">비즈</div>
          <ContentContainer className="bg-content-gray text-title-sub border-border-sub2 flex min-h-[130px] w-full flex-col gap-2 border-2 p-5">
            <span>보유 비즈</span>
            <span className="text-title-main text-2xl font-bold">100,000</span>
          </ContentContainer>
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <div className="text-title-main text-lg font-bold">최근 내역</div>
          <MyBizzLog />
        </div>
      </div>
      <div className="mx-auto mb-5 flex max-h-[50px] w-[95%] justify-end">
        <Button label="충전" className="h-10 w-[100px]" />
      </div>
    </ContentContainer>
  );
}

import Title from "@/components/common/Title";
import Button from "../../common/Button";
import ContentContainer from "../../common/ContentContainer";
import MyBizzLog from "../bizz/MyBizzLog";

export default function MyBizzSimple() {
  return (
    <ContentContainer className="flex min-h-[370px] flex-col justify-between gap-10">
      <div className="mx-auto mt-10 flex h-fit w-[90%] gap-10">
        <div className="flex w-[300px] flex-col">
          {/* <div className="text-title-main text-lg font-bold">비즈</div> */}
          <Title>비즈</Title>
          <ContentContainer className="bg-content-gray text-title-sub border-border-sub2 flex min-h-[130px] w-full flex-col gap-2 border-2 p-5">
            <span>보유 비즈</span>
            <span className="text-title-main text-2xl font-bold">100,000</span>
          </ContentContainer>
        </div>
        <div className="flex flex-1 flex-col">
          {/* <div className="text-title-main text-lg font-bold">최근 내역</div> */}
          <Title>최근 내역</Title>
          <MyBizzLog />
        </div>
      </div>
      <div className="mx-auto mb-5 flex max-h-[50px] w-[95%] justify-end">
        <Button className="h-10">충전</Button>
      </div>
    </ContentContainer>
  );
}

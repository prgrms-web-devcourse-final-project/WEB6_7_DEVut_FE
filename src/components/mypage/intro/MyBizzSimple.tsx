import Title from "@/components/common/Title";
import Button from "../../common/Button";
import ContentContainer from "../../common/ContentContainer";
import MyBizzLog from "../bizz/MyBizzLog";
import BizzAmount from "@/components/common/BizzAmount";

export default function MyBizzSimple() {
  return (
    <ContentContainer className="flex min-h-[370px] flex-col justify-between gap-10">
      <div className="mx-auto mt-10 flex h-fit w-[90%] flex-col gap-10 md:flex-row">
        <div className="flex w-full flex-col md:w-[300px]">
          <Title>비즈</Title>
          <ContentContainer className="bg-content-gray text-title-sub border-border-sub2 flex min-h-[130px] w-full flex-col gap-2 border-2 p-5">
            <span>보유 비즈</span>
            <BizzAmount amount={100000} />
          </ContentContainer>
        </div>

        <div className="flex w-full flex-col md:flex-1">
          <Title>최근 내역</Title>
          <MyBizzLog simple={true} />
        </div>
      </div>

      <div className="mx-auto mb-5 flex w-[95%] justify-end">
        <Button className="h-10 w-full md:w-auto">충전</Button>
      </div>
    </ContentContainer>
  );
}

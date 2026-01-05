import ContentContainer from "../common/ContentContainer";
import Title from "../common/Title";
import test from "@/assets/vintage.png";
import WrapperImage from "../common/WrapperImage";
import StatusBadge from "../common/StatusBadge";
import Input from "../common/Input";
import MileStoneSemiTitle from "@/components/common/MileStoneSemiTitle";
import Button from "../common/Button";
import TradeItem from "./TradeItem";

export default function TradeInfo({ tradeId }: { tradeId: string }) {
  return (
    <div className="mt-2 flex w-full flex-col px-8">
      <ContentContainer className="border-border-sub bg-content-area m-0 flex w-full flex-col gap-16 border-3 px-14 py-7 md:flex-row">
        <div className="flex flex-col md:min-w-[60%]">
          <Title className="text-title-sub ml-3 text-[24px]">상품 정보</Title>
          <ContentContainer className="border-border-main flex h-full flex-col items-center justify-center gap-10 overflow-auto border-3 p-8 md:flex-row">
            {/* 이미지 */}
            <div className="h-34 w-34 shrink-0">
              <WrapperImage src={test} alt="test" />
            </div>

            {/* 정보 */}
            <div className="flex flex-col justify-center gap-3">
              <StatusBadge status="pending" className="border-none" />

              <p className="text-title-main-dark text-[20px] font-bold">
                오토바이 인 척하는 카메라
              </p>

              <div className="mt-2">
                <p className="text-title-main-dark text-[11px]">낙찰가</p>
                <p className="text-custom-red text-[17px] font-bold">150,000</p>
              </div>
            </div>
          </ContentContainer>
        </div>
        <div className="flex w-full flex-col md:w-[40%]">
          <Title className="text-title-sub ml-3 text-[24px]">배송</Title>
          <ContentContainer className="border-border-main text-title-main-dark grid gap-1 border-3 p-8 text-[11px] font-bold">
            <div className="grid gap-2">
              <p>받는 사람</p>
              <Input placeholder="입력" className="h-10 px-3 py-2 sm:py-1" />
            </div>

            <div className="grid gap-2">
              <p>배송지</p>
              <Input placeholder="입력" className="h-10 px-3 py-2 sm:py-1" />
            </div>

            <div className="grid gap-2">
              <p>배송 정보</p>
              <Input placeholder="입력" className="h-10" />
            </div>
          </ContentContainer>
        </div>
      </ContentContainer>
      <section className="relative min-h-screen py-5">
        {/* 세로 타임라인 */}
        <div className="bg-border-main absolute top-5 left-7 h-full w-[3px]" />

        <div className="mb-12">
          <MileStoneSemiTitle title="잔금 대기" className="mb-2 ml-2 rotate-2" />
          <TradeItem>
            상품의 결제를 대기 중입니다.
            <Button className="bg-custom-red h-7">결제하기</Button>
          </TradeItem>
          <TradeItem>상품의 결제를 완료하였습니다.</TradeItem>
          <div className="mt-12 ml-15 w-[95%] border-t-[3px] border-dashed border-[#A1887F]/30" />
        </div>

        <div className="mb-12">
          <MileStoneSemiTitle title="거래 중" className="mb-2 ml-2 -rotate-1" />

          <TradeItem>
            {" "}
            판매자와 거래 중 입니다.
            <Button className="bg-btn-default h-7">대화하러가기</Button>
          </TradeItem>
          <div className="mt-12 ml-15 w-[95%] border-t-[3px] border-dashed border-[#A1887F]/30" />
        </div>

        <div className="mb-12">
          <MileStoneSemiTitle title="거래 완료" className="mb-2 ml-2 -rotate-1" />
          <TradeItem>
            상품의 거래를 완료했습니다.
            <Button className="bg-btn-default h-7">구매확정</Button>
          </TradeItem>
          <div className="mt-12 ml-15 w-[95%] border-t-[3px] border-dashed border-[#A1887F]/30" />
        </div>
      </section>
    </div>
  );
}

import test from "@/assets/images/sidebar/BBlogo.png";
import Button from "@/components/common/Button";
import ContentContainer from "@/components/common/ContentContainer";
import WrapperImage from "@/components/common/WrapperImage";

export default function MyIntro() {
  return (
    <ContentContainer className="mt-5 flex min-h-[370px] flex-col justify-between">
      <div className="mx-auto flex w-[80%] gap-10 sm:gap-20">
        <div className="flex min-h-[280px] w-[25%] max-w-[150px] min-w-[130px] flex-col justify-center gap-6">
          <div className="aspect-square w-full">
            <WrapperImage src={test} alt="test" />
          </div>
          <Button className="bg-custom-red h-10 w-full text-lg font-bold text-white">
            로그아웃
          </Button>
        </div>

        <div className="text-title-main flex min-h-[280px] flex-col justify-center gap-7 text-sm font-bold md:text-lg">
          <div className="grid grid-cols-1 gap-2 sm:flex sm:gap-5">
            <span>닉네임</span>
            <span className="font-normal">경매왕</span>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:flex sm:gap-5">
            <span>이메일</span>
            <span className="font-normal">auction@naver.com</span>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:flex sm:gap-5">
            <span>전화번호</span>
            <span className="font-normal">010-0100-0200</span>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:flex sm:gap-5">
            <span>배송지</span>
            <span className="font-normal">서울특별시 버저비더로</span>
          </div>
        </div>
      </div>
      <div className="mx-auto mb-5 flex max-h-[50px] w-[95%] justify-end">
        <Button className="h-10">수정</Button>
      </div>
    </ContentContainer>
  );
}

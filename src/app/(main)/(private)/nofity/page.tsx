import ContentContainer from "@/components/common/ContentContainer";
import MileStoneSemiTitle from "@/components/common/MileStoneSemiTitle";
import NotifyItem from "@/components/notify/notifyItem";

export default function NofityPage() {
  return (
    <>
      <ContentContainer bordered={false} className="pt-5">
        <div className="flex min-h-screen w-full max-w-[1280px] flex-col">
          <div className="text-title-main flex min-h-[65px] text-2xl">
            <p className="-translate-y-0.5 font-bold">알림</p>
          </div>
          <section className="relative min-h-screen">
            {/* 세로 타임라인 */}
            <div className="bg-border-main absolute top-0 left-7 h-full w-[3px]" />

            <div className="mb-12">
              <MileStoneSemiTitle title="2025-12-07" className="mb-2 ml-2 rotate-2" />
              <NotifyItem icon="🏆">
                ‘귀멸의 칼날 한정판’ 상품 상위 입찰이 들어왔습니다. <b>252,000원</b>
              </NotifyItem>
              <NotifyItem icon="⏰">
                ‘찐한 빈티지 스쿠터 카메라’ 상품의 경매가 곧 시작합니다.
              </NotifyItem>
              <div className="mt-12 ml-15 w-[95%] border-t-[3px] border-dashed border-[#A1887F]/30" />
            </div>

            <div className="mb-12">
              <MileStoneSemiTitle title="2025-12-05" className="mb-2 ml-2 -rotate-1" />
              <NotifyItem icon="🤝">‘레트로 폴라로이드’ 상품의 거래가 완료되었습니다.</NotifyItem>
              <NotifyItem icon="💬">‘앤티크 목마’ 상품 판매자에게 메시지가 왔습니다.</NotifyItem>
              <NotifyItem icon="💳">기한 내에 ‘LP 턴테이블’ 상품의 결제를 완료해주세요.</NotifyItem>
              <NotifyItem>축하합니다! ‘한정판 피규어’ 상품의 낙찰에 성공했습니다.</NotifyItem>
              <div className="mt-12 ml-15 w-[95%] border-t-[3px] border-dashed border-[#A1887F]/30" />
            </div>
          </section>
        </div>
      </ContentContainer>
    </>
  );
}

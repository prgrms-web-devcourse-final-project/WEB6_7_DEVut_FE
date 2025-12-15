import StageBarBackground from "@/components/auction/live/liveRoom/stage/StageBarBackground";
import StageTab from "@/components/auction/live/liveRoom/stage/StageTab";
import PageTabArea from "@/components/common/PageTabArea";
import { auctionItems } from "@/constants/route/auction";

export default function AuctionPage() {
  return (
    <>
      <PageTabArea items={auctionItems} isUnderline={false} />
      <div className="mx-auto flex min-h-screen w-[98%]">
        <div className="w-full">
          <StageBarBackground className="h-30 text-white">
            <div className="font-aclonica flex w-full flex-col text-center text-4xl font-bold">
              <span>2025-12-10 11:30</span>
              <span>AUCTION</span>
            </div>
          </StageBarBackground>
        </div>
      </div>
    </>
  );
}

import StageBarBackground from "@/components/auction/live/liveRoom/stage/StageBarBackground";
import LiveRoomList from "@/components/auction/live/liveRoomList/LiveRoomList";
import RoomProducts from "@/components/auction/live/liveRoomList/RoomProducts";
import ContentContainer from "@/components/common/ContentContainer";
import PageTabArea from "@/components/common/PageTabArea";
import { auctionItems } from "@/constants/route/auction";

export default function AuctionPage() {
  return (
    <>
      <PageTabArea items={auctionItems} isUnderline={false} />
      <ContentContainer bordered={false} className="flex h-full min-h-screen flex-col p-0">
        <div className="mx-auto h-30 w-full">
          <StageBarBackground className="h-full text-white">
            <div className="font-aclonica flex w-full flex-col text-center text-4xl font-bold">
              <span>2025-12-10 11:30</span>
              <span>AUCTION</span>
            </div>
          </StageBarBackground>
        </div>
        <div className="flex flex-1 bg-[#F5EFE1]">
          <LiveRoomList />
        </div>
        <RoomProducts />
      </ContentContainer>
    </>
  );
}

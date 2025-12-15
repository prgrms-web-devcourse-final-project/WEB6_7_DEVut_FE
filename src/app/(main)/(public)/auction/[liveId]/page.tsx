import LiveAuctionSide from "@/components/auction/live/liveRoom/LiveAuctionSide";
import LiveAuctionStage from "@/components/auction/live/liveRoom/stage/LiveAuctionStage";

export default function LiveAuctionRoomPage() {
  return (
    <div className="flex w-full pb-10">
      <LiveAuctionStage />
      <LiveAuctionSide />
    </div>
  );
}

import LiveAuctionSide from "@/components/auction/live/liveRoom/side/LiveAuctionSide";
import LiveAuctionStage from "@/components/auction/live/liveRoom/stage/LiveAuctionStage";

export default function LiveAuctionRoomPage() {
  return (
    <div className="flex min-h-screen w-full">
      <LiveAuctionStage />
      <LiveAuctionSide />
    </div>
  );
}

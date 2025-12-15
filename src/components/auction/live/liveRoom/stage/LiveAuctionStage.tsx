import Image from "next/image";
import StageBackground from "./StageBackground";
import StageTab from "./StageTab";
import auctioneerImg from "@/assets/images/auction/auctioneer.svg";
import AuctionProduct from "./AuctionProduct";
import AuctionAudience from "./AuctionAudience";
import Input from "@/components/common/Input";
import BizzAmount from "@/components/common/BizzAmount";
import BidButton from "./BidButton";

export default function LiveAuctionStage() {
  return (
    <div className="min-w-0 flex-1">
      <div className="flex h-14 w-full items-center justify-end px-4">
        <div className="border-border-sub2 bg-content-area/10 shadow-flat-light flex w-fit items-center rounded-sm border-2 px-5 py-1">
          <span className="text-title-main mr-3">보유 Bizz </span>
          <BizzAmount amount={2300000} />
        </div>
      </div>
      <div className="flex flex-col">
        <StageTab />
        <div className="relative aspect-video w-full shrink-0 overflow-hidden border-[3px] bg-black">
          <StageBackground />
          <div
            className="absolute z-20"
            style={{
              bottom: "10%",
              left: "clamp(32px, 10vw, 120px)",
            }}
          >
            <Image
              src={auctioneerImg}
              alt="auctioneer"
              className="block h-auto w-[clamp(70px,9vw,120px)] object-contain drop-shadow-[0_12px_18px_rgba(0,0,0,0.6)]"
            />
          </div>
          <AuctionProduct />
        </div>
        <AuctionAudience />
        <div className="border-border-sub2 bg-custom-brown/30 text-title-main-dark flex h-12 items-center justify-between border-[3px] px-6 text-sm">
          <div className="flex items-center gap-2">
            <span>접속자: 284명</span>
          </div>

          <div className="flex items-center gap-2">
            <span>경과 시간: 47분 13초</span>
          </div>
        </div>
        <div className="bg-bg-main relative flex min-h-[120px] flex-1 items-center px-10">
          <div className="flex items-center gap-3">
            {["+ 1만", "+ 3만", "+ 5만"].map(label => (
              <button
                key={label}
                className="border-border-sub2 h-12 min-w-[72px] cursor-pointer rounded-sm border-[3px] bg-[#8B2500] text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] active:translate-y-px"
              >
                {label}
              </button>
            ))}
          </div>
          <div className="absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
            <BidButton />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Input placeholder="입찰 금액" className="rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}

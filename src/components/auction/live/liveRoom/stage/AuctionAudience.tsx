"use client";

import Bidder from "./Bidder";
import "@/css/auction.css";

export default function AuctionAudience() {
  return (
    <div className="border-border-sub2 relative flex h-35 items-center overflow-hidden border-t-2 bg-linear-to-b from-black/40 via-black/55 to-black/75">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-linear-to-b from-black/80 to-transparent" />

      <div className="audience relative h-full w-full overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="audience-item" style={{ "--i": i } as React.CSSProperties}>
            <Bidder src="" name={`USER_${i + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

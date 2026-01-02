"use client";

import Bidder from "./Bidder";
import "@/css/auction.css";

export default function AuctionAudience({ users }: { users: AudienceUser[] }) {
  return (
    <div className="border-border-sub2 relative flex h-35 items-center overflow-hidden border-t-2 bg-linear-to-b from-black/40 via-black/55 to-black/75">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-linear-to-b from-black/80 to-transparent" />

      <div className="audience">
        {users.map(user => (
          <div key={user.userId} className="audience-item">
            <Bidder src="" name={user.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

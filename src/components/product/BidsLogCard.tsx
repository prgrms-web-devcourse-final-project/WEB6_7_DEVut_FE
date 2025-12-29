import { format } from "date-fns";

export default function BidsLogCard({ bidPrice, bidderNickname, createdAt }: ProductBidsLogItem) {
  return (
    <div className="text-border-sub2 shadow-flat-light grid grid-cols-[1fr_1fr_1fr] rounded-lg bg-white px-4 py-2 text-center">
      <div>{bidderNickname}</div>
      <div>{format(new Date(createdAt), "yyyy-MM-dd HH:mm:ss")}</div>
      <div>{bidPrice.toLocaleString()}</div>
    </div>
  );
}

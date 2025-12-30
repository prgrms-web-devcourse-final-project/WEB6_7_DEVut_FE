import { RotateCw } from "lucide-react";
import Button from "../common/Button";
import BidsLogCard from "./BidsLogCard";

export default function BidsLog({ log }: { log: ProductBidsLogItem[] }) {
  return (
    <div className="mx-auto w-full max-w-[1440px]">
      <div className="border-border-sub2 text-border-sub2 bg-content-gray grid grid-cols-[1fr_1fr_1fr] rounded-lg border-2 px-4 py-2 text-center font-bold">
        <div>ID</div>
        <div>입찰일시</div>
        <div>입찰금액</div>
      </div>
      <div className="mt-1">
        {log.length === 0 ? (
          <div className="text-title-sub2 flex flex-col items-center justify-center gap-2 py-16 text-sm">
            <p>입찰 내역이 없습니다.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {log.map(item => (
              <BidsLogCard key={item.id} {...item} />
            ))}
          </div>
        )}
      </div>
      {log.length !== 0 && (
        <div className="border-btn-default mt-4 flex justify-center border-t-3 py-3">
          <Button className="w-[120px] rounded-4xl" size={"sm"} leftIcon={<RotateCw size={18} />}>
            새로고침
          </Button>
        </div>
      )}
    </div>
  );
}

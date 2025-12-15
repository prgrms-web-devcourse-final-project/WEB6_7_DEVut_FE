import { RotateCw } from "lucide-react";
import Button from "../common/Button";
import BidsLogCard from "./BidsLogCard";

export default function BidsLog() {
  return (
    <div className="mx-auto w-full max-w-[1440px]">
      <div className="border-border-sub2 text-border-sub2 bg-content-gray grid grid-cols-[1fr_1fr_1fr] rounded-lg border-2 px-4 py-2 text-center font-bold">
        <div>ID</div>
        <div>입찰일시</div>
        <div>입찰금액</div>
      </div>
      <div className="mt-1 flex flex-col gap-3">
        <BidsLogCard />
        <BidsLogCard />
        <BidsLogCard />
        <BidsLogCard />
        <BidsLogCard />
        <BidsLogCard />
        <BidsLogCard />
        <BidsLogCard />
      </div>
      <div className="border-btn-default mt-4 flex justify-center border-t-3 py-3">
        <Button className="w-[120px] rounded-4xl" size={"sm"} leftIcon={<RotateCw size={18} />}>
          새로고침
        </Button>
      </div>
    </div>
  );
}

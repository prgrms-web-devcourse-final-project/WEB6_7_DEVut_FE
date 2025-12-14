import BizzBalance from "@/components/mypage/bizz/BizzBalance";
import MyBizzLog from "@/components/mypage/bizz/MyBizzLog";
import { ChevronDown } from "lucide-react";

export default function BizzPage() {
  return (
    <div className="flex flex-col gap-12 pb-15">
      <BizzBalance />
      <div className="mx-auto flex w-[95%] flex-col gap-3">
        <div>
          <div className="bg-btn-default border-border-sub2 text-title-sub flex h-fit w-fit gap-1 rounded-xl border-2 px-5 py-1 pr-3">
            <span>전체</span> <ChevronDown className="scale-85" />
          </div>
        </div>
        <MyBizzLog />
      </div>
    </div>
  );
}

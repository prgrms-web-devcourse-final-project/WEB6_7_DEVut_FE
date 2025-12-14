import BizzBalance from "@/components/mypage/bizz/BizzBalance";
import MyBizzLog from "@/components/mypage/bizz/MyBizzLog";

export default function BizzPage() {
  return (
    <div className="flex flex-col gap-12 pb-15">
      <BizzBalance />
      <div className="mx-auto flex w-[95%] flex-col gap-3">
        <MyBizzLog />
      </div>
    </div>
  );
}

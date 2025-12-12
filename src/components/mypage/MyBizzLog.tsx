import BizzLogCard from "./BizzLogCard";

export default function MyBizzLog() {
  return (
    <div className="w-full">
      <div className="border-border-sub2 text-border-sub2 bg-content-gray grid grid-cols-[1fr_1fr_1fr_1fr] rounded-lg border-2 px-4 py-2 text-center font-bold">
        <div>구분</div>
        <div>일시</div>
        <div>금액</div>
        <div>잔액</div>
      </div>
      <div className="mt-1 flex flex-col gap-3">
        <BizzLogCard />
        <BizzLogCard />
        <BizzLogCard />
        <BizzLogCard />
      </div>
    </div>
  );
}

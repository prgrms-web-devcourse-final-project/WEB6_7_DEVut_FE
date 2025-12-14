export default function OrderSwitch() {
  return (
    <>
      {/* 최신순 */}
      {/* <div className="relative">
        <div className="border-border-sub2 text-title-sub absolute -bottom-5 -left-1.5 z-10 inline-flex h-[25px] -rotate-3 items-center justify-center gap-2 rounded-md border-2 bg-[linear-gradient(to_right,#866A5E_0%,#FFF8E1_45%)] px-2.5 text-[10px] whitespace-nowrap shadow-[2.2px_2.2px_0_0_#A1887F]">
          <button className="">최신순</button>
          <span>|</span>
          <button>오래된 순</button>
        </div>
        <div className="bg-border-sub absolute inline-flex h-[25px] items-center justify-center gap-2 rounded-md px-2.5 text-[10px] whitespace-nowrap">
          <button className="">최신순</button>
          <span>|</span>
          <button>오래된 순</button>
        </div>
      </div> */}

      {/* 오래된 순 */}
      <div className="relative">
        <div className="border-border-sub2 text-title-sub absolute -bottom-5 z-10 inline-flex h-[25px] rotate-3 items-center justify-center gap-2 rounded-md border-2 bg-[linear-gradient(to_left,#866A5E_0%,#FFF8E1_45%)] px-2.5 text-[10px] whitespace-nowrap shadow-[-2.2px_2.2px_0_0_#A1887F]">
          <button className="">최신순</button>
          <span>|</span>
          <button>오래된 순</button>
        </div>
        <div className="bg-border-sub absolute inline-flex h-[25px] items-center justify-center gap-2 rounded-md px-2.5 text-[10px] whitespace-nowrap">
          <button className="">최신순</button>
          <span>|</span>
          <button>오래된 순</button>
        </div>
      </div>
    </>
  );
}
